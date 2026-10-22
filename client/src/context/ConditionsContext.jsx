import { 
    createContext,
    useMemo,
    useCallback,
    useState 
} from "react";
import { fetchConditions } from "../services/conditions.service";
import { useNavigate } from "react-router";

const ConditionsContext = createContext({
    conditions: [],
    loading: false,
    error: null,
    fetchAndSetConditions: async () => {}
});

export const ConditionsProvider = ({ children }) => {
    const [conditions, setConditions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const fetchAndSetConditions = useCallback(async (lat, lon, cragName="", page) => {
        setLoading(true);
        setError(null);
        navigate(`/result/${page}`);
        try {
            const data = await fetchConditions(lat, lon);
            setConditions({...data, cragName: cragName});
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
        error,
        fetchAndSetConditions
    }), [
        conditions,
        setConditions,
        loading, 
        error, 
        fetchAndSetConditions
    ]);

    return (
        <ConditionsContext.Provider value={contextValue}>
            {children}
        </ConditionsContext.Provider>
    );
};

export default ConditionsContext;