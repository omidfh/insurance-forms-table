import { Text, Title } from "@mantine/core";
import React from "react";
import { useTranslation } from "react-i18next";

export default function HeaderLeftSection({
  filteredAndSortedRecords,
  records,
  visibleColumnsCount,
  columnVisibility,
  currentPage,
  totalPages,
  sortStatus,
}) {
  const { t } = useTranslation();
  return (
    <div>
      <Title order={2} color="brand.6" mb="xs">
        {t("table.submissionRecords")}
      </Title>
      <Text color="dimmed" size="sm">
        {filteredAndSortedRecords.length} {t("table.of")} {records.length}{" "}
        {t("table.records")} • {visibleColumnsCount} {t("table.of")}{" "}
        {Object.keys(columnVisibility).length} {t("table.columnsShown")} •{" "}
        {t("table.page")} {currentPage} {t("table.of")} {totalPages}
        {sortStatus.columnAccessor && (
          <Text component="span" color="brand.6" ml="xs">
            •{" "}
            {t("table.sortedBy", {
              column: sortStatus.columnAccessor,
              direction: sortStatus.direction,
            })}
          </Text>
        )}
      </Text>
    </div>
  );
}
