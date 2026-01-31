import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export const EventTableSkeleton = () => {
    return (
        <div className="bg-white rounded-lg shadow-sm border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Event</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Featured</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.from({ length: 7 }).map((_, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <div className="flex flex-col gap-2">
                                    <Skeleton className="h-5 w-32" />
                                    <Skeleton className="h-4 w-20" />
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex flex-col gap-2">
                                    <Skeleton className="h-5 w-24" />
                                    <Skeleton className="h-4 w-28" />
                                </div>
                            </TableCell>
                            <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                            <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                            <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                    <Skeleton className="h-8 w-8" />
                                    <Skeleton className="h-8 w-8" />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};
