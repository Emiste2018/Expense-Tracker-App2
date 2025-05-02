export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      expenses: {
        Row: {
          id: string;
          amount: number;
          date: string;
          category: string;
          description: string;
          user_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          amount: number;
          date: string;
          category: string;
          description?: string;
          user_id?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          amount?: number;
          date?: string;
          category?: string;
          description?: string;
          user_id?: string;
          created_at?: string;
        };
      };
      users: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          created_at?: string;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
}
