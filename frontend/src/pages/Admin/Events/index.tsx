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
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { apiRequest } from "@/services/api";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, MapPin } from "lucide-react";
import { format } from "date-fns";
import { EventTableSkeleton } from "./TableSkeleton";

interface Event {
    id: string;
    title: string;
    title_am?: string;
    description: string;
    event_date: string;
    start_time: string;
    end_time: string;
    location: string;
    category: string;
    is_featured: boolean;
    is_recurring: boolean;
}

export default function AdminEvents() {
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);
    const [formData, setFormData] = useState<Partial<Event>>({});

    const fetchEvents = async () => {
        setIsLoading(true);
        try {
            const data = await apiRequest<{ items: Event[] }>("/events?page_size=100");
            setEvents(data.items);
        } catch (error) {
            console.error("Failed to fetch events", error);
            toast.error("Failed to fetch events");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleCreate = () => {
        setEditingEvent(null);
        setFormData({
            is_featured: false,
            is_recurring: false,
            category: "general",
            event_date: new Date().toISOString().split('T')[0]
        });
        setIsDialogOpen(true);
    };

    const handleEdit = (event: Event) => {
        setEditingEvent(event);
        setFormData({
            ...event,
            event_date: event.event_date.split('T')[0] // Format for input type="date"
        });
        setIsDialogOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this event?")) return;
        try {
            await apiRequest(`/events/${id}`, { method: "DELETE" });
            toast.success("Event deleted");
            fetchEvents();
        } catch (error) {
            toast.error("Failed to delete event");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                start_time: formData.start_time?.length === 5 ? `${formData.start_time}:00` : formData.start_time,
                end_time: formData.end_time?.length === 5 ? `${formData.end_time}:00` : formData.end_time,
            };

            if (editingEvent) {
                await apiRequest(`/events/${editingEvent.id}`, {
                    method: "PUT",
                    body: JSON.stringify(payload),
                });
                toast.success("Event updated");
            } else {
                await apiRequest("/events", {
                    method: "POST",
                    body: JSON.stringify(payload),
                });
                toast.success("Event created");
            }
            setIsDialogOpen(false);
            fetchEvents();
        } catch (error) {
            toast.error("Failed to save event");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-heading font-bold text-navy">Events</h2>
                    <p className="text-muted-foreground">Manage upcoming church events</p>
                </div>
                <Button onClick={handleCreate} className="bg-navy hover:bg-navy-light">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Event
                </Button>
            </div>

            {isLoading ? (
                <EventTableSkeleton />
            ) : (
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
                            {events.length > 0 ? (
                                events.map((e) => (
                                    <TableRow key={e.id}>
                                        <TableCell className="font-medium">
                                            <div className="flex flex-col">
                                                <span className="font-semibold">{e.title}</span>
                                                {e.is_recurring && <span className="text-xs text-muted-foreground">Recurring</span>}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col text-sm">
                                                <span>{format(new Date(e.event_date), "MMM d, yyyy")}</span>
                                                <span className="text-muted-foreground">{e.start_time.slice(0, 5)} - {e.end_time.slice(0, 5)}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center text-sm text-muted-foreground">
                                                <MapPin className="w-3 h-3 mr-1" />
                                                {e.location}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="secondary" className="capitalize">{e.category}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            {e.is_featured && <Badge variant="outline" className="border-gold text-gold-dark">Featured</Badge>}
                                        </TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button variant="ghost" size="icon" onClick={() => handleEdit(e)}>
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600" onClick={() => handleDelete(e.id)}>
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center h-24">
                                        No events found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            )}

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{editingEvent ? "Edit Event" : "New Event"}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title (English)</Label>
                                    <Input
                                        id="title"
                                        value={formData.title || ""}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="title_am">Title (Amharic)</Label>
                                    <Input
                                        id="title_am"
                                        value={formData.title_am || ""}
                                        onChange={(e) => setFormData({ ...formData, title_am: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="desc">Description</Label>
                                <Textarea
                                    id="desc"
                                    value={formData.description || ""}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="date">Date</Label>
                                    <Input
                                        id="date"
                                        type="date"
                                        value={formData.event_date || ""}
                                        onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <select
                                        id="category"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        value={formData.category || "general"}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        <option value="general">General</option>
                                        <option value="worship">Worship</option>
                                        <option value="prayer">Prayer</option>
                                        <option value="youth">Youth</option>
                                        <option value="outreach">Outreach</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="start_time">Start Time</Label>
                                    <Input
                                        id="start_time"
                                        type="time"
                                        value={formData.start_time || ""}
                                        onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="end_time">End Time</Label>
                                    <Input
                                        id="end_time"
                                        type="time"
                                        value={formData.end_time || ""}
                                        onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="location">Location</Label>
                                <Input
                                    id="location"
                                    value={formData.location || ""}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <Label htmlFor="recurring">Recurring Event</Label>
                                <Switch
                                    id="recurring"
                                    checked={formData.is_recurring}
                                    onCheckedChange={(c) => setFormData({ ...formData, is_recurring: c })}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <Label htmlFor="featured">Featured on Homepage</Label>
                                <Switch
                                    id="featured"
                                    checked={formData.is_featured}
                                    onCheckedChange={(c) => setFormData({ ...formData, is_featured: c })}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" className="bg-navy hover:bg-navy-light">Save Changes</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
