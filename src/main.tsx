import React from 'react';
import ReactDOM from 'react-dom/client';

import {
    Outlet,
    RouterProvider,
    Router,
    Route,
    RootRoute,
    redirect,
} from '@tanstack/react-router';
import { ThemeProvider } from './providers/theme.tsx';
import { Toaster } from 'react-hot-toast';
import { QueryClientProvider } from '@tanstack/react-query';

import './index.css';
import { queryClient } from './util/queryClient.ts';
import { checkAuth } from './util/auth.ts';

const Home = React.lazy(() => import('./routes/home.tsx'));
const Login = React.lazy(() => import('./routes/login.tsx'));

export const Root: React.FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <Outlet />

                <Toaster
                    toastOptions={{
                        className:
                            'bg-stone-200 text-stone-900 dark:bg-neutral-800/10 dark:text-stone-200 border-2 dark:border-neutral-800/80 backdrop-blur-md py-1.5 px-2.5',
                    }}
                />
            </ThemeProvider>
        </QueryClientProvider>
    );
};

const rootRoute = new RootRoute({
    component: Root,
});

const router = new Router({
    routeTree: rootRoute.addChildren([
        new Route({
            getParentRoute: () => rootRoute,
            path: '/',
            component: Home,
            beforeLoad: async () => {
                const wasSuccess = await checkAuth();

                if (!wasSuccess) {
                    throw redirect({
                        to: '/login',
                        search: {
                            redirect: router.state.location.href,
                        },
                    });
                }
            },
        }),

        new Route({
            getParentRoute: () => rootRoute,
            path: '/login',
            component: Login,
            beforeLoad: async () => {
                const wasSuccess = await checkAuth();

                if (wasSuccess) {
                    throw redirect({
                        to: '/',
                        search: {
                            redirect: router.state.location.href,
                        },
                    });
                }
            },
        }),
    ]),
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
