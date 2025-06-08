import { TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import React from "react";
import { useTranslation } from "react-i18next";

export default function TableSearch({ query, setQuery }) {
  const { t } = useTranslation();
  return (
    <TextInput
      placeholder={t("table.searchPlaceholder")}
      rightSection={<IconSearch size={16} />}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      w={300}
      size="md"
      styles={(theme) => ({
        input: {
          borderColor: theme.colors.brand[3],
          "&:focus": {
            borderColor: theme.colors.brand[6],
            boxShadow: `0 0 0 1px ${theme.colors.brand[6]}`,
          },
        },
      })}
    />
  );
}
