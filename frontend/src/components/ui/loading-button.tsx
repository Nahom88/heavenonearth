import { Loader2 } from "lucide-react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LoadingButtonProps extends ButtonProps {
    isLoading?: boolean;
    loadingText?: string;
}

export function LoadingButton({
    children,
    isLoading,
    loadingText,
    className,
    disabled,
    ...props
}: LoadingButtonProps) {
    return (
        <Button
            className={cn("relative", className)}
            disabled={isLoading || disabled}
            {...props}
        >
            {isLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {isLoading && loadingText ? loadingText : children}
        </Button>
    );
}
