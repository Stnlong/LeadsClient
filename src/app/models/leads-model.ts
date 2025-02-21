export interface Leads {
    id: number;
    name: string;
    phone: string;
    zip: string;
    canContact: boolean;
    email?: string;
    details?: string;
}