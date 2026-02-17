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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { apiRequest } from "@/services/api";
import { toast } from "sonner";
import { Check, X, Star, Eye } from "lucide-react";
import { format } from "date-fns";
import { TestimonialTableSkeleton } from "./TableSkeleton";

interface Testimonial {
    id: string;
    name: string;
    content: string;
    category: string;
    status: "pending" | "approved" | "rejected" | "published";
    is_featured: boolean;
    created_at: string;
}

export default function AdminTestimonials() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
    const [isReviewOpen, setIsReviewOpen] = useState(false);
    const [reviewNotes, setReviewNotes] = useState("");
    const [isFeatured, setIsFeatured] = useState(false);

    const fetchTestimonials = async () => {
        setIsLoading(true);
        try {
            const data = await apiRequest<{ items: Testimonial[] }>("/testimonials?page_size=100");
            setTestimonials(data.items);
        } catch (error) {
            console.error("Failed to fetch testimonials", error);
            toast.error("Failed to fetch testimonials");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const handleReview = (testimonial: Testimonial) => {
        setSelectedTestimonial(testimonial);
        setReviewNotes("");
        setIsFeatured(testimonial.is_featured);
        setIsReviewOpen(true);
    };

    const submitReview = async (status: "approved" | "rejected") => {
        if (!selectedTestimonial) return;

        try {
            await apiRequest(`/testimonials/${selectedTestimonial.id}/review`, {
                method: "POST",
                body: JSON.stringify({
                    status,
                    review_notes: reviewNotes,
                    is_featured: isFeatured,
                }),
            });

            toast.success(`Testimonial ${status} successfully`);
            setIsReviewOpen(false);
            fetchTestimonials(); // Refetch data after review
        } catch (error) {
            toast.error("Failed to submit review");
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "approved":
            case "published":
                return "bg-green-100 text-green-800";
            case "rejected":
                return "bg-red-100 text-red-800";
            default:
                return "bg-yellow-100 text-yellow-800";
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-heading font-bold text-navy">Testimonials</h2>
                    <p className="text-muted-foreground">Manage and approve member testimonies</p>
                </div>
            </div>

            {isLoading ? (
                <TestimonialTableSkeleton />
            ) : (
                <div className="bg-white rounded-lg shadow-sm border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Featured</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {testimonials.length > 0 ? (
                                testimonials.map((t) => (
                                    <TableRow key={t.id}>
                                        <TableCell className="font-medium">{t.name}</TableCell>
                                        <TableCell>{t.category}</TableCell>
                                        <TableCell>{t.created_at ? format(new Date(t.created_at), "MMM d, yyyy") : "N/A"}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={getStatusColor(t.status)}>
                                                {t.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="flex justify-center">
                                            {t.is_featured && <Star className="w-4 h-4 text-gold fill-gold" />}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="sm" onClick={() => handleReview(t)}>
                                                <Eye className="w-4 h-4 mr-2" />
                                                Review
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center h-24">
                                        No testimonials found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            )}

            <Dialog open={isReviewOpen} onOpenChange={setIsReviewOpen}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Review Testimonial</DialogTitle>
                    </DialogHeader>

                    {selectedTestimonial && (
                        <div className="space-y-6 py-4">
                            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                                <div className="flex justify-between text-sm text-muted-foreground">
                                    <span>{selectedTestimonial.name}</span>
                                    <span>{selectedTestimonial.category}</span>
                                </div>
                                <p className="text-gray-800 italic">"{selectedTestimonial.content}"</p>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="featured"
                                    checked={isFeatured}
                                    onCheckedChange={setIsFeatured}
                                />
                                <Label htmlFor="featured" className="flex items-center gap-2">
                                    <Star className="w-4 h-4 text-gold" />
                                    Feature on Main Page
                                </Label>
                            </div>

                            <div className="space-y-2">
                                <Label>Review Notes (Internal)</Label>
                                <Textarea
                                    value={reviewNotes}
                                    onChange={(e) => setReviewNotes(e.target.value)}
                                    placeholder="Add notes about this review..."
                                />
                            </div>
                        </div>
                    )}

                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button variant="destructive" onClick={() => submitReview("rejected")}>
                            <X className="w-4 h-4 mr-2" />
                            Reject
                        </Button>
                        <Button className="bg-green-600 hover:bg-green-700" onClick={() => submitReview("approved")}>
                            <Check className="w-4 h-4 mr-2" />
                            Approve & Publish
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
