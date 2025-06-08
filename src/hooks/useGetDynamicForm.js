import { useQuery } from "@tanstack/react-query";
import { getDynamicForm } from "../services/api";

export function UseGetDynamicForm() {
  const { isLoading, data, error } = useQuery({
    queryFn: () => getDynamicForm(),
    queryKey: ["dynamic-form"],
  });
  return { data, error, isLoading };
}
