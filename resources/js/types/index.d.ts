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
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export type UserRole = "admin" | "cliente";

export interface User {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

// Tipo para las 
export interface Category {
    id: number
    name: string
    created_at: string
    updated_at: string
}

export interface Service {
    id: number
    name: string
    description: string
    price: string
    discount: string
    duration: number
    image: string
    category_id: number
    created_at: string
    updated_at: string
    category: Category
}

export type ServiceList = Service[];

export interface Promotions {
    id: number
    name: string
    description: string
    image: string
    type: string
    start_date: string
    end_date: string
    is_active: boolean
    subtotal: number
    total: number
    created_at: string
    updated_at: string
    services: Service[]
}

export type PromotionList = Promotion[];

export interface PromotionService {
    id: number
    promotion_id: number
    service_id: number
    individual_price: number
    individual_discount: number
    is_bogo: boolean
    created_at: string
    updated_at: string
}

export interface Packages {
    id: number
    name: string
    description: string
    image: string
    discount: number
    subtotal: number
    total: number
    is_active: boolean
    created_at: string
    updated_at: string
    services: Service[]
}

export type PackagesList = Packages[];

export interface Staff {
    id: number
    name: string
    email: string
    phone: string
    position: string
    available: boolean
}

export interface Appointments {
    id: number
    user_id: number
    staff_id: number
    appointment_date: string
    status: boolean
    total_price: number
    secure_token: string
    notes: string
}

export interface AppointmentService {
    id: number
    services: { service_id: number }[]
    promotions: { promotion_id: number }[]
    packages: { package_id: number }[]
    price: number
    discount_applied: number
}

export interface CartItem {
    type: "service" | "promotion" | "package"
    id: number
    name: string
    price: number
    discount: number
    duration: number
    image?: string
    services?: Service[]
}

export interface TimeSlot {
    time: string
    available: boolean
}

export interface Company {
    id: number;
    name: string;
    email: string;
    phone: string;
    about: string;
    address: string;
    lat: number;
    long: number;
    work_days: {
        [day: string]: {
            start: string; // formato "HH:mm"
            end: string;
        };
    };
    social_links: {
        facebook?: string;
        instagram?: string;
        tiktok?: string;
        [key: string]: string | undefined;
    } | null;
    policies: string | null;
    created_at: string;
    updated_at: string;
}

export type AppointmentsList = Appointment[];

export interface Notification {
    id: number
    user_id: number
    title: string
    message: string
    type: string
    read: boolean
    scheduled_at: string | Date
    sent_at: string | Date
    created_at: string | Date
}

export interface PaginatedAppointments {
  current_page: number;
  data: Appointment[];
  from: number;
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
  per_page: number;
  to: number;
  total: number;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
}

export interface PaginatedNotifications {
  current_page: number;
  data: Notification[];
  from: number;
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
  per_page: number;
  to: number;
  total: number;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
}

type DashboardPageProps = {
    new_clients_this_month: string;
    total_appointments: string;
    monthly_revenue: string;
    status_percentaje: {
        cancelled: number;
        completed: number;
        pending: number;
        sum: number;
    };
    monthly_earnings: {
        earnings: string;
        month: number;
        year: number;
    }[];
    pending_appointments?: Appointment[]; // Puedes tipar mejor si sabes la estructura
}

export interface Appointment {
    id: number
    user_id: number
    staff_id: number | null
    appointment_date: string
    appointment_time: string
    status: string
    total_price: string
    secure_token: string
    notes: string | null
    created_at: string
    updated_at: string
    services: Service[]
    promotions: Promotions[] // o define el tipo específico
    packages: Packages[]   // idem
    user: {
        name: string
    }
    staff: Staff
   
}
