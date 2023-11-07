export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Category: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      Club: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      Game: {
        Row: {
          categoryId: number
          clubId: number
          created_at: string
          date: string
          duration: number
          gameEnded: boolean
          id: number
          name: string
        }
        Insert: {
          categoryId?: number
          clubId: number
          created_at?: string
          date?: string
          duration: number
          gameEnded?: boolean
          id?: number
          name: string
        }
        Update: {
          categoryId?: number
          clubId?: number
          created_at?: string
          date?: string
          duration?: number
          gameEnded?: boolean
          id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: 'Game_categoryId_fkey'
            columns: ['categoryId']
            referencedRelation: 'Category'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'Game_clubId_fkey'
            columns: ['clubId']
            referencedRelation: 'Club'
            referencedColumns: ['id']
          },
        ]
      }
      Members: {
        Row: {
          categoryId: number | null
          clubId: number | null
          created_at: string
          firstName: string
          id: number
          lastName: string
          license: string | null
          pseudo: string | null
        }
        Insert: {
          categoryId?: number | null
          clubId?: number | null
          created_at?: string
          firstName?: string
          id?: number
          lastName?: string
          license?: string | null
          pseudo?: string | null
        }
        Update: {
          categoryId?: number | null
          clubId?: number | null
          created_at?: string
          firstName?: string
          id?: number
          lastName?: string
          license?: string | null
          pseudo?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'Members_categoryId_fkey'
            columns: ['categoryId']
            referencedRelation: 'Category'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'Members_clubId_fkey'
            columns: ['clubId']
            referencedRelation: 'Club'
            referencedColumns: ['id']
          },
        ]
      }
      Shoots: {
        Row: {
          created_at: string
          id: number
          memberId: number | null
          teamGameId: number
          type: string
          x: number
          y: number
        }
        Insert: {
          created_at?: string
          id?: number
          memberId?: number | null
          teamGameId: number
          type: string
          x: number
          y: number
        }
        Update: {
          created_at?: string
          id?: number
          memberId?: number | null
          teamGameId?: number
          type?: string
          x?: number
          y?: number
        }
        Relationships: [
          {
            foreignKeyName: 'Shoots_memberId_fkey'
            columns: ['memberId']
            referencedRelation: 'Members'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'Shoots_memberId_fkey'
            columns: ['memberId']
            referencedRelation: 'PlayerScore'
            referencedColumns: ['memberId']
          },
          {
            foreignKeyName: 'Shoots_teamGameId_fkey'
            columns: ['teamGameId']
            referencedRelation: 'TeamGame'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'Shoots_teamGameId_fkey'
            columns: ['teamGameId']
            referencedRelation: 'GameResult'
            referencedColumns: ['teamGameId']
          },
          {
            foreignKeyName: 'Shoots_teamGameId_fkey'
            columns: ['teamGameId']
            referencedRelation: 'TeamScore'
            referencedColumns: ['teamGameId']
          },
        ]
      }
      Team: {
        Row: {
          categoryId: number | null
          clubId: number | null
          created_at: string
          external: boolean
          id: number
          teamName: string
        }
        Insert: {
          categoryId?: number | null
          clubId?: number | null
          created_at?: string
          external?: boolean
          id?: number
          teamName: string
        }
        Update: {
          categoryId?: number | null
          clubId?: number | null
          created_at?: string
          external?: boolean
          id?: number
          teamName?: string
        }
        Relationships: [
          {
            foreignKeyName: 'Team_categoryId_fkey'
            columns: ['categoryId']
            referencedRelation: 'Category'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'Team_clubId_fkey'
            columns: ['clubId']
            referencedRelation: 'Club'
            referencedColumns: ['id']
          },
        ]
      }
      TeamGame: {
        Row: {
          created_at: string
          gameId: number | null
          id: number
          teamId: number
        }
        Insert: {
          created_at?: string
          gameId?: number | null
          id?: number
          teamId: number
        }
        Update: {
          created_at?: string
          gameId?: number | null
          id?: number
          teamId?: number
        }
        Relationships: [
          {
            foreignKeyName: 'TeamGame_gameId_fkey'
            columns: ['gameId']
            referencedRelation: 'Game'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'TeamGame_gameId_fkey'
            columns: ['gameId']
            referencedRelation: 'GameResult'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'TeamGame_teamId_fkey'
            columns: ['teamId']
            referencedRelation: 'Team'
            referencedColumns: ['id']
          },
        ]
      }
      TeamMembers: {
        Row: {
          created_at: string
          id: number
          memberId: number
          teamGameId: number
        }
        Insert: {
          created_at?: string
          id?: number
          memberId: number
          teamGameId: number
        }
        Update: {
          created_at?: string
          id?: number
          memberId?: number
          teamGameId?: number
        }
        Relationships: [
          {
            foreignKeyName: 'TeamMembers_memberId_fkey'
            columns: ['memberId']
            referencedRelation: 'Members'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'TeamMembers_memberId_fkey'
            columns: ['memberId']
            referencedRelation: 'PlayerScore'
            referencedColumns: ['memberId']
          },
          {
            foreignKeyName: 'TeamMembers_teamGameId_fkey'
            columns: ['teamGameId']
            referencedRelation: 'TeamGame'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'TeamMembers_teamGameId_fkey'
            columns: ['teamGameId']
            referencedRelation: 'GameResult'
            referencedColumns: ['teamGameId']
          },
          {
            foreignKeyName: 'TeamMembers_teamGameId_fkey'
            columns: ['teamGameId']
            referencedRelation: 'TeamScore'
            referencedColumns: ['teamGameId']
          },
        ]
      }
    }
    Views: {
      GameResult: {
        Row: {
          categoryId: number | null
          clubId: number | null
          count: number | null
          date: string | null
          duration: number | null
          external: boolean | null
          gameEnded: boolean | null
          id: number | null
          name: string | null
          teamGameId: number | null
          teamName: string | null
          type: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'Game_categoryId_fkey'
            columns: ['categoryId']
            referencedRelation: 'Category'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'Game_clubId_fkey'
            columns: ['clubId']
            referencedRelation: 'Club'
            referencedColumns: ['id']
          },
        ]
      }
      PlayerScore: {
        Row: {
          count: number | null
          memberId: number | null
          type: string | null
        }
        Relationships: []
      }
      TeamScore: {
        Row: {
          count: number | null
          gameId: number | null
          teamGameId: number | null
          type: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'TeamGame_gameId_fkey'
            columns: ['gameId']
            referencedRelation: 'Game'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'TeamGame_gameId_fkey'
            columns: ['gameId']
            referencedRelation: 'GameResult'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
