'use client';

import * as React from 'react';
import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';

import { ArrowLeft, ArrowRight, PencilLine } from 'lucide-react';
import { getEquipamentoTipos, EquipamentoTipo } from './data-get-equipamento-tipo';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';

export default function DataTableEquipamentoTipo() {
	const [tipos, setTipos] = React.useState<EquipamentoTipo[]>([]);
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});

	const fetchTipos = React.useCallback(async () => {
		try {
			const data = await getEquipamentoTipos();
			setTipos(data);
		} catch (error) {
			toast.error('Erro ao buscar os tipos de equipamento.');
		}
	}, []);

	React.useEffect(() => {
		fetchTipos();
	}, [fetchTipos]);

	const handleDelete = async (id: number) => {
		try {
			await axios.delete(`http://localhost:3000/equipamento-tipo/${id}`);
			toast.success('Tipo de equipamento excluído com sucesso!');
			fetchTipos();
		} catch (err) {
			const error = err as AxiosError<{ message?: string }>;
			const errorMessage = error.response?.data?.message ?? 'Erro ao deletar.';
			toast.error(errorMessage);
		}
	};

	const columns: ColumnDef<EquipamentoTipo>[] = [
		{
			id: 'select',
			header: ({ table }) => (
				<Checkbox
					checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
					onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
					aria-label="Selecionar todos"
				/>
			),
			cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Selecionar linha" />,
			enableSorting: false,
			enableHiding: false,
		},
		{
			accessorKey: 'descricao',
			header: () => <div className="font-bold">Descrição</div>,
			cell: ({ row }) => <div className="font-light">{row.getValue('descricao')}</div>,
		},
		{
			id: 'actions',
			enableHiding: false,
			cell: ({ row }) => (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Abrir Menu</span>
							<PencilLine />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{/* Se tiver edição: */}
						{/* <DropdownMenuItem>
							<FormsEditTipo tipoId={row.original.id} descricao={row.original.descricao} onSave={fetchTipos} />
						</DropdownMenuItem>
						<DropdownMenuSeparator /> */}
						<DropdownMenuItem className="bg-red-400/25 hover:bg-red-400" onClick={() => handleDelete(row.original.id)}>
							Excluir
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			),
		},
	];

	const table = useReactTable({
		data: tipos,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
			pagination: {
				pageIndex: 0,
				pageSize: 13,
			},
		},
	});

	return (
		<div className="w-full">
			<div className="flex items-center py-4 justify-between gap-10">
				<Input
					placeholder="Pesquisar tipo..."
					value={(table.getColumn('descricao')?.getFilterValue() as string) ?? ''}
					onChange={(event) => table.getColumn('descricao')?.setFilterValue(event.target.value)}
					className="max-w-xl"
				/>
				{/* <FormsCreateTipo onSave={fetchTipos} /> */}
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow className="bg-[#2A2A2A]" key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows.map((row) => (
							<TableRow key={row.id}>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
			{tipos.length > 13 && (
				<div className="flex items-center py-4 justify-center gap-5 mr-5 pt-5">
					<Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
						<ArrowLeft />
					</Button>
					<span>
						{table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
					</span>
					<Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
						<ArrowRight />
					</Button>
				</div>
			)}
		</div>
	);
}
