import { QueryClient, QueryClientConfig } from '@tanstack/react-query';

const config: QueryClientConfig = {};

export const queryClient = new QueryClient(config);
