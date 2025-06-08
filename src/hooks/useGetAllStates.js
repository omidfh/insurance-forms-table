import { useQuery } from "@tanstack/react-query";
import { getDynamicStateByCountry } from "../services/api";

export function UseGetTempStates(country, currentFormId) {
  const { isLoading, data, error, isError } = useQuery({
    queryFn: () => getDynamicStateByCountry(country),
    queryKey: ["dynamic-states", country],
    retry: 3,
    enabled: !!country && currentFormId === "home_insurance_application",
  });
  return { data, error, isLoading, isError };
}
