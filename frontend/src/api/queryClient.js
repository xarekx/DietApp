import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 30 * 1000,
            // Retrying 4xx (auth, validation, not found) won't change the outcome
            retry: (failureCount, error) =>
                !(error?.status >= 400 && error?.status < 500) && failureCount < 2,
            refetchOnWindowFocus: false,
        },
    },
});
