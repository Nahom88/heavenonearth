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
import { Switch } from "@/components/ui/switch";
import { apiRequest } from "@/services/api";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Image as ImageIcon } from "lucide-react";
import { format } from "date-fns";
import { GalleryTableSkeleton } from "./TableSkeleton";

interface GalleryItem {
    id: string;
    title: string;
    title_am?: string;
    category: string;
    media_type: "image" | "video";
    src_url: string;
    thumbnail_url?: string;
    is_featured: boolean;
    is_published: boolean;
    event_date: string;
}

export default function AdminGallery() {
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
    const [formData, setFormData] = useState<Partial<GalleryItem>>({});

    const fetchItems = async () => {
        setIsLoading(true);
        try {
            const data = await apiRequest<{ items: GalleryItem[] }>("/gallery?page_size=100");
            setItems(data.items);
        } catch (error) {
            console.error("Failed to fetch gallery items", error);
            toast.error("Failed to fetch gallery items");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleCreate = () => {
        setEditingItem(null);
        setFormData({
            is_featured: false,
            is_published: true,
            media_type: "image",
            category: "general",
            event_date: new Date().toISOString()
        });
        setIsDialogOpen(true);
    };

    const handleEdit = (item: GalleryItem) => {
        setEditingItem(item);
        setFormData(item);
        setIsDialogOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this item?")) return;
        try {
            await apiRequest(`/gallery/${id}`, { method: "DELETE" });
            toast.success("Item deleted");
            fetchItems();
        } catch (error) {
            toast.error("Failed to delete item");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingItem) {
                await apiRequest(`/gallery/${editingItem.id}`, {
                    method: "PUT",
                    body: JSON.stringify(formData),
                });
                toast.success("Item updated");
            } else {
                await apiRequest("/gallery", {
                    method: "POST",
                    body: JSON.stringify(formData),
                });
                toast.success("Item created");
            }
            setIsDialogOpen(false);
            fetchItems();
        } catch (error) {
            toast.error("Failed to save item");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-heading font-bold text-navy">Gallery</h2>
                    <p className="text-muted-foreground">Manage photos and videos</p>
                </div>
                <Button onClick={handleCreate} className="bg-navy hover:bg-navy-light">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Item
                </Button>
            </div>

            {isLoading ? (
                <GalleryTableSkeleton />
            ) : (
                <div className="bg-white rounded-lg shadow-sm border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Preview</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Featured</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {items.length > 0 ? (
                                items.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            <div className="w-16 h-10 bg-gray-100 rounded overflow-hidden relative group">
                                                {item.media_type === 'image' ? (
                                                    <img
                                                        src={item.src_url}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=No+Image';
                                                        }}
                                                    />
                                                ) : (
                                                    <div className="flex items-center justify-center h-full bg-gray-200">
                                                        <ImageIcon className="w-4 h-4 text-gray-400" />
                                                    </div>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium">{item.title}</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary" className="capitalize">{item.category}</Badge>
                                        </TableCell>
                                        <TableCell>{format(new Date(item.event_date), "MMM d, yyyy")}</TableCell>
                                        <TableCell>
                                            <Badge variant={item.is_published ? "default" : "secondary"} className={item.is_published ? "bg-green-600" : ""}>
                                                {item.is_published ? "Published" : "Draft"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {item.is_featured && <Badge variant="outline" className="border-gold text-gold-dark">Featured</Badge>}
                                        </TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600" onClick={() => handleDelete(item.id)}>
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center h-24">
                                        No gallery items found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            )}

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>{editingItem ? "Edit Item" : "New Gallery Item"}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    value={formData.title || ""}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="src_url">Image/Video URL</Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="src_url"
                                        value={formData.src_url || ""}
                                        onChange={(e) => setFormData({ ...formData, src_url: e.target.value })}
                                        placeholder="/images/gallery/..."
                                        required
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground">Enter the path to the image or video file.</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
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
                                        <option value="outreach">Outreach</option>
                                        <option value="baptism">Baptism</option>
                                        <option value="youth">Youth</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="media_type">Type</Label>
                                    <select
                                        id="media_type"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        value={formData.media_type || "image"}
                                        onChange={(e) => setFormData({ ...formData, media_type: e.target.value as "image" | "video" })}
                                    >
                                        <option value="image">Image</option>
                                        <option value="video">Video</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <Label htmlFor="published">Published</Label>
                                <Switch
                                    id="published"
                                    checked={formData.is_published}
                                    onCheckedChange={(c) => setFormData({ ...formData, is_published: c })}
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
