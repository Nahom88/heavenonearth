import { useEffect, useState } from "react";
import {
    Church,
    Calendar,
    Image as ImageIcon,
    MessageSquare,
    ArrowUpRight,
    Users
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiRequest } from "@/services/api";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: any;
    trend?: string;
    color: string;
}

const StatCard = ({ title, value, icon: Icon, trend, color }: StatCardProps) => (
    <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4" style={{ borderLeftColor: color }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
                {title}
            </CardTitle>
            <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold text-navy">{value}</div>
            {trend && (
                <p className="text-xs text-muted-foreground mt-1 flex items-center">
                    <ArrowUpRight className="w-3 h-3 text-green-500 mr-1" />
                    {trend}
                </p>
            )}
        </CardContent>
    </Card>
);

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        ministries: 0,
        events: 0,
        gallery: 0,
        testimonials: 0,
        partnerships: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [ministries, events, gallery, testimonials] = await Promise.all([
                    apiRequest<{ total: number }>("/ministries?page_size=1"),
                    apiRequest<{ total: number }>("/events?page_size=1"),
                    apiRequest<{ total: number }>("/gallery?page_size=1"),
                    apiRequest<{ total: number }>("/testimonials?page_size=1"),
                ]);

                setStats({
                    ministries: ministries.total,
                    events: events.total,
                    gallery: gallery.total,
                    testimonials: testimonials.total,
                    partnerships: 0 // Placeholder until endpoint is ready
                });
            } catch (error) {
                console.error("Failed to fetch stats", error);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-heading font-bold text-navy">Dashboard Overview</h2>
                <p className="text-muted-foreground">Welcome back to the Heaven CMS control panel.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Active Ministries"
                    value={stats.ministries}
                    icon={Church}
                    color="hsl(var(--gold))"
                />
                <StatCard
                    title="Upcoming Events"
                    value={stats.events}
                    icon={Calendar}
                    trend="+2 this week"
                    color="hsl(var(--navy))"
                />
                <StatCard
                    title="Gallery Items"
                    value={stats.gallery}
                    icon={ImageIcon}
                    color="#10b981"
                />
                <StatCard
                    title="Testimonials"
                    value={stats.testimonials}
                    icon={MessageSquare}
                    trend="Pending review"
                    color="#f59e0b"
                />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">Activity log coming soon...</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">Quick actions coming soon...</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
