import React from "react";
import {
  TextInput,
  Select,
  Radio,
  Checkbox,
  Group,
  Loader,
  NumberInput,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { UseGetStateByCountry } from "./useGetStateByCountry";
import { UseGetTempStates } from "./useGetAllStates";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const RenderField = (field, isVisible, mantineForm) => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const currentFormId = searchParams.get("form");
  const {
    data: states,
    isLoading,
    isError,
  } = UseGetStateByCountry(mantineForm.getValues().country, currentFormId);

  const {
    data: tempStates,
    isLoading: isLoadingStates,
    isError: statesError,
  } = UseGetTempStates("USA", currentFormId);

  const commonProps = {
    key: field.id,
    label: t(`formFields.${field.id}`, field.label),
    required: field.required,
    ...mantineForm.getInputProps(field.id),
  };
  function fetchedSates(states) {
    return states?.map((item) => ({
      label: item.name,
      value: item.name,
    }));
  }

  if (!isVisible(field)) return null;
  switch (field.type) {
    case "text":
      return (
        <TextInput
          styles={{
            label: {
              marginBottom: "5px",
            },
          }}
          {...commonProps}
        />
      );
    case "number":
      return (
        <NumberInput
          styles={{
            label: {
              marginBottom: "5px",
            },
          }}
          {...commonProps}
        />
      );
    case "date":
      return (
        <DateInput
          styles={{
            label: {
              marginBottom: "5px",
            },
          }}
          valueFormat="YYYY MMM DD"
          clearable
          value={mantineForm.getValues("dob")}
          {...commonProps}
        />
      );
    case "select":
      if (field.id === "state") {
        //? This condition return a Select option USA states in Home insurance ( i had to make the form work, because there was no country and field was required!)

        if (currentFormId === "home_insurance_application") {
          return (
            <Select
              {...commonProps}
              data={fetchedSates(tempStates) || []}
              disabled={isLoadingStates || statesError}
              clearable
              searchable
              nothingFoundMessage={t("form.noOptions")}
              styles={{
                label: {
                  marginBottom: "5px",
                },
              }}
            />
          );
        }
        if (isLoading) return <Loader color="indigo" type="dots" />;
        else if (!isLoading) {
          //? This condition return a Select option of states according to selected country in Health insurance

          return (
            <Select
              key={mantineForm.getValues().country}
              required={field.required}
              data={fetchedSates(states) || []}
              searchable
              clearable
              value={mantineForm.values.state || ""}
              onChange={(value) =>
                mantineForm.setFieldValue("state", value || "")
              }
              disabled={!mantineForm.values.country || isLoading || isError}
              error={mantineForm.errors.state}
              nothingFoundMessage="No options"
              styles={{
                label: {
                  marginBottom: "5px",
                },
              }}
            />
          );
        }
      } else if (field.id === "country") {
        return (
          <Select
            {...commonProps}
            data={field.options || []}
            clearable
            onChange={(value) => {
              mantineForm.setFieldValue("country", value);
              mantineForm.setFieldValue("state", "");
            }}
            nothingFoundMessage="No options"
            styles={{
              label: {
                marginBottom: "5px",
              },
            }}
          />
        );
      } else {
        return (
          <Select
            {...commonProps}
            data={field.options || []}
            clearable
            nothingFoundMessage="No options"
            styles={{
              label: {
                marginBottom: "5px",
              },
            }}
          />
        );
      }
      break;
    case "radio":
      return (
        <Radio.Group
          styles={{
            label: {
              marginBottom: "5px",
            },
          }}
          {...commonProps}
        >
          <Group>
            {field.options?.map((opt) => (
              <Radio
                key={opt}
                value={opt}
                label={t(`form.options.${opt}`, opt)}
              />
            ))}
          </Group>
        </Radio.Group>
      );
    case "checkbox":
      return (
        <Checkbox.Group
          styles={{
            label: {
              marginBottom: "5px",
            },
          }}
          {...commonProps}
        >
          <Group>
            {field.options?.map((opt) => (
              <Checkbox
                key={opt}
                value={opt}
                label={t(`form.options.${opt}`, opt)}
              />
            ))}
          </Group>
        </Checkbox.Group>
      );
    default:
      return null;
  }
};
