import { Flex, Loader, LoadingOverlay, Paper, Tabs } from "@mantine/core";
import React, { useEffect } from "react";
import DynamicForm from "../components/form/DynamicForm";
import { useAppColors } from "../hooks/useAppColors";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UseGetDynamicForm } from "../hooks/useGetDynamicForm";
import { useTranslation } from "react-i18next";

export default function InsuranceForm() {
  const { data, isLoading } = UseGetDynamicForm();
  const colors = useAppColors();
  const { t } = useTranslation();

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFormId = searchParams.get("form") || data?.[0]?.formId;

  useEffect(() => {
    if (data && !searchParams.get("form")) {
      searchParams.set(
        "form",
        data[0]?.formId || "health_insurance_application"
      );
      setSearchParams(searchParams);
    }
  }, [data, searchParams, setSearchParams]);

  if (isLoading) {
    return (
      <Flex w="90%" justify="center" align="center" h={400}>
        <LoadingOverlay visible />
      </Flex>
    );
  }
  return (
    <Paper shadow="sm" py={5}>
      <Tabs value={currentFormId}>
        <Flex p={10} pb={20}>
          <Tabs.List grow>
            {data?.map((form) => (
              <Tabs.Tab
                key={form.formId}
                onClick={() => {
                  navigate(`?form=${form.formId}`);
                }}
                value={form.formId}
                styles={{
                  tab: {
                    color: colors.primaryText,
                    padding: "12px 20px",
                    fontWeight: 500,
                    fontSize: "1rem",
                  },
                }}
              >
                {t(`formTitles.${form.formId}`, { defaultValue: form.title })}
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </Flex>

        {data?.map((form) => (
          <Tabs.Panel key={form.formId} value={form.formId} px={"md"} pb={"lg"}>
            <DynamicForm form={form} />
          </Tabs.Panel>
        ))}
      </Tabs>
    </Paper>
  );
}
