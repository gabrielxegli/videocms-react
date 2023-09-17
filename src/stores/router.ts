import { Store } from '@tanstack/react-store';

interface IRouter {
    currentRoute: string;
    history: string[];
}

export const routerStore = new Store<IRouter>({
    history: [],
    currentRoute: '/',
});

export function goto(location: string) {
    routerStore.setState((state) => ({
        history: [...state.history, state.currentRoute],
        currentRoute: location,
    }));
}
