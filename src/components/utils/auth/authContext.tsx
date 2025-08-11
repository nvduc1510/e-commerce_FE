import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { TokenUtils } from "./tokenUtils";
import toast from "react-hot-toast";

// Định nghĩa kiểu thông tin người dùng
interface User {
    id: string;
    userId: string;
    username: string;
    email: string;
    role: string[] | string;
}

// Định nghĩa kiểu dữ liệu của AuthContext
interface AuthContextType {
    isAuthenticated: boolean;
    login: (token: string) => Promise<void>;
    logout: () => void;
    isAdmin: () => boolean;
}

// Tạo context với kiểu null ban đầu
const AuthContext = createContext<AuthContextType | null>(null);

// Props của AuthProvider
interface AuthProviderProps {
    children: ReactNode;  
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
        const token = sessionStorage.getItem("access_token");
        if (token) {
            const payload = TokenUtils.parseJwt(token);
            if (!payload || Date.now() >= payload.exp * 1000) {
            sessionStorage.removeItem("access_token");
            setIsAuthenticated(false);
            setUser(null);
            navigate("/login");
            } else {
            setIsAuthenticated(true);
            setUser({
                id: payload.sub,
                userId: payload?.user?.userId,
                username: payload?.user?.username,
                email: payload.email,
                role: payload.roles,
            });
            }
        } else {
            setIsAuthenticated(false);
            setUser(null);
        }
        };
        checkAuth();
    }, [navigate]);

    const login = async (token: string): Promise<void> => {
        sessionStorage.setItem("access_token", token);
        const payload = TokenUtils.parseJwt(token);
        if (payload) {
        setUser({
            id: payload.sub,
            userId: payload?.user?.userId,
            username: payload?.user?.username,
            email: payload.email,
            role: payload.roles,
        });
        toast.success("Login success!");
        setIsAuthenticated(true);
        setTimeout(() => {
            navigate("/");
        }, 1000);
        } else {
        toast.error("Login failed");
        }
    };

    const logout = () => {
        sessionStorage.clear();
        setUser(null);
        setIsAuthenticated(false);
        toast.success("Logout success!");
        setTimeout(() => {
        navigate("/login");
        }, 1000);
    };

    const isAdmin = (): boolean => {
        const roles = user?.role;
        if (!roles) return false;
        return Array.isArray(roles)
        ? roles.includes("ROLE_ADMIN")
        : roles === "ROLE_ADMIN";
    };

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider
        value={{ isAuthenticated, login, logout, isAdmin }}
        >
        {children}
        </AuthContext.Provider>
    );
};

// Hook để sử dụng AuthContext
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
