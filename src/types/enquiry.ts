// TypeScript types for Supabase database

export interface Enquiry {
    id: string;
    name: string;
    email?: string;  // Optional
    phone: string;   // Mandatory
    message: string;
    status: 'to_be_contacted' | 'resolved' | 'spam';
    created_at: string;
}

export interface EnquiryInsert {
    name: string;
    email?: string;  // Optional
    phone: string;   // Mandatory
    message: string;
}

export interface EnquiryUpdate {
    status?: 'to_be_contacted' | 'resolved' | 'spam';
}
