// TypeScript types for Customers table

export interface Customer {
    id: string;
    name: string;
    spouse_name?: string | null;  // Optional: spouse/partner name
    phone: string;
    email?: string | null;  // Optional: email for automated greetings
    birthday?: string | null;  // Optional: ISO date string (YYYY-MM-DD)
    anniversary?: string | null;  // Optional: ISO date string (YYYY-MM-DD)
    location?: string | null;  // Optional: address/location
    city?: string | null;  // Optional: city
    notes?: string | null;  // Optional: brief notes
    created_at: string;
}

export interface CustomerInsert {
    name: string;
    spouse_name?: string | null;
    phone: string;
    email?: string | null;
    birthday?: string | null;
    anniversary?: string | null;
    location?: string | null;
    city?: string | null;
    notes?: string | null;
}

export interface CustomerUpdate {
    name?: string;
    spouse_name?: string | null;
    phone?: string;
    email?: string | null;
    birthday?: string | null;
    anniversary?: string | null;
    location?: string | null;
    city?: string | null;
    notes?: string | null;
}
