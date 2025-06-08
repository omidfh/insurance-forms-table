import { TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import React from "react";

export default function TableSearch({ query, setQuery }) {
  return (
    <TextInput
      placeholder="Search submissions..."
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
