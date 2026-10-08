import { 
    createContext,
    useMemo,
    useCallback,
    useState 
} from "react";
import { fetchConditions } from "../services/conditions.service";

const ConditionsContext = createContext();

export const ConditionsProvider = ({ children }) => {
    const [conditions, setConditions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchAndSetConditions = useCallback(async (lat, lon) => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchConditions(lat, lon);
            setConditions(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [setConditions, setLoading, setError]);

    const contextValue = useMemo(() => ({
        conditions,
        setConditions,
        loading,
        setLoading,
        error,
        setError,
        fetchAndSetConditions
    }), [
        conditions, 
        setConditions, 
        loading, 
        setLoading, 
        error, 
        setError,
        fetchAndSetConditions
    ]);

    return (
        <ConditionsContext value={contextValue}>
            {children}
        </ConditionsContext>
    );
};

export default ConditionsContext;