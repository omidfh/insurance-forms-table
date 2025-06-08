import React, { useEffect, useMemo } from "react";
import { Stack, Title, Button, Center, Loader } from "@mantine/core";
import { useForm } from "@mantine/form";
import { RenderField } from "../../hooks/useDynamicFormItems";
import { useSubmitForm } from "../../hooks/useSubmitForm";
import { getInitialValues } from "../../hooks/useGetUserSavedData";
import { getClientSideValidation } from "../../tools/formValidation";
import { useTranslation } from "react-i18next";

export default function DynamicForm({ form }) {
  const { mutate: submitHook, isLoading } = useSubmitForm();
  const { t } = useTranslation();

  //prepare local storage key for saving
  const storageKey = useMemo(
    () => `form-data-${form.id || form.title}`,
    [form.id, form.title]
  );

  const flatFields = useMemo(() => {
    const flatten = (fields) =>
      fields.flatMap((f) => (f.type === "group" ? flatten(f.fields) : f));
    return flatten(form.fields);
  }, [form]);

  // Then in your form initialization:
  const mantineForm = useForm({
    initialValues: getInitialValues(flatFields, storageKey),
    validate: flatFields.reduce((acc, field) => {
      const validator = getClientSideValidation(field);
      if (validator) {
        acc[field.id] = validator;
      }
      return acc;
    }, {}),
  });

  //use Effect for auto save
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(mantineForm.values));
  }, [mantineForm.values, storageKey]);

  const handleSubmit = (values) => {
    console.log("Submitted:", values);

    submitHook(values, {
      onSuccess: () => {
        localStorage.removeItem(storageKey);
      },
    });
  };

  const isVisible = (field) => {
    if (!field.visibility) return true;

    const dependentValue = mantineForm.values[field.visibility.dependsOn];
    const condition = field.visibility.condition;
    const expected = field.visibility.value;

    if (condition === "equals") return dependentValue === expected;

    return true;
  };

  return (
    <form onSubmit={mantineForm.onSubmit(handleSubmit)}>
      <Stack gap={"lg"} mb={"md"}>
        <Center>
          <Title order={3}>
            {t("form.title", { defaultValue: form.title })}
          </Title>
        </Center>
        {form.fields.map((field) => {
          console.log(field.label);
          return field.type === "group" ? (
            <React.Fragment key={field.id}>
              <Stack key={field.id} p={5} gap={"md"}>
                <Title order={5}>
                  {t(`formFields.${field.id}`, field.label)}
                </Title>
                {field.fields.map((subField) =>
                  RenderField(subField, isVisible, mantineForm)
                )}
              </Stack>
            </React.Fragment>
          ) : (
            RenderField(field, isVisible, mantineForm)
          );
        })}
        {isLoading ? (
          <Loader type={"dots"} color="indigo" />
        ) : (
          <Button type="submit">{t("common.submit")}</Button>
        )}
      </Stack>
    </form>
  );
}
