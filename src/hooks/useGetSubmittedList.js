import { useQuery } from "@tanstack/react-query";
import { getSubmittedList } from "../services/api";

export function UseGetSubmittedList() {
  const { isLoading, data, error } = useQuery({
    queryFn: () => getSubmittedList(),
    queryKey: ["submitted-forms"],
  });
  return { data, error, isLoading };
}
