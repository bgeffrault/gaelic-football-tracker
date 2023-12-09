export interface MemberType {
    firstName: string;
    lastName: string;
    id: number;
    categoryId: number;
}

export interface Shoot {
    id: number;
    type: string;
    x: number;
    y: number;
    memberId: number;
    teamGameId: number;
    created_at: string;
}

export interface ClubType {
    members: MemberType[];
    teamName: string;
}
