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
      _MemberToTeam: {
        Row: {
          A: number;
          B: number;
        };
        Insert: {
          A: number;
          B: number;
        };
        Update: {
          A?: number;
          B?: number;
        };
        Relationships: [
          {
            foreignKeyName: "_MemberToTeam_A_fkey";
            columns: ["A"];
            referencedRelation: "Member";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "_MemberToTeam_B_fkey";
            columns: ["B"];
            referencedRelation: "Team";
            referencedColumns: ["id"];
          }
        ];
      };
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
      GameScore: {
        Row: {
          created_at: string;
          gameId: number;
          id: number;
          scoreId: number;
          teamId: number;
        };
        Insert: {
          created_at?: string;
          gameId: number;
          id?: number;
          scoreId: number;
          teamId: number;
        };
        Update: {
          created_at?: string;
          gameId?: number;
          id?: number;
          scoreId?: number;
          teamId?: number;
        };
        Relationships: [
          {
            foreignKeyName: "GameScore_gameId_fkey";
            columns: ["gameId"];
            referencedRelation: "Game";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "GameScore_scoreId_fkey";
            columns: ["scoreId"];
            referencedRelation: "Score";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "GameScore_teamId_fkey";
            columns: ["teamId"];
            referencedRelation: "Team";
            referencedColumns: ["id"];
          }
        ];
      };
      Member: {
        Row: {
          categoryId: number;
          clubId: number;
          created_at: string;
          firstName: string;
          id: number;
          lastName: string;
          pseudo: string | null;
        };
        Insert: {
          categoryId: number;
          clubId: number;
          created_at?: string;
          firstName: string;
          id?: number;
          lastName: string;
          pseudo?: string | null;
        };
        Update: {
          categoryId?: number;
          clubId?: number;
          created_at?: string;
          firstName?: string;
          id?: number;
          lastName?: string;
          pseudo?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "Member_categoryId_fkey";
            columns: ["categoryId"];
            referencedRelation: "Category";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Member_clubId_fkey";
            columns: ["clubId"];
            referencedRelation: "Club";
            referencedColumns: ["id"];
          }
        ];
      };
      Score: {
        Row: {
          accuracy: number | null;
          created_at: string;
          id: number;
        };
        Insert: {
          accuracy?: number | null;
          created_at?: string;
          id?: number;
        };
        Update: {
          accuracy?: number | null;
          created_at?: string;
          id?: number;
        };
        Relationships: [];
      };
      Shoot: {
        Row: {
          created_at: string;
          id: number;
          memberId: number;
          scoreId: number | null;
          type: string;
          x: number;
          y: number;
        };
        Insert: {
          created_at?: string;
          id?: number;
          memberId: number;
          scoreId?: number | null;
          type: string;
          x: number;
          y: number;
        };
        Update: {
          created_at?: string;
          id?: number;
          memberId?: number;
          scoreId?: number | null;
          type?: string;
          x?: number;
          y?: number;
        };
        Relationships: [
          {
            foreignKeyName: "Shoot_memberId_fkey";
            columns: ["memberId"];
            referencedRelation: "Member";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Shoot_scoreId_fkey";
            columns: ["scoreId"];
            referencedRelation: "Score";
            referencedColumns: ["id"];
          }
        ];
      };
      Team: {
        Row: {
          clubId: number;
          created_at: string;
          id: number;
          teamName: string;
        };
        Insert: {
          clubId: number;
          created_at?: string;
          id?: number;
          teamName: string;
        };
        Update: {
          clubId?: number;
          created_at?: string;
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
