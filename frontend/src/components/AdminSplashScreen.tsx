import { Loader2 } from "lucide-react";

export function AdminSplashScreen() {
    return (
        <div className="fixed inset-0 z-[9999] flex bg-gray-50 overflow-hidden">
            {/* Sidebar Skeleton */}
            <aside className="w-64 bg-navy flex flex-col animate-pulse">
                <div className="p-6 border-b border-navy-light">
                    <div className="h-8 w-32 bg-white/10 rounded" />
                </div>
                <div className="flex-1 p-4 space-y-4">
                    {Array(7).fill(0).map((_, i) => (
                        <div key={i} className="h-10 w-full bg-white/5 rounded-lg" />
                    ))}
                </div>
                <div className="p-4 border-t border-navy-light">
                    <div className="h-10 w-full bg-white/5 rounded-lg" />
                </div>
            </aside>

            {/* Main Content Skeleton */}
            <div className="flex-1 flex flex-col">
                {/* Header Skeleton */}
                <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6">
                    <div className="h-8 w-8 bg-gray-100 rounded" />
                    <div className="h-8 w-8 bg-gray-100 rounded-full" />
                </header>

                {/* Content Area Skeleton */}
                <main className="flex-1 p-6 space-y-8 relative">
                    {/* Centered Loading Overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                        <div className="relative flex flex-col items-center">
                            {/* Logo/Icon */}
                            <div className="w-20 h-20 mb-6 relative">
                                <div className="absolute inset-0 bg-gold rounded-2xl rotate-45 animate-pulse opacity-20" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-3xl font-heading font-bold text-gold">H</span>
                                </div>
                            </div>

                            {/* Text */}
                            <h1 className="text-xl font-heading font-bold text-navy mb-1 tracking-wider">
                                HEAVEN ON EARTH
                            </h1>
                            <p className="text-gold-dark/60 text-[10px] font-medium tracking-[0.2em] uppercase mb-6">
                                Initializing Dashboard
                            </p>

                            {/* Loading Indicator */}
                            <div className="flex flex-col items-center gap-3">
                                <Loader2 className="w-6 h-6 text-gold animate-spin" />
                                <div className="h-1 w-32 bg-gray-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-gold animate-progress-indeterminate" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Page Content Skeleton */}
                    <div className="space-y-6 opacity-50">
                        <div className="space-y-2">
                            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
                            <div className="h-4 w-64 bg-gray-100 rounded animate-pulse" />
                        </div>

                        <div className="grid grid-cols-4 gap-4">
                            {Array(4).fill(0).map((_, i) => (
                                <div key={i} className="h-32 bg-white rounded-xl border border-gray-100 animate-pulse" />
                            ))}
                        </div>

                        <div className="h-64 bg-white rounded-xl border border-gray-100 animate-pulse" />
                    </div>
                </main>
            </div>
        </div>
    );
}
