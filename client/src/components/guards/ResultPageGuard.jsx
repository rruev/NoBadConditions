import { Outlet, Navigate } from "react-router";
import { useUser } from "../../hooks/useUser";
import useConditions from "../../hooks/useConditions";

export default function ResultPageGuard() {
    const { user } = useUser();
    const { conditions, loading } = useConditions();

    if (!loading && conditions.length === 0) {
        console.log("No conditions available");
        if (user) {
            return <Navigate to="/activecrags" />;
        }
        return <Navigate to="/" />;
    }

    return <Outlet />;
}