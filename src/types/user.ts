export interface User {
    id: number;
    login: string;
    avatar?: string;
}

export interface AvatarData {
    avatar: FileList;
}
