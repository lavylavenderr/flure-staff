// @ts-nocheck
"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { Edit, Eye, Loader2, Plus, RefreshCcw, RefreshCw } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getRoles } from "@/actions/users/getRoles";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { updateUser } from "@/actions/users/updateUser";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { addStaff } from "@/actions/users/addStaff";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  manageStaff: boolean;
  userId: number;
  rankOrder: number;
}

export const schema = z.object({
  discordId: z.string(),
  robloxId: z.string(),
  rankId: z.string(),
  staffId: z.number(),
});

export const addSchema = z.object({
  discordId: z.string(),
  robloxId: z.string(),
  rankId: z.string(),
});

export type FormData = z.infer<typeof schema>;

export function DataTable<TData, TValue>({
  columns,
  data,
  manageStaff,
  userId,
  rankOrder,
}: DataTableProps<TData, TValue>) {
  const { toast } = useToast();
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [addOpen, setAddOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<TData | null>(null);

  const {
    data: rankData,
    refetch: refetchRoles,
    isLoading: isRoleLoading,
  } = useQuery({
    queryKey: ["getRoles"],
    queryFn: async () => {
      return await getRoles();
    },
  });

  const { mutate: updateUsr, isPending } = useMutation({
    mutationFn: async (values: z.infer<typeof schema>) => {
      return await updateUser(values);
    },
    onSuccess: async () => {
      setEditOpen(false);
      window.location.reload();
    },
    onError: async (error) => {
      if ((error as Error).message === "INVALID_ROBLOX") {
        return toast({
          title: "Oops!",
          description: "You provided an invalid Roblox ID",
        });
      } else if ((error as Error).message === "INVALID_DISCORD") {
        return toast({
          title: "Oops!",
          description: "You provided an invalid Discord ID",
        });
      }
    },
  });

  const { mutate: addUser, isPending: isAddPending } = useMutation({
    mutationFn: async (values: z.infer<typeof addSchema>) => {
      return await addStaff(values);
    },
    onSuccess: async () => {
      setEditOpen(false);
      window.location.reload();
    },
    onError: async (error) => {
      if ((error as Error).message === "INVALID_ROBLOX") {
        return toast({
          title: "Oops!",
          description: "You provided an invalid Roblox ID",
        });
      } else if ((error as Error).message === "INVALID_DISCORD") {
        return toast({
          title: "Oops!",
          description: "You provided an invalid Discord ID",
        });
      }
    },
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const addForm = useForm<z.infer<typeof addSchema>>({
    resolver: zodResolver(addSchema),
  });

  function onSubmit(values: z.infer<typeof schema>) {
    updateUsr(values);
  }

  function onAddSubmit(values: z.infer<typeof addSchema>) {
    addUser(values);
  }

  function openEditDialog(rowData: TData) {
    setSelectedUser(rowData);
    setEditOpen(true);
  }

  return isRoleLoading ? (
    <Skeleton className="mt-3 w-full" />
  ) : (
    <>
      {manageStaff ? (
        <div className="flex flex-row mb-1 mt-4 gap-2">
          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700 flex items-center gap-1">
                <Plus className="h-4 w-4 mt-[2px]" />
                <span>Add Staff</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Add Staff</DialogTitle>
              <Form {...addForm}>
                <form
                  className="space-y-2"
                  onSubmit={addForm.handleSubmit(onAddSubmit)}
                >
                  <FormField
                    control={addForm.control}
                    name="discordId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Discord ID</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            id="discordId"
                            className="col-span-3"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={addForm.control}
                    name="robloxId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Roblox ID</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            id="robloxId"
                            className="col-span-3"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={addForm.control}
                    name="rankId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rank</FormLabel>
                        <Select
                          defaultValue={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select a Rank" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {rankData
                              .filter((rank) => rank.displayOrder > rankOrder)
                              .map((rank) => (
                                <SelectItem
                                  key={rank.id}
                                  value={String(rank.id)}
                                >
                                  {rank.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="bg-[#922D79] hover:bg-[#922D79 mt-6"
                    disabled={isAddPending}
                  >
                    {isAddPending ? (
                      <Loader2 className={cn(isPending && "animate-spin")} />
                    ) : (
                      "Add Member"
                    )}
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
          <Button className="bg-yellow-600 hover:bg-yellow-700 flex items-center gap-1">
            <RefreshCw className="h-4 w-4 mt-[2px]" />
            <span>Reactivate Account</span>
          </Button>
        </div>
      ) : (
        <></>
      )}
      <div className="animate-in slide-in-from-left">
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter by Roblox Username..."
            value={
              (table.getColumn("robloxUsername")?.getFilterValue() as string) ??
              ""
            }
            onChange={(event) =>
              table
                .getColumn("robloxUsername")
                ?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                  <TableHead>Actions</TableHead>
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                    <TableCell>
                      <div className="flex gap-2">
                        {manageStaff && (
                          <Dialog
                            open={editOpen}
                            onOpenChange={setEditOpen}
                            key={row.getValue("id")}
                          >
                            <DialogTrigger asChild>
                              <Button
                                className="bg-yellow-600 hover:bg-yellow-700 w-9 h-9 p-[10px]"
                                disabled={
                                  parseInt(row.getValue("id")) === userId ||
                                  data.find(
                                    (member: any) =>
                                      member.id === parseInt(row.getValue("id"))
                                  )?.rankViewOrder <= rankOrder
                                }
                                onClick={() => openEditDialog(row.original)}
                              >
                                <Edit className="w-9 h-9" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-white dark:bg-gray-800">
                              <DialogTitle>
                                Editing: {selectedUser?.robloxUsername}
                              </DialogTitle>
                              <Form {...form}>
                                <form
                                  onSubmit={form.handleSubmit(onSubmit)}
                                  className="space-y-2"
                                >
                                  <FormField
                                    control={form.control}
                                    name="staffId"
                                    defaultValue={selectedUser?.id || ""}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Staff ID</FormLabel>
                                        <FormControl>
                                          <Input
                                            {...field}
                                            id="staffId"
                                            autoFocus={false}
                                            disabled={true}
                                          />
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />

                                  <FormField
                                    control={form.control}
                                    name="discordId"
                                    defaultValue={selectedUser?.discordId || ""}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Discord ID</FormLabel>
                                        <FormControl>
                                          <Input
                                            {...field}
                                            id="discordId"
                                            className="col-span-3"
                                          />
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />

                                  <FormField
                                    control={form.control}
                                    name="robloxId"
                                    defaultValue={selectedUser?.robloxId || ""}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Roblox ID</FormLabel>
                                        <FormControl>
                                          <Input
                                            {...field}
                                            id="robloxId"
                                            className="col-span-3"
                                          />
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />

                                  <FormField
                                    control={form.control}
                                    name="rankId"
                                    defaultValue={String(
                                      selectedUser?.rankId || ""
                                    )}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Rank</FormLabel>
                                        <FormControl>
                                          <Select
                                            onValueChange={(v) => {
                                              field.onChange(v);
                                              onChange && onChange(v);
                                            }}
                                            defaultValue={field.value}
                                            name={field.name}
                                          >
                                            <SelectTrigger className="col-span-3">
                                              <SelectValue placeholder="Select a Rank" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              {rankData
                                                .filter(
                                                  (rank) =>
                                                    rank.displayOrder >=
                                                    rankOrder
                                                )
                                                .map((rank) => (
                                                  <SelectItem
                                                    key={rank.id}
                                                    value={String(rank.id)}
                                                  >
                                                    {rank.name}
                                                  </SelectItem>
                                                ))}
                                            </SelectContent>
                                          </Select>
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />

                                  <Button
                                    type="submit"
                                    className="bg-[#922D79] hover:bg-[#922D79 mt-6"
                                    disabled={isPending}
                                  >
                                    {isPending ? (
                                      <Loader2
                                        className={cn(
                                          isPending && "animate-spin"
                                        )}
                                      />
                                    ) : (
                                      "Save Changes"
                                    )}
                                  </Button>
                                </form>
                              </Form>
                            </DialogContent>
                          </Dialog>
                        )}
                        <a href={`/dashboard/staff/${row.getValue("id")}`}>
                          <Button className="bg-blue-600 hover:bg-blue-700 w-9 h-9 p-[10px]">
                            <Eye className="w-9 h-9" />
                          </Button>
                        </a>
                      </div>
                    </TableCell>
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
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
