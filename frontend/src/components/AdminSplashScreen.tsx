import { Loader2 } from "lucide-react";

export function AdminSplashScreen() {
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-navy overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('/patterns/hero-pattern.svg')] opacity-10 pointer-events-none" />

            {/* Animated Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[120px] animate-pulse" />

            <div className="relative flex flex-col items-center">
                {/* Logo/Icon */}
                <div className="w-24 h-24 mb-8 relative">
                    <div className="absolute inset-0 bg-gold rounded-2xl rotate-45 animate-pulse opacity-20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl font-heading font-bold text-gold">H</span>
                    </div>
                </div>

                {/* Text */}
                <h1 className="text-2xl font-heading font-bold text-white mb-2 tracking-wider">
                    HEAVEN ON EARTH
                </h1>
                <p className="text-gold/60 text-sm font-medium tracking-[0.2em] uppercase mb-8">
                    Content Management System
                </p>

                {/* Loading Indicator */}
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-8 h-8 text-gold animate-spin" />
                    <div className="h-1 w-48 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gold animate-progress-indeterminate" />
                    </div>
                </div>
            </div>

            {/* Footer Text */}
            <div className="absolute bottom-10 text-white/20 text-xs font-medium tracking-widest uppercase">
                Initializing Secure Environment
            </div>
        </div>
    );
}
