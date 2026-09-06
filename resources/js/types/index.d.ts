import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    appUrl: string;
    logoAccepted: boolean;
    flash: FlashMessages;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface FlashMessages {
    success?: string;
    error?: string;
    warning?: string;
    info?: string;
}

export interface Category {
    id: number;
    title: string;
    slug: string;
}

export interface Post {
    id: number;
    category_id: number;
    title: string;
    slug: string;
    body: string;
    image: string | null;
    created_at: string;
    updated_at: string;
    category: Category;
}

export interface Event {
    id: number;
    title: string;
    slug: string;
    description: string;
    start_date: string;
    end_date: string | null;
    location: string;
    image: string | null;
    gallery: string[] | null;
    created_at: string;
    updated_at: string;
}

export interface Programme {
    id: number;
    title: string;
    slug: string;
    description: string;
    date_of_event: string;
    image: string | null;
    gallery: string[] | null;
    created_at: string;
    updated_at: string;
}

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PaginatedData<T> {
    data: T[];
    links?: PaginationLink[];
    current_page?: number;
    last_page?: number;
    per_page?: number;
    total?: number;
    from?: number | null;
    to?: number | null;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}
