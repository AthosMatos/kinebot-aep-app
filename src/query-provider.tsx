import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { queryClientAtom } from "jotai-tanstack-query";
import { useHydrateAtoms } from "jotai/react/utils";
import type { PropsWithChildren } from "react";



function HydrateAtoms({
	children,
	queryClient,
}: PropsWithChildren<{
	queryClient: QueryClient;
}>) {
	useHydrateAtoms(new Map([[queryClientAtom, queryClient]]));
	return <>{children}</>;
}

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5, // 5 minutos
			gcTime: 1000 * 60 * 10, // 10 minutos
			refetchOnWindowFocus: false,
		},
		mutations: {
			retry: 1,
		},
	},
});

export function QueryProvider({ children }: PropsWithChildren) {
	return (
		<QueryClientProvider client={queryClient}>
			<HydrateAtoms queryClient={queryClient}>{children}</HydrateAtoms>
		</QueryClientProvider>
	);
}
