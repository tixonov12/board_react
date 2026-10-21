import {useQueryClient} from "@tanstack/react-query";

export function useOptimisticUpdate() {
    const queryClient = useQueryClient();

    const optimisticUpdate = async <T>(
        queryKey: (string | number)[],
        updater: (old: T | undefined) => T | undefined
    ) => {
        await queryClient.cancelQueries({queryKey});
        const previousData = queryClient.getQueryData<T>(queryKey);
        queryClient.setQueryData<T>(queryKey, updater);

        return previousData;
    }

    const rollback = <T>(queryKey: (string | number)[], previousData: T | undefined) => {
        if (!previousData) return;
        queryClient.setQueryData<T>(queryKey, previousData);
    }

    const invalidateQueries = (queryKey: (string | number)[]) => {
        queryClient.invalidateQueries({queryKey});
    }

    return {optimisticUpdate, rollback, invalidateQueries};
}
