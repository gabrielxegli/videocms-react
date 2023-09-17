import { authStore, updateAuthToken } from '@/stores/auth';
import { FileItem, FolderItem, FileType } from '@/types/files';

const BASE_URL = import.meta.env.VITE_API_URL;
const PARENT_FOLDER_ID = 0;

export async function getFiles() {
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

    const filesPromise = fetch(
        `${BASE_URL}/api/files?ParentFolderID=${PARENT_FOLDER_ID}`,
        fetchParams,
    );

    const foldersPromise = fetch(
        `${BASE_URL}/api/folders?ParentFolderID=${PARENT_FOLDER_ID}`,
        fetchParams,
    );

    clearTimeout(id);

    const [filesRes, folderRes] = await Promise.all([
        filesPromise,
        foldersPromise,
    ]);

    const [files, folders] = (await Promise.all([
        filesRes.json(),
        folderRes.json(),
    ])) as [FileItem[], FolderItem[]];

    return [
        ...files.map((f) => ({ ...f, Type: FileType.FILE })),
        ...folders.map((f) => ({ ...f, Type: FileType.FOLDER })),
    ] as (FolderItem | FileItem)[];
}
