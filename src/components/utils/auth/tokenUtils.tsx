export interface JwtUserPayload {
    userId: string;
    username: string;
}

export interface JwtPayload {
    sub: string;
    email: string;
    exp: number;
    roles: string | string[];
    user: JwtUserPayload;
}

export class TokenUtils {
    static parseJwt(token: string): JwtPayload | null {
        try {
        if (!token) return null;

        const base64Url = token.split('.')[1];
        if (!base64Url) return null;

        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );

        return JSON.parse(jsonPayload) as JwtPayload;
        } catch (error) {
        console.error("Invalid token format", error);
        return null;
        }
    }
}

// export const getUserIdFromToken = (): string | null => {
//     const token = sessionStorage.getItem("access_token");
//     if (!token) return null;
//     const decoded = TokenUtils.parseJwt(token);
//     return decoded?.user?.userId || null;
// };

export const getUserIdFromToken = (): number | null => {
    const token = sessionStorage.getItem("access_token");
    if (!token) return null;
    const decoded = TokenUtils.parseJwt(token);
    return Number(decoded?.user?.userId) || null;
};


export const getUserNameFromToken = (): string | null => {
    const token = sessionStorage.getItem("access_token");
    if (!token) return null;
    const decoded = TokenUtils.parseJwt(token);
    return decoded?.user?.username || null;
};
