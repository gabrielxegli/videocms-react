import { toast } from 'react-hot-toast';
import { authStore, updateAuthToken } from '../stores/auth';
import { tryit } from 'radash';

const BASE_URL = import.meta.env.VITE_API_URL;

interface ILoginSuccess {
    exp: string;
    token: string;
}

export async function login(username: string, password: string) {
    const toastId = toast.loading(`Logging in ${username}`);

    const formData = new FormData();

    formData.append('username', username);
    formData.append('password', password);

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 8000);

    const fetchParams: RequestInit = {
        method: 'POST',
        body: formData,
        signal: controller.signal,
    };

    const [err, response] = await tryit(fetch)(
        `${BASE_URL}/api/auth/login`,
        fetchParams,
    );

    if (err) {
        toast.remove(toastId);
        return toast.error('Ups, timeout reached or connection refused!');
    }

    clearTimeout(id);

    toast.remove(toastId);

    if (response.status !== 200) {
        const error = await response.text();

        return toast.error(`Ups, ${error}!`);
    }

    const { token, exp } = (await response.json()) as ILoginSuccess;

    const expiresIn = Date.parse(exp);

    if (Number.isNaN(expiresIn)) {
        return toast.error('Ups, token expire date is faulty!');
    }

    updateAuthToken({ token, expiresIn, isLoggedIn: true });

    toast.success('Logged in successfully');
}

export async function checkAuth() {
    const { token } = authStore.state;

    if (token == null || token.length == 0) {
        updateAuthToken({
            token: null,
            expiresIn: null,
            isLoggedIn: false,
        });

        return;
    }

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 8000);

    const fetchParams: RequestInit = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        signal: controller.signal,
    };

    const [err, res] = await tryit(fetch)(
        `${BASE_URL}/api/auth/check`,
        fetchParams,
    );

    clearTimeout(id);

    if (err || !res.ok) {
        return false;
    }

    updateAuthToken({
        ...authStore.state,
        isLoggedIn: true,
    });

    return true;
}

interface IRefreshSuccess {
    exp: string;
    token: string;
}

export async function refresh() {
    const { token } = authStore.state;

    if (token == null || token.length == 0) {
        updateAuthToken({
            token: null,
            expiresIn: null,
            isLoggedIn: false,
        });

        return;
    }

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 8000);

    const fetchParams: RequestInit = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        signal: controller.signal,
    };

    const [err, res] = await tryit(fetch)(
        `${BASE_URL}/api/auth/refresh`,
        fetchParams,
    );

    clearTimeout(id);

    if (err || !res.ok) {
        updateAuthToken({
            token: null,
            expiresIn: null,
            isLoggedIn: false,
        });

        return;
    }

    const { token: newToken, exp: newExp } =
        (await res.json()) as IRefreshSuccess;

    updateAuthToken({
        token: newToken,
        expiresIn: Date.parse(newExp),
        isLoggedIn: true,
    });
}
