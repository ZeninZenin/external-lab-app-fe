import { User } from '../types';

interface ReturnType extends User {
  exp: number;
}

export const getJWTPayload = (token: string | null): ReturnType | null => {
  if (!token) {
    return null;
  }

  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(''),
    );

    const parsedPayload = JSON.parse(jsonPayload);
    return { ...JSON.parse(jsonPayload), user: JSON.parse(parsedPayload.user) };
  } catch {
    return null;
  }
};
