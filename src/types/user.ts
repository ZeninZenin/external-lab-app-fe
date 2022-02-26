export type UserRole = 'admin' | 'trainer' | 'student' | 'guest';

export interface User {
  _id: string;
  login: string;
  githubName: string;
  firstName?: string;
  lastName?: string;
  roles: UserRole[];
}
