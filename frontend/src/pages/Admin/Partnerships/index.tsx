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
import { Trash2, Eye, Mail, Phone, Building2, Loader2 } from "lucide-react";
import { LoadingButton } from "@/components/ui/loading-button";
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
    name: string;
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
    const [isLoading, setIsLoading] = useState(true);
    const [isActionLoading, setIsActionLoading] = useState(false);

    const fetchPartnerships = async () => {
        setIsLoading(true);
        try {
            const data = await apiRequest<{ items: Partnership[] }>("/partnerships?page_size=100");
            setPartnerships(data.items);
        } catch (error) {
            console.error("Failed to fetch partnerships", error);
            toast.error("Failed to load partnerships");
        } finally {
            setIsLoading(false);
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
        setIsActionLoading(true);
        try {
            await apiRequest(`/partnerships/${id}`, { method: "DELETE" });
            toast.success("Application deleted");
            fetchPartnerships();
        } catch (error) {
            toast.error("Failed to delete application");
        } finally {
            setIsActionLoading(false);
        }
    };

    const updateStatus = async (status: string) => {
        if (!selectedPartnership) return;
        setIsActionLoading(true);
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
        } finally {
            setIsActionLoading(false);
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
                            <TableHead>Name / Organization</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-32 text-center">
                                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-gold" />
                                    <p className="text-sm text-muted-foreground mt-2">Loading partnerships...</p>
                                </TableCell>
                            </TableRow>
                        ) : partnerships.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                                    No partnerships found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            partnerships.map((p) => (
                                <TableRow key={p.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            <Building2 className="w-4 h-4 text-gray-400" />
                                            {p.name}
                                        </div>
                                    </TableCell>
                                    <TableCell>{p.email}</TableCell>
                                    <TableCell className="capitalize">{p.partnership_type}</TableCell>
                                    <TableCell>{format(new Date(p.created_at), "MMM d, yyyy")}</TableCell>
                                    <TableCell>
                                        <Badge variant={p.status === 'approved' ? 'default' : 'secondary'}
                                            className={p.status === 'approved' ? 'bg-green-600' : p.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}>
                                            {p.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button variant="ghost" size="icon" onClick={() => handleView(p)} disabled={isActionLoading}>
                                            <Eye className="w-4 h-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600" onClick={() => handleDelete(p.id)} disabled={isActionLoading}>
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
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
                                    <Label className="text-muted-foreground">Name / Organization</Label>
                                    <p className="font-medium">{selectedPartnership.name}</p>
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-muted-foreground">Type</Label>
                                    <p className="font-medium capitalize">{selectedPartnership.partnership_type}</p>
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
                        <LoadingButton
                            variant="outline"
                            onClick={() => updateStatus("rejected")}
                            isLoading={isActionLoading}
                            loadingText="Rejecting..."
                        >
                            Reject
                        </LoadingButton>
                        <LoadingButton
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => updateStatus("approved")}
                            isLoading={isActionLoading}
                            loadingText="Approving..."
                        >
                            Approve Partnership
                        </LoadingButton>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
