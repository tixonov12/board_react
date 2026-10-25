import {useQueryClient} from "@tanstack/react-query";

type QueryKeyType = string[];

export function useOptimisticUpdate() {
    const queryClient = useQueryClient();

    const optimisticUpdate = async <T>(
        queryKey: QueryKeyType,
        updater: (old: T | undefined) => T | undefined
    ) => {
        await queryClient.cancelQueries({queryKey});
        const previousData = queryClient.getQueryData<T>(queryKey);
        queryClient.setQueryData<T>(queryKey, updater);

        return previousData;
    }

    const rollback = <T>(queryKey: QueryKeyType, previousData: T | undefined) => {
        if (!previousData) return;
        queryClient.setQueryData<T>(queryKey, previousData);
    }

    const invalidateQueries = (queryKey: QueryKeyType) => {
        queryClient.invalidateQueries({queryKey});
    }

    return {optimisticUpdate, rollback, invalidateQueries};
}
