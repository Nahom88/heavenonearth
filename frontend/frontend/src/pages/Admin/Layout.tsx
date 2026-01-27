import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import {
    LayoutDashboard,
    Church,
    Calendar,
    Image as ImageIcon,
    MessageSquare,
    Handshake,
    LogOut,
    Menu,
    X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAuthToken, removeAuthToken } from "@/services/api";
import { cn } from "@/lib/utils";

const SidebarItem = ({ icon: Icon, label, path, active }: { icon: any, label: string, path: string, active: boolean }) => (
    <Link
        to={path}
        className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
            active
                ? "bg-gold text-navy font-medium shadow-md"
                : "text-gray-400 hover:bg-navy-light hover:text-white"
        )}
    >
        <Icon className={cn("w-5 h-5", active ? "text-navy" : "text-gray-400 group-hover:text-white")} />
        <span>{label}</span>
    </Link>
);

export default function AdminLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const token = getAuthToken();
        if (!token) {
            navigate("/admin/login");
        }

        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setIsMobile(true);
                setIsSidebarOpen(false);
            } else {
                setIsMobile(false);
                setIsSidebarOpen(true);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [navigate]);

    const handleLogout = () => {
        removeAuthToken();
        navigate("/admin/login");
    };

    const navItems = [
        { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
        { icon: Church, label: "Ministries", path: "/admin/ministries" },
        { icon: Calendar, label: "Events", path: "/admin/events" },
        { icon: ImageIcon, label: "Gallery", path: "/admin/gallery" },
        { icon: MessageSquare, label: "Testimonials", path: "/admin/testimonials" },
        { icon: Handshake, label: "Partnerships", path: "/admin/partnerships" },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-64 bg-navy text-white transform transition-transform duration-300 ease-in-out shadow-xl",
                    !isSidebarOpen && "-translate-x-full"
                )}
            >
                <div className="h-full flex flex-col">
                    <div className="p-6 border-b border-navy-light flex items-center justify-between">
                        <h1 className="text-xl font-heading font-bold text-gold">Heaven CMS</h1>
                        {isMobile && (
                            <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)} className="text-white hover:bg-navy-light">
                                <X className="w-5 h-5" />
                            </Button>
                        )}
                    </div>

                    <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                        {navItems.map((item) => (
                            <SidebarItem
                                key={item.path}
                                {...item}
                                active={location.pathname === item.path}
                            />
                        ))}
                    </nav>

                    <div className="p-4 border-t border-navy-light">
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-gray-400 hover:text-red-400 hover:bg-navy-light"
                            onClick={handleLogout}
                        >
                            <LogOut className="w-5 h-5 mr-3" />
                            Sign Out
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className={cn(
                "flex-1 flex flex-col min-h-screen transition-all duration-300",
                isSidebarOpen && !isMobile ? "ml-64" : "ml-0"
            )}>
                <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6 sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="text-navy hover:bg-gray-100"
                        >
                            <Menu className="w-6 h-6" />
                        </Button>
                        <h2 className="text-lg font-semibold text-navy">
                            {navItems.find(i => i.path === location.pathname)?.label || "Dashboard"}
                        </h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold-dark font-bold">
                            A
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-6 overflow-x-hidden">
                    <Outlet />
                </main>
            </div>

            {/* Overlay for mobile */}
            {isMobile && isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );
}
