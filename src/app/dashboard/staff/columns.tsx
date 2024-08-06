import { ColumnDef } from "@tanstack/react-table"

export type Staff = {
    id: number;
    robloxUsername: string;
    discordUsername: string;
    rank: string;
}

export const columns: ColumnDef<Staff>[] = [
    {
        accessorKey: 'id',
        header: 'Staff ID'
    },
    {
        accessorKey: 'robloxUsername',
        header: 'Roblox Username'
    },
    {
        accessorKey: 'discordUsername',
        header: 'Discord Username'
    },
    {
        accessorKey: 'rank',
        header: 'Rank'
    }
]