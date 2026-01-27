import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { apiRequest } from "@/services/api";
import { Calendar, Plus } from "lucide-react";
import { format } from "date-fns";

interface Event {
    id: string;
    title: string;
    event_date: string;
    location: string;
    category: string;
    is_featured: boolean;
}

export default function AdminEvents() {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await apiRequest<{ items: Event[] }>("/events?page_size=100");
                setEvents(data.items);
            } catch (error) {
                console.error("Failed to fetch events", error);
            }
        };
        fetchEvents();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-heading font-bold text-navy">Events</h2>
                    <p className="text-muted-foreground">Manage upcoming church events</p>
                </div>
                <Button className="bg-navy hover:bg-navy-light">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Event
                </Button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Event</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Featured</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {events.map((e) => (
                            <TableRow key={e.id}>
                                <TableCell className="font-medium">{e.title}</TableCell>
                                <TableCell>{format(new Date(e.event_date), "MMM d, yyyy h:mm a")}</TableCell>
                                <TableCell>{e.location}</TableCell>
                                <TableCell>
                                    <Badge variant="secondary">{e.category}</Badge>
                                </TableCell>
                                <TableCell>
                                    {e.is_featured && <Badge variant="outline" className="border-gold text-gold-dark">Featured</Badge>}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
