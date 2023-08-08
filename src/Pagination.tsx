import { useEffect, useMemo, useState } from "react";
import {
   MantineReactTable,
   useMantineReactTable,
   type MRT_ColumnDef,
   type MRT_ColumnFiltersState,
   type MRT_PaginationState,
   type MRT_SortingState,
} from "mantine-react-table";
import { type Person, makeData } from "./makeData";

export const PaginationTable = () => {
   //data and fetching state
   const [data, setData] = useState<Person[]>([]);
   const [isError, setIsError] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [isRefetching, setIsRefetching] = useState(false);
   const [rowCount, setRowCount] = useState(0);

   //table state
   const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
      []
   );
   const [globalFilter, setGlobalFilter] = useState("");
   const [sorting, setSorting] = useState<MRT_SortingState>([]);
   const [pagination, setPagination] = useState<MRT_PaginationState>({
      pageIndex: 0,
      pageSize: 25,
   });

   //if you want to avoid useEffect, look at the React Query example instead
   useEffect(() => {
      if (typeof window !== "undefined") {
         setData(makeData(25));
         setRowCount(1_000);
         setIsError(false);
         setIsLoading(false);
         setIsRefetching(false);
         // setPagination({
         //    pageIndex: 1,
         //    pageSize: 25,
         // });
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [
      columnFilters, //refetch when column filters change
      globalFilter, //refetch when global filter changes
      pagination.pageIndex, //refetch when page index changes
      pagination.pageSize, //refetch when page size changes
      sorting, //refetch when sorting changes
   ]);

   const columns = useMemo<MRT_ColumnDef<Person>[]>(
      () => [
         {
            // accessorFn: "STT",
            header: "STT",
            Cell: ({ row }) => <>{row.index + 1}</>,
         },
         {
            accessorKey: "firstName",
            header: "First Name",
            size: 150,
         },
         {
            accessorKey: "middleName",
            header: "Middle Name",
            size: 150,
         },
         {
            accessorKey: "lastName",
            header: "Last Name",
            size: 150,
         },
         {
            accessorKey: "email",
            header: "Email Address",
            size: 300,
         },
         {
            accessorKey: "phoneNumber",
            header: "Phone Number",
            size: 250,
         },
         {
            accessorKey: "address",
            header: "Address",
            size: 300,
         },
         {
            accessorKey: "zipCode",
            header: "Zip Code",
         },
         {
            accessorKey: "city",
            header: "City",
            size: 220,
         },
         {
            accessorKey: "state",
            header: "State",
         },
         {
            accessorKey: "country",
            header: "Country",
            size: 350,
         },
         {
            accessorKey: "petName",
            header: "Pet Name",
         },
         {
            accessorKey: "age",
            header: "Age",
         },
         {
            accessorKey: "salary",
            header: "Salary",
         },
         {
            accessorKey: "dateOfBirth",
            header: "Date of Birth",
         },
         {
            accessorKey: "dateOfJoining",
            header: "Date of Joining",
         },
         {
            accessorKey: "isActive",
            header: "Is Active",
         },
      ],
      []
   );

   const table = useMantineReactTable({
      columns,
      data,
      enableRowSelection: true,
      getRowId: (row) => row.phoneNumber,
      initialState: { showColumnFilters: true },
      manualFiltering: true,
      manualPagination: true,
      manualSorting: true,
      rowCount,
      onColumnFiltersChange: setColumnFilters,
      onGlobalFilterChange: setGlobalFilter,
      onPaginationChange: setPagination,
      onSortingChange: setSorting,
      state: {
         columnFilters,
         globalFilter,
         isLoading,
         pagination,
         showAlertBanner: isError,
         showProgressBars: isRefetching,
         sorting,
      },
      mantineToolbarAlertBannerProps: isError
         ? { color: "red", children: "Error loading data" }
         : undefined,
   });

   return <MantineReactTable table={table} />;
};
