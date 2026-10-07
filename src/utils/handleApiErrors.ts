import {type FieldValues, type UseFormSetError} from "react-hook-form";
import {type AxiosError} from "axios";

export const handleApiErrors = <T extends FieldValues>(
    error: AxiosError<{ errors?: Record<string, string[]> }>,
    setError: UseFormSetError<T>
) => {
    const errors = error.response?.data?.errors;

    if (errors) {
        Object.entries(errors).forEach(([field, messages]) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setError(field as any, {
                message: messages[0],
            });
        });
    }
};
