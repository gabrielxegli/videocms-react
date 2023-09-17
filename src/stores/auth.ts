import { refresh } from '@/util/auth';
import { Timeout } from '@tanstack/react-router';
import { Store } from '@tanstack/react-store';

interface IAuthStore {
    token: string | null;
    expiresIn: number | null;

    isLoggedIn: boolean;
    user?: IUserInfo;
}

const TOKEN_VALUE_STOREKEY = 'token-value';
const TOKEN_EXPIRES_STOREKEY = 'token-expires-in';

const onUpdate = (funcs: (() => void)[]) => () => {
    for (const func of funcs) func();
};

const persistMiddleware = () => {
    const { token, expiresIn } = authStore.state;

    if (token == null || expiresIn == null) {
        sessionStorage.removeItem(TOKEN_VALUE_STOREKEY);
        sessionStorage.removeItem(TOKEN_EXPIRES_STOREKEY);
        return;
    }

    sessionStorage.setItem(TOKEN_VALUE_STOREKEY, token);
    sessionStorage.setItem(TOKEN_EXPIRES_STOREKEY, String(expiresIn));
};

let previousExp: number;
let currentTimeout: Timeout;

const refreshMiddleware = () => {
    const { token, expiresIn } = authStore.state;

    if (token == null || expiresIn == null) return;

    if (previousExp == expiresIn && currentTimeout) return;

    currentTimeout = setTimeout(refresh, expiresIn - Date.now() - 1500);
};

export const authStore = new Store<IAuthStore>(
    {
        token: sessionStorage.getItem(TOKEN_VALUE_STOREKEY),
        expiresIn:
            1 / +(sessionStorage.getItem(TOKEN_EXPIRES_STOREKEY) || 0)
                ? +(sessionStorage.getItem(TOKEN_EXPIRES_STOREKEY) || 0)
                : null,
        isLoggedIn: false,
    },
    { onUpdate: onUpdate([persistMiddleware, refreshMiddleware]) },
);

export const updateAuthToken = ({
    token,
    expiresIn,
    isLoggedIn,
}: IAuthStore) => {
    authStore.setState((state) => ({
        ...state,
        token,
        expiresIn,
        isLoggedIn,
    }));
};

export const updateAuthUser = ({ username, isAdmin }: IUserInfo) => {
    authStore.setState((state) => ({
        ...state,
        user: {
            username,
            isAdmin,
        },
    }));
};
