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
      Category: {
        Row: {
          created_at: string;
          id: number;
          name: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      Club: {
        Row: {
          created_at: string;
          id: number;
          name: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name?: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      Game: {
        Row: {
          created_at: string;
          date: string;
          duration: number;
          gameEnded: boolean;
          id: number;
          name: string;
        };
        Insert: {
          created_at?: string;
          date?: string;
          duration: number;
          gameEnded?: boolean;
          id?: number;
          name: string;
        };
        Update: {
          created_at?: string;
          date?: string;
          duration?: number;
          gameEnded?: boolean;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      Members: {
        Row: {
          categoryId: number | null;
          clubId: number | null;
          created_at: string;
          firstName: string;
          id: number;
          lastName: string;
          pseudo: string | null;
        };
        Insert: {
          categoryId?: number | null;
          clubId?: number | null;
          created_at?: string;
          firstName: string;
          id?: number;
          lastName: string;
          pseudo?: string | null;
        };
        Update: {
          categoryId?: number | null;
          clubId?: number | null;
          created_at?: string;
          firstName?: string;
          id?: number;
          lastName?: string;
          pseudo?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "Members_categoryId_fkey";
            columns: ["categoryId"];
            referencedRelation: "Category";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Members_clubId_fkey";
            columns: ["clubId"];
            referencedRelation: "Club";
            referencedColumns: ["id"];
          }
        ];
      };
      Shoots: {
        Row: {
          Members: {
            categoryId: number | null;
            clubId: number | null;
            created_at: string;
            firstName: string;
            id: number;
            lastName: string;
            pseudo: string | null;
          };
          created_at: string;
          id: number;
          memberId: number | null;
          teamGameId: number;
          type: string;
          x: number;
          y: number;
        };
        Insert: {
          created_at?: string;
          id?: number;
          memberId?: number | null;
          teamGameId: number;
          type: string;
          x: number;
          y: number;
        };
        Update: {
          created_at?: string;
          id?: number;
          memberId?: number | null;
          teamGameId?: number;
          type?: string;
          x?: number;
          y?: number;
        };
        Relationships: [
          {
            foreignKeyName: "Shoots_memberId_fkey";
            columns: ["memberId"];
            referencedRelation: "Members";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Shoots_teamGameId_fkey";
            columns: ["teamGameId"];
            referencedRelation: "TeamGame";
            referencedColumns: ["id"];
          }
        ];
      };
      Team: {
        Row: {
          clubId: number | null;
          created_at: string;
          external: boolean;
          id: number;
          teamName: string;
        };
        Insert: {
          clubId?: number | null;
          created_at?: string;
          external?: boolean;
          id?: number;
          teamName: string;
        };
        Update: {
          clubId?: number | null;
          created_at?: string;
          external?: boolean;
          id?: number;
          teamName?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Team_clubId_fkey";
            columns: ["clubId"];
            referencedRelation: "Club";
            referencedColumns: ["id"];
          }
        ];
      };
      TeamGame: {
        Row: {
          created_at: string;
          gameId: number;
          id: number;
          teamId: number;
        };
        Insert: {
          created_at?: string;
          gameId: number;
          id?: number;
          teamId: number;
        };
        Update: {
          created_at?: string;
          gameId?: number;
          id?: number;
          teamId?: number;
        };
        Relationships: [
          {
            foreignKeyName: "TeamGame_gameId_fkey";
            columns: ["gameId"];
            referencedRelation: "Game";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "TeamGame_teamId_fkey";
            columns: ["teamId"];
            referencedRelation: "Team";
            referencedColumns: ["id"];
          }
        ];
      };
      TeamMembers: {
        Row: {
          created_at: string;
          id: number;
          memberId: number;
          teamGameId: number;
        };
        Insert: {
          created_at?: string;
          id?: number;
          memberId: number;
          teamGameId: number;
        };
        Update: {
          created_at?: string;
          id?: number;
          memberId?: number;
          teamGameId?: number;
        };
        Relationships: [
          {
            foreignKeyName: "TeamMembers_memberId_fkey";
            columns: ["memberId"];
            referencedRelation: "Members";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "TeamMembers_teamGameId_fkey";
            columns: ["teamGameId"];
            referencedRelation: "TeamGame";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
