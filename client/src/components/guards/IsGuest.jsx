import { Outlet, Navigate } from "react-router";
import { useUser } from "../../hooks/useUser";

export default function IsGuest() {
    const { user } = useUser();

    if (user) {
        return <Navigate to="/active-crags" />;
    }

    return <Outlet />;
}