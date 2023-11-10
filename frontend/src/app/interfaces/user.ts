export interface User {
  name: string | null;
  email: string;
  password: string;
  aboutMe?: string;
  profile_picture?: string;
  access_token?: string;
}
