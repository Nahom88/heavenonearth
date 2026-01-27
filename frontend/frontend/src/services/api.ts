import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

export const getAuthToken = () => localStorage.getItem("admin_token");
export const setAuthToken = (token: string) => localStorage.setItem("admin_token", token);
export const removeAuthToken = () => localStorage.removeItem("admin_token");

interface FetchOptions extends RequestInit {
    headers?: Record<string, string>;
}

export const apiRequest = async <T>(endpoint: string, options: FetchOptions = {}): Promise<T> => {
    const token = getAuthToken();

    const headers = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (response.status === 401) {
        removeAuthToken();
        window.location.href = "/admin/login";
        throw new Error("Unauthorized");
    }

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.detail || "An error occurred";
        toast.error(errorMessage);
        throw new Error(errorMessage);
    }

    return response.json();
};

export const validateToken = async (): Promise<boolean> => {
    try {
        await apiRequest("/admins/me");
        return true;
    } catch (error) {
        return false;
    }
};
