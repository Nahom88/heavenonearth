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
import { Plus, Pencil, Trash2, Church } from "lucide-react";
import { MinistryTableSkeleton } from "./TableSkeleton";

interface Ministry {
    id: string;
    title: string;
    title_am?: string;
    description: string;
    ministry_key: string;
    is_active: boolean;
    is_featured: boolean;
}

export default function AdminMinistries() {
    const [ministries, setMinistries] = useState<Ministry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingMinistry, setEditingMinistry] = useState<Ministry | null>(null);
    const [formData, setFormData] = useState<Partial<Ministry>>({});

    const fetchMinistries = async () => {
        setIsLoading(true);
        try {
            const data = await apiRequest<{ items: Ministry[] }>("/ministries?page_size=100");
            setMinistries(data.items);
        } catch (error) {
            console.error("Failed to fetch ministries", error);
            toast.error("Failed to fetch ministries");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMinistries();
    }, []);

    const handleCreate = () => {
        setEditingMinistry(null);
        setFormData({ is_active: true, is_featured: false });
        setIsDialogOpen(true);
    };

    const handleEdit = (ministry: Ministry) => {
        setEditingMinistry(ministry);
        setFormData(ministry);
        setIsDialogOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this ministry?")) return;
        try {
            await apiRequest(`/ministries/${id}`, { method: "DELETE" });
            toast.success("Ministry deleted");
            fetchMinistries();
        } catch (error) {
            toast.error("Failed to delete ministry");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingMinistry) {
                await apiRequest(`/ministries/${editingMinistry.id}`, {
                    method: "PUT",
                    body: JSON.stringify(formData),
                });
                toast.success("Ministry updated");
            } else {
                await apiRequest("/ministries", {
                    method: "POST",
                    body: JSON.stringify(formData),
                });
                toast.success("Ministry created");
            }
            setIsDialogOpen(false);
            fetchMinistries();
        } catch (error) {
            toast.error("Failed to save ministry");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-heading font-bold text-navy">Ministries</h2>
                    <p className="text-muted-foreground">Manage church ministries and departments</p>
                </div>
                <Button onClick={handleCreate} className="bg-navy hover:bg-navy-light">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Ministry
                </Button>
            </div>

            {isLoading ? (
                <MinistryTableSkeleton />
            ) : (
                <div className="bg-white rounded-lg shadow-sm border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Key</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Featured</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {ministries.length > 0 ? (
                                ministries.map((m) => (
                                    <TableRow key={m.id}>
                                        <TableCell className="font-medium flex items-center gap-2">
                                            <Church className="w-4 h-4 text-gold" />
                                            {m.title}
                                        </TableCell>
                                        <TableCell className="font-mono text-xs">{m.ministry_key}</TableCell>
                                        <TableCell>
                                            <Badge variant={m.is_active ? "default" : "secondary"} className={m.is_active ? "bg-green-600" : ""}>
                                                {m.is_active ? "Active" : "Inactive"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {m.is_featured && <Badge variant="outline" className="border-gold text-gold-dark">Featured</Badge>}
                                        </TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button variant="ghost" size="icon" onClick={() => handleEdit(m)}>
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600" onClick={() => handleDelete(m.id)}>
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center h-24">
                                        No ministries found.
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
                        <DialogTitle>{editingMinistry ? "Edit Ministry" : "New Ministry"}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid gap-4">
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
                            <div className="space-y-2">
                                <Label htmlFor="key">Key (Unique ID)</Label>
                                <Input
                                    id="key"
                                    value={formData.ministry_key || ""}
                                    onChange={(e) => setFormData({ ...formData, ministry_key: e.target.value })}
                                    disabled={!!editingMinistry}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="desc">Description</Label>
                                <Textarea
                                    id="desc"
                                    value={formData.description || ""}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="active">Active Status</Label>
                                <Switch
                                    id="active"
                                    checked={formData.is_active}
                                    onCheckedChange={(c) => setFormData({ ...formData, is_active: c })}
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