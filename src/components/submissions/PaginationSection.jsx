import { Flex, Group, Pagination, Paper, Select, Text } from "@mantine/core";
import React from "react";
import { useTranslation } from "react-i18next";

export default function PaginationSection({
  currentPage,
  pageSize,
  filteredAndSortedRecords,
  setPageSize,
  setCurrentPage,
  totalPages,
}) {
  const { t } = useTranslation();

  const from = (currentPage - 1) * pageSize + 1;
  const to = Math.min(currentPage * pageSize, filteredAndSortedRecords.length);

  return (
    <Paper p="md" shadow="sm" withBorder>
      <Flex justify="space-between" align="center" wrap="wrap" gap="md">
        {/* Left side - Records info and page size selector */}
        <Group spacing="md">
          <Text size="sm" color="dimmed">
            {t("table.paginationInfo", {
              from,
              to,
              total: filteredAndSortedRecords.length,
            })}
          </Text>

          <Group spacing="xs">
            <Text size="sm" color="dimmed">
              {t("table.show")}
            </Text>
            <Select
              value={pageSize.toString()}
              onChange={(value) => {
                setPageSize(parseInt(value));
                setCurrentPage(1);
              }}
              data={[
                { value: "5", label: "5" },
                { value: "10", label: "10" },
                { value: "25", label: "25" },
                { value: "50", label: "50" },
              ]}
              size="xs"
              w={70}
            />
            <Text size="sm" color="dimmed">
              {t("table.entries")}{" "}
            </Text>
          </Group>
        </Group>

        <Pagination
          value={currentPage}
          onChange={setCurrentPage}
          total={totalPages}
          size="sm"
          withEdges
        />
      </Flex>
    </Paper>
  );
}
