import { FileItem, FileType, FolderItem } from '@/types/files';
import { ColumnDef } from '@tanstack/react-table';
import dayjs, { extend } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';

import { ChevronsUpDown, Folder, File, MoreHorizontal } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Link } from '@tanstack/react-router';

const BASE_URL = import.meta.env.VITE_API_URL;

extend(relativeTime);

type TableItem = FolderItem | FileItem;

export const columns: ColumnDef<TableItem>[] = [
    {
        accessorKey: 'UUID',
        cell: '',
        header: '',
    },
    {
        accessorKey: 'ID',
        cell: '',
        header: '',
    },

    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'Type',
        header: ({ column }) => (
            <Button
                variant="link"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
                className="m-0 flex items-center justify-center p-0 text-muted-foreground"
            >
                <ChevronsUpDown className="m-0.5 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) =>
            row.getValue('Type') == FileType.FOLDER ? (
                <Folder className="h-5 w-5" />
            ) : (
                <File className="h-5 w-5" />
            ),
    },
    {
        accessorKey: 'Name',
        header: ({ column }) => (
            <Button
                className="px-0 text-muted-foreground"
                variant="link"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
            >
                NAME
                <ChevronsUpDown className="ml-1 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) =>
            row.getValue('Type') == FileType.FILE ? (
                <Link to={`${BASE_URL}/${row.getValue('UUID')}`}>
                    <Button variant="link" className="p-0">
                        {row.getValue('Name')}
                    </Button>
                </Link>
            ) : (
                <Button
                    onClick={() => {
                        console.log('MOVE TO FOLDER: ', row.getValue('ID'));
                    }}
                    variant="link"
                    className="p-0"
                >
                    {row.getValue('Name')}
                </Button>
            ),
    },
    {
        accessorKey: 'UpdatedAt',
        header: ({ column }) => {
            return (
                <Button
                    className="float-right px-0 text-muted-foreground"
                    variant="link"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    LAST UPDATED
                    <ChevronsUpDown className="ml-1 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="lowercas text-right">
                {dayjs(row.getValue('UpdatedAt')).fromNow()}
            </div>
        ),
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: () => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>Copy payment ID</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View customer</DropdownMenuItem>
                    <DropdownMenuItem>View payment details</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
];
