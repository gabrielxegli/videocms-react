export interface Item {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    Name: string;
    UserID: number;
    ParentFolderID: number;
}

export enum FileType {
    FOLDER = 'Folder',
    FILE = 'File',
}

export interface FolderItem extends Item {
    Type: FileType.FOLDER;
    UserID: number;
}

export interface FileItem extends Item {
    Type: FileType.FILE;
    UUID: string;
}
