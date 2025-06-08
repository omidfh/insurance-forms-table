import { useQuery } from "@tanstack/react-query";
import { getDynamicStateByCountry } from "../services/api";

export function UseGetStateByCountry(country, currentFormId) {
  const { isLoading, data, error, isError } = useQuery({
    queryFn: () => getDynamicStateByCountry(country),
    queryKey: ["dynamic-states", country],
    retry: 3,
    enabled: !!country && currentFormId === "health_insurance_application",
  });
  return { data, error, isLoading, isError };
}
