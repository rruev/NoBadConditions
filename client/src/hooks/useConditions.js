import { use } from "react";
import conditionsContext from "../context/ConditionsContext.jsx";

const useConditions = () => {
    const ctx = use(conditionsContext);
    return ctx;
}

export default useConditions;