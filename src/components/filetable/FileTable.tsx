import React, { useEffect } from 'react';
import {
    SortingState,
    RowSelectionState,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
    Row,
} from '@tanstack/react-table';
import { useWindowVirtualizer } from '@tanstack/react-virtual';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableCaption,
} from '@/components/ui/table';
import { FileItem, FileType, FolderItem } from '@/types/files';
import { columns } from './ColumnsDef';
import { useDrag, useDrop } from 'react-dnd';
import { useState } from 'react';

export const ItemTypes = {
    MOVE_TO: 'move-to',
};

interface IRowProps {
    row: Row<FolderItem | FileItem>;
}

const FileTableRow: React.FC<React.PropsWithChildren<IRowProps>> = ({
    row,
}) => {
    const [{ opacity }, dragRef] = useDrag(() => ({
        type: ItemTypes.MOVE_TO,
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.5 : 1,
        }),
        end: () => console.log('nice'),
    }));

    const [, drop] = useDrop(() => ({
        accept: ItemTypes.MOVE_TO,
    }));

    return (
        <TableRow
            ref={dragRef}
            key={row.id}
            style={{
                opacity,
            }}
            data-state={row.getIsSelected() && 'selected'}
        >
            <TableRow
                ref={(e) => row.original.Type === FileType.FOLDER && drop(e)}
                className="contents"
            >
                {row.getVisibleCells().map((cell) => (
                    <TableCell
                        className={
                            {
                                select: 'w-7 pr-2',
                                actions: 'w-px pr-2',
                                Type: 'w-px',
                                UUID: 'm-0 w-0 p-0',
                                ID: 'm-0 w-0 p-0',
                            }[cell.getContext().column.id] || ''
                        }
                        key={cell.id}
                    >
                        {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                        )}
                    </TableCell>
                ))}
            </TableRow>
        </TableRow>
    );
};

interface IFileTableProps {
    data: (FolderItem | FileItem)[];
}

export const FileTable: React.FC<IFileTableProps> = ({ data }) => {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [rowSelection, setRowSelection] = React.useState<RowSelectionState>(
        {},
    );

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            rowSelection,
        },
    });

    const { rows } = table.getRowModel();

    const parentRef = React.useRef<HTMLDivElement>(null);

    const virtualizer = useWindowVirtualizer({
        count: rows.length,
        estimateSize: () => 30,
    });

    return (
        <div ref={parentRef}>
            <div
                className="w-full"
                style={{ height: virtualizer.getTotalSize() + 'px' }}
            >
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            className={
                                                {
                                                    UpdatedAt: 'pr-0.5',
                                                    UUID: 'm-0 w-0 p-0',
                                                    ID: 'm-0 w-0 p-0',
                                                }[
                                                    header.getContext().column
                                                        .id
                                                ] || ''
                                            }
                                            key={header.id}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext(),
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {virtualizer.getVirtualItems().map((virtRow) => {
                            const row = rows[virtRow.index] as Row<
                                FolderItem | FileItem
                            >;

                            return <FileTableRow row={row} />;
                        })}

                        {/* {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            className={
                                                {
                                                    select: 'w-7 pr-2',
                                                    actions: 'w-px pr-2',
                                                    Type: 'w-px',
                                                    UUID: 'm-0 w-0 p-0',
                                                    ID: 'm-0 w-0 p-0',
                                                }[
                                                    cell.getContext().column.id
                                                ] || ''
                                            }
                                            key={cell.id}
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )} */}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};
