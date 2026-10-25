import { Outlet, Navigate } from "react-router";
import { useUser } from "../../hooks/useUser";
import useConditions from "../../hooks/useConditions";

export default function ResultPageGuard() {
    const { user, userLoading } = useUser();
    const { conditions, loading } = useConditions();

    if (userLoading) {
        return null;
    }

    if (!loading && conditions.length === 0) {
        console.log("No conditions available");
        if (user) {
            return <Navigate to="/active-crags" />;
        }
        return <Navigate to="/" />;
    }

    return <Outlet />;
}