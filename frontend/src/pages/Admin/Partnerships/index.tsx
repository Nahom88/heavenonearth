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
import { toast } from "sonner";
import { Trash2, Eye, Mail, Phone, Building2 } from "lucide-react";
import { format } from "date-fns";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface Partnership {
    id: string;
    organization_name: string;
    contact_person: string;
    email: string;
    phone: string;
    partnership_type: string;
    status: string;
    created_at: string;
    message?: string;
}

export default function AdminPartnerships() {
    const [partnerships, setPartnerships] = useState<Partnership[]>([]);
    const [selectedPartnership, setSelectedPartnership] = useState<Partnership | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    const fetchPartnerships = async () => {
        try {
            const data = await apiRequest<{ items: Partnership[] }>("/partnerships?page_size=100");
            setPartnerships(data.items);
        } catch (error) {
            console.error("Failed to fetch partnerships", error);
        }
    };

    useEffect(() => {
        fetchPartnerships();
    }, []);

    const handleView = (partnership: Partnership) => {
        setSelectedPartnership(partnership);
        setIsDetailsOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this application?")) return;
        try {
            await apiRequest(`/partnerships/${id}`, { method: "DELETE" });
            toast.success("Application deleted");
            fetchPartnerships();
        } catch (error) {
            toast.error("Failed to delete application");
        }
    };

    const updateStatus = async (status: string) => {
        if (!selectedPartnership) return;
        try {
            await apiRequest(`/partnerships/${selectedPartnership.id}`, {
                method: "PUT",
                body: JSON.stringify({ status }),
            });
            toast.success(`Application marked as ${status}`);
            setIsDetailsOpen(false);
            fetchPartnerships();
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-heading font-bold text-navy">Partnerships</h2>
                    <p className="text-muted-foreground">Review partnership applications</p>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Organization</TableHead>
                            <TableHead>Contact Person</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {partnerships.map((p) => (
                            <TableRow key={p.id}>
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-2">
                                        <Building2 className="w-4 h-4 text-gray-400" />
                                        {p.organization_name}
                                    </div>
                                </TableCell>
                                <TableCell>{p.contact_person}</TableCell>
                                <TableCell className="capitalize">{p.partnership_type}</TableCell>
                                <TableCell>{format(new Date(p.created_at), "MMM d, yyyy")}</TableCell>
                                <TableCell>
                                    <Badge variant={p.status === 'approved' ? 'default' : 'secondary'}
                                        className={p.status === 'approved' ? 'bg-green-600' : p.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}>
                                        {p.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button variant="ghost" size="icon" onClick={() => handleView(p)}>
                                        <Eye className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600" onClick={() => handleDelete(p.id)}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Application Details</DialogTitle>
                    </DialogHeader>

                    {selectedPartnership && (
                        <div className="space-y-6 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <Label className="text-muted-foreground">Organization</Label>
                                    <p className="font-medium">{selectedPartnership.organization_name}</p>
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-muted-foreground">Contact Person</Label>
                                    <p className="font-medium">{selectedPartnership.contact_person}</p>
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-muted-foreground">Email</Label>
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-gray-400" />
                                        <a href={`mailto:${selectedPartnership.email}`} className="text-blue-600 hover:underline">
                                            {selectedPartnership.email}
                                        </a>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-muted-foreground">Phone</Label>
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-gray-400" />
                                        <p>{selectedPartnership.phone}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                                <Label className="text-muted-foreground">Message / Proposal</Label>
                                <p className="text-gray-800 whitespace-pre-wrap">{selectedPartnership.message || "No message provided."}</p>
                            </div>
                        </div>
                    )}

                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button variant="outline" onClick={() => updateStatus("rejected")}>
                            Reject
                        </Button>
                        <Button className="bg-green-600 hover:bg-green-700" onClick={() => updateStatus("approved")}>
                            Approve Partnership
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
