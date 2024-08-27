export interface ProfileModel {
    bio?: string;
    image?: File;
}
export interface UserModel
{
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    email?: string;
    password: string;
    profile?: ProfileModel;
}
