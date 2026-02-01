import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
    console.error("VITE_API_URL is not defined in environment variables");
}

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
        // This path is correct because API_URL is /api/v1 and the router is /admins/me
        await apiRequest("/admins/me");
        return true;
    } catch (error) {
        return false;
    }
};

interface GetItemsFilters {
    page?: number;
    page_size?: number;
    is_featured?: boolean;
    search?: string;
}

const buildQueryString = (filters: GetItemsFilters) => {
    const params = new URLSearchParams();
    if (filters.page) params.append("page", filters.page.toString());
    if (filters.page_size) params.append("page_size", filters.page_size.toString());
    if (filters.is_featured !== undefined) params.append("is_featured", String(filters.is_featured));
    if (filters.search) params.append("search", filters.search);
    const queryString = params.toString();
    return queryString ? `?${queryString}` : "";
};

export const getMinistries = async (filters: GetItemsFilters = {}): Promise<Ministry[]> => {
    const queryString = buildQueryString(filters);
    const response = await apiRequest<{ items: Ministry[] }>(`/ministries${queryString}`);
    return response.items;
};

export const getEvents = async (filters: GetItemsFilters = {}): Promise<Event[]> => {
    const queryString = buildQueryString(filters);
    const response = await apiRequest<{ items: Event[] }>(`/events${queryString}`);
    return response.items;
};

export const getGallery = async (filters: GetItemsFilters = {}): Promise<Gallery[]> => {
    const queryString = buildQueryString(filters);
    const response = await apiRequest<{ items: Gallery[] }>(`/gallery${queryString}`);
    return response.items;
};

export const getTestimonials = async (filters: GetItemsFilters = {}): Promise<Testimonial[]> => {
    const queryString = buildQueryString(filters);
    const response = await apiRequest<{ items: Testimonial[] }>(`/testimonials${queryString}`);
    return response.items;
};

export const getPrayerRequests = async (filters: GetItemsFilters = {}): Promise<PrayerRequest[]> => {
    const queryString = buildQueryString(filters);
    const response = await apiRequest<{ items: PrayerRequest[] }>(`/prayer-requests${queryString}`);
    return response.items;
};

export const getPartnerships = async (filters: GetItemsFilters = {}): Promise<Partnership[]> => {
    const queryString = buildQueryString(filters);
    const response = await apiRequest<{ items: Partnership[] }>(`/partnerships${queryString}`);
    return response.items;
};


export const createMinistry = async (ministry: Partial<Ministry>): Promise<Ministry> => {
    return apiRequest("/ministries", {
        method: "POST",
        body: JSON.stringify(ministry),
    });
};

export const updateMinistry = async (id: string, ministry: Partial<Ministry>): Promise<Ministry> => {
    return apiRequest(`/ministries/${id}`, {
        method: "PUT",
        body: JSON.stringify(ministry),
    });
};

export const deleteMinistry = async (id: string): Promise<void> => {
    await apiRequest(`/ministries/${id}`, {
        method: "DELETE",
    });
};

// ... (similar updates for other create/update functions if needed)

export interface Ministry {
    id: string;
    title: string;
    title_am?: string;
    description: string;
    description_am?: string;
    icon_name: string;
    ministry_key: string;
    leader_name?: string;
    leader_email?: string;
    leader_phone?: string;
    image_url?: string;
    activities?: any;
    schedule?: any;
    is_active: boolean;
    is_featured: boolean;
    display_order: number;
    created_at: string;
    updated_at: string;
}

export interface Event {
    id: string;
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    location: string;
    is_featured: boolean;
    created_at: string;
    updated_at: string;
}

export interface Gallery {
    id: string;
    title: string;
    description: string;
    image_url: string;
    created_at: string;
    updated_at: string;
}

export interface Testimonial {
    id: string;
    name: string;
    message: string;
    is_approved: boolean;
    created_at: string;
    updated_at: string;
}

export interface PrayerRequest {
    id: string;
    name: string;
    message: string;
    is_public: boolean;
    created_at: string;
    updated_at: string;
}

export interface Partnership {
    id: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    created_at: string;
    updated_at: string;
}

export const uploadFile = async (file: File): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
        headers: {
            Authorization: `Bearer ${getAuthToken()}`,
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.detail || "File upload failed";
        toast.error(errorMessage);
        throw new Error(errorMessage);
    }

    return response.json();
};

