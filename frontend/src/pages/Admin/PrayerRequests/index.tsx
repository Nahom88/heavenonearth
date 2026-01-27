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
import { Trash2, Eye, MessageCircle, Heart, Loader2 } from "lucide-react";
import { LoadingButton } from "@/components/ui/loading-button";
import { format } from "date-fns";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface PrayerRequest {
    id: string;
    request: string;
    name?: string;
    email?: string;
    phone?: string;
    is_anonymous: boolean;
    is_public: boolean;
    status: string;
    prayer_count: number;
    created_at: string;
    response_message?: string;
}

export default function AdminPrayerRequests() {
    const [requests, setRequests] = useState<PrayerRequest[]>([]);
    const [selectedRequest, setSelectedRequest] = useState<PrayerRequest | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isActionLoading, setIsActionLoading] = useState(false);

    const fetchRequests = async () => {
        setIsLoading(true);
        try {
            const data = await apiRequest<{ items: PrayerRequest[] }>("/prayers?page_size=100");
            setRequests(data.items);
        } catch (error) {
            console.error("Failed to fetch prayer requests", error);
            toast.error("Failed to load prayer requests");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleView = (request: PrayerRequest) => {
        setSelectedRequest(request);
        setResponseMessage(request.response_message || "");
        setIsDetailsOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this prayer request?")) return;
        setIsActionLoading(true);
        try {
            await apiRequest(`/prayers/${id}`, { method: "DELETE" });
            toast.success("Prayer request deleted");
            fetchRequests();
        } catch (error) {
            toast.error("Failed to delete prayer request");
        } finally {
            setIsActionLoading(false);
        }
    };

    const handleUpdateStatus = async (status: string) => {
        if (!selectedRequest) return;
        setIsActionLoading(true);
        try {
            await apiRequest(`/prayers/${selectedRequest.id}`, {
                method: "PUT",
                body: JSON.stringify({ status }),
            });
            toast.success(`Status updated to ${status}`);
            fetchRequests();
            setIsDetailsOpen(false);
        } catch (error) {
            toast.error("Failed to update status");
        } finally {
            setIsActionLoading(false);
        }
    };

    const handleRespond = async () => {
        if (!selectedRequest) return;
        setIsActionLoading(true);
        try {
            await apiRequest(`/prayers/${selectedRequest.id}/respond`, {
                method: "POST",
                body: JSON.stringify({ response_message: responseMessage }),
            });
            toast.success("Response recorded");
            fetchRequests();
            setIsDetailsOpen(false);
        } catch (error) {
            toast.error("Failed to record response");
        } finally {
            setIsActionLoading(false);
        }
    };

    const togglePublic = async (isPublic: boolean) => {
        if (!selectedRequest) return;
        setIsActionLoading(true);
        try {
            await apiRequest(`/prayers/${selectedRequest.id}`, {
                method: "PUT",
                body: JSON.stringify({ is_public: isPublic }),
            });
            setSelectedRequest({ ...selectedRequest, is_public: isPublic });
            toast.success(`Request is now ${isPublic ? 'Public' : 'Private'}`);
            fetchRequests();
        } catch (error) {
            toast.error("Failed to update visibility");
        } finally {
            setIsActionLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-heading font-bold text-navy">Prayer Requests</h2>
                    <p className="text-muted-foreground">Manage and pray for incoming requests</p>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Request</TableHead>
                            <TableHead>Submitted By</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Prayers</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Visibility</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={7} className="h-32 text-center">
                                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-gold" />
                                    <p className="text-sm text-muted-foreground mt-2">Loading prayer requests...</p>
                                </TableCell>
                            </TableRow>
                        ) : requests.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                                    No prayer requests found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            requests.map((r) => (
                                <TableRow key={r.id}>
                                    <TableCell className="font-medium max-w-xs truncate">
                                        {r.request}
                                    </TableCell>
                                    <TableCell>
                                        {r.is_anonymous ? (
                                            <span className="text-muted-foreground italic">Anonymous</span>
                                        ) : (
                                            <span>{r.name}</span>
                                        )}
                                    </TableCell>
                                    <TableCell>{format(new Date(r.created_at), "MMM d, yyyy")}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1">
                                            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
                                            {r.prayer_count}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={r.status === 'answered' ? 'default' : 'secondary'}
                                            className={r.status === 'answered' ? 'bg-green-600' : 'bg-yellow-100 text-yellow-800'}>
                                            {r.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline">
                                            {r.is_public ? "Public" : "Private"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button variant="ghost" size="icon" onClick={() => handleView(r)} disabled={isActionLoading}>
                                            <Eye className="w-4 h-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600" onClick={() => handleDelete(r.id)} disabled={isActionLoading}>
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
                        <DialogTitle>Prayer Request Details</DialogTitle>
                    </DialogHeader>

                    {selectedRequest && (
                        <div className="space-y-6 py-4">
                            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                                    <span>
                                        {selectedRequest.is_anonymous ? "Anonymous" : selectedRequest.name}
                                    </span>
                                    <span>{format(new Date(selectedRequest.created_at), "PPP")}</span>
                                </div>
                                <p className="text-gray-800 text-lg">{selectedRequest.request}</p>

                                {!selectedRequest.is_anonymous && (
                                    <div className="mt-4 pt-4 border-t text-sm space-y-1">
                                        {selectedRequest.email && <p>Email: {selectedRequest.email}</p>}
                                        {selectedRequest.phone && <p>Phone: {selectedRequest.phone}</p>}
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="space-y-0.5">
                                    <Label>Public Visibility</Label>
                                    <p className="text-sm text-muted-foreground">Show this request on the public prayer wall</p>
                                </div>
                                <Switch
                                    checked={selectedRequest.is_public}
                                    onCheckedChange={togglePublic}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Admin Response / Notes</Label>
                                <Textarea
                                    value={responseMessage}
                                    onChange={(e) => setResponseMessage(e.target.value)}
                                    placeholder="Record a response or internal note..."
                                />
                                <LoadingButton
                                    size="sm"
                                    onClick={handleRespond}
                                    className="w-full mt-2"
                                    isLoading={isActionLoading}
                                    loadingText="Saving Response..."
                                >
                                    <MessageCircle className="w-4 h-4 mr-2" />
                                    Save Response
                                </LoadingButton>
                            </div>
                        </div>
                    )}

                    <DialogFooter className="gap-2 sm:gap-0">
                        <LoadingButton
                            variant="outline"
                            onClick={() => handleUpdateStatus("pending")}
                            isLoading={isActionLoading}
                            loadingText="Updating..."
                        >
                            Mark Pending
                        </LoadingButton>
                        <LoadingButton
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleUpdateStatus("answered")}
                            isLoading={isActionLoading}
                            loadingText="Updating..."
                        >
                            Mark Answered
                        </LoadingButton>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
