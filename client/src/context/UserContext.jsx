import {
    createContext,
    useState,
    useMemo,
    useCallback,
    useEffect
} from 'react';
import { userService } from '../services';
import { registerSchema } from '../schemas/user.schema';
import * as z from 'zod';


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [userLoading, setUserLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUser = useCallback(async () => {
        try {
            const data = await userService.getUser();
            setUser(data);
        } catch (err) {
            console.error(err);
        } finally {
            setUserLoading(false);
        }
    }, []);

    const register = useCallback(async (userData) => {
        try {
            setLoading(true);
            const data = await userService.register(userData);
            setUser(data);
            return data
        } catch (err) {
            setError(err.errors || { general: err.message });
        } finally {
            setLoading(false);
        }
    }, []);

    const login = useCallback(async (userData) => {
        setLoading(true);
        try {
            const data = await userService.login(userData);
            setUser(data);
            return data;
        } catch (err) {
            setError(err.errors || { general: err.message });
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(async () => {
        try {
            setLoading(true);
            await userService.logout();
            setUser(null);
        } catch (err) {
            setError(err.errors || { general: err.message });
        } finally {
            setLoading(false);
        }
    }, []);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const contextValue = useMemo(() => ({
        user,
        setUser,
        fetchUser,
        register,
        login,
        logout,
        userLoading,
        error,
        loading,
        clearError,
    }), [
        user,
        setUser,
        fetchUser,
        register,
        login,
        logout,
        userLoading,
        loading,
        clearError,
        error,
    ]);

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};