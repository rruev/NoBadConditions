import { Outlet, Navigate } from "react-router";
import { useUser } from "../../hooks/useUser";

export default function IsAuthenticated() {
    const { user, userLoading } = useUser();

    if (userLoading) {
        return null;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
}