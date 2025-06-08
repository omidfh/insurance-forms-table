import { Text, Title } from "@mantine/core";
import React from "react";

export default function HeaderLeftSection({
  filteredAndSortedRecords,
  records,
  visibleColumnsCount,
  columnVisibility,
  currentPage,
  totalPages,
  sortStatus,
}) {
  return (
    <div>
      <Title order={2} color="brand.6" mb="xs">
        Submission Records
      </Title>
      <Text color={"dimmed"} size="sm">
        {filteredAndSortedRecords.length} of {records.length} records •
        {visibleColumnsCount} of {Object.keys(columnVisibility).length} columns
        shown • Page {currentPage} of {totalPages}
        {sortStatus.columnAccessor && (
          <Text component="span" color="brand.6" ml="xs">
            • Sorted by {sortStatus.columnAccessor} ({sortStatus.direction})
          </Text>
        )}
      </Text>
    </div>
  );
}
