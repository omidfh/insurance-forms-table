import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitForm } from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function useSubmitForm() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { isLoading, mutate, data, isSuccess, isError, error } = useMutation({
    mutationFn: (formData) => submitForm(formData),
    onSuccess: () => {
      toast.success(t("toast.formSubmitSuccess"));
      navigate("/submissions");
      queryClient.invalidateQueries(["submitted-forms"]);
      console.log("success");
    },
    onError: () => {
      toast.error(t("toast.formSubmitError"));
      console.log("error");
    },
  });
  return { mutate, data, isLoading, error, isSuccess, isError };
}
