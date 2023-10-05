export interface MemberType {
    firstName: string;
    lastName: string;
    id: number;
    categoryId: number;
}

export interface ClubType {
    members: MemberType[];
    teamName: string;
}
