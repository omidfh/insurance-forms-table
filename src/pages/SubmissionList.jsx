import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import {
  Box,
  Flex,
  Group,
  LoadingOverlay,
  Paper,
  TableTd,
  Text,
} from "@mantine/core";
import { IconGripVertical, IconUser } from "@tabler/icons-react";
import { DataTable, DataTableDraggableRow } from "mantine-datatable";
import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";
import PaginationSection from "../components/submissions/PaginationSection";
import TablePopover from "../components/submissions/TablePopover";
import TableSearch from "../components/submissions/TableSearch";
import { UseGetSubmittedList } from "../hooks/useGetSubmittedList";
import { GetColumns } from "../hooks/useTableColumns";
import HeaderLeftSection from "../components/submissions/HeaderLeftSection";
import { useTranslation } from "react-i18next";

export default function SubmissionList() {
  const { data, isLoading } = UseGetSubmittedList();
  const [query, setQuery] = useState("");
  const [records, setRecords] = useState([]);
  const [sortStatus, setSortStatus] = useState({
    columnAccessor: null,
    direction: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { t } = useTranslation();

  // Column visibility state
  const [columnVisibility, setColumnVisibility] = useState({
    "Full Name": true,
    Age: true,
    Gender: true,
    "Insurance Type": true,
    City: true,
  });

  // Update records when data changes and add unique IDs
  React.useEffect(() => {
    if (data?.data) {
      const recordsWithIds = data.data.map((record, index) => ({
        ...record,
        id: `record-${index}-${
          record["Full Name"]?.replace(/\s+/g, "-") || index
        }`,
      }));
      setRecords(recordsWithIds);
    }
  }, [data]);

  // Handle drag and drop
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(records);
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    const [reorderedItem] = items.splice(sourceIndex, 1);
    items.splice(destinationIndex, 0, reorderedItem);

    setRecords(items);

    toast.success(
      t("toast.itemMoved", {
        name: reorderedItem["Full Name"],
        from: sourceIndex + 1,
        to: destinationIndex + 1,
      })
    );
  };

  // Enhanced sorting function
  const getSortedRecords = (recordsToSort, sortBy, direction) => {
    if (!sortBy || !direction) return recordsToSort;

    return [...recordsToSort].sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      // Handle different data types
      if (typeof aValue === "string" && typeof bValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      // Handle numbers
      if (typeof aValue === "number" && typeof bValue === "number") {
        return direction === "asc" ? aValue - bValue : bValue - aValue;
      }

      // Handle strings
      if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  // Filter and sort records
  const filteredAndSortedRecords = useMemo(() => {
    // First filter the records
    let filtered = records;
    if (query) {
      filtered = records.filter((record) =>
        Object.values(record).some((value) =>
          String(value).toLowerCase().includes(query.toLowerCase())
        )
      );
    }

    // Then sort the filtered records
    return getSortedRecords(
      filtered,
      sortStatus.columnAccessor,
      sortStatus.direction
    );
  }, [records, query, sortStatus]);

  // Paginate the processed records
  const paginatedRecords = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredAndSortedRecords.slice(startIndex, startIndex + pageSize);
  }, [filteredAndSortedRecords, currentPage, pageSize]);

  // Calculate pagination info
  const totalPages = Math.ceil(filteredAndSortedRecords.length / pageSize);

  // Reset to first page when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  // Handle column sort
  const handleSort = (columnAccessor) => {
    setSortStatus((prevStatus) => {
      if (prevStatus.columnAccessor === columnAccessor) {
        // Toggle direction for the same column
        const newDirection =
          prevStatus.direction === "asc"
            ? "desc"
            : prevStatus.direction === "desc"
            ? null
            : "asc";

        return {
          columnAccessor: newDirection ? columnAccessor : null,
          direction: newDirection,
        };
      } else {
        // Sort by new column (start with ascending)
        return {
          columnAccessor,
          direction: "asc",
        };
      }
    });
  };

  // Handle column visibility toggle
  const toggleColumnVisibility = (columnKey) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [columnKey]: !prev[columnKey],
    }));
  };

  // Show or hide all columns
  const toggleAllColumns = (show) => {
    const newVisibility = {};
    Object.keys(columnVisibility).forEach((key) => {
      newVisibility[key] = show;
    });
    setColumnVisibility(newVisibility);
  };

  // Get visible columns count
  const visibleColumnsCount =
    Object.values(columnVisibility).filter(Boolean).length;

  // Get filtered columns based on visibility
  const visibleColumns = GetColumns(handleSort, sortStatus, columnVisibility);

  if (isLoading) {
    return (
      <Flex w="90%" justify="center" align="center" h={400}>
        <LoadingOverlay visible />
      </Flex>
    );
  }

  return (
    <Flex direction="column" w="95%" p={20} gap="md">
      {/* Header Section */}
      <Paper p="md" shadow="sm" withBorder>
        <Group position="apart" align="center" justify="space-between">
          <HeaderLeftSection
            filteredAndSortedRecords={filteredAndSortedRecords}
            records={records}
            visibleColumnsCount={visibleColumnsCount}
            columnVisibility={columnVisibility}
            currentPage={currentPage}
            totalPages={totalPages}
            sortStatus={sortStatus}
          />

          <Group spacing="md">
            {/* Column Visibility Control */}
            <TablePopover
              visibleColumnsCount={visibleColumnsCount}
              toggleAllColumns={toggleAllColumns}
              columnVisibility={columnVisibility}
              toggleColumnVisibility={toggleColumnVisibility}
            />

            {/* Search Input */}
            <TableSearch query={query} setQuery={setQuery} />
          </Group>
        </Group>
      </Paper>

      {/* Draggable Data Table */}
      <Paper shadow="sm">
        <DragDropContext onDragEnd={handleDragEnd}>
          <DataTable
            records={paginatedRecords}
            columns={visibleColumns}
            minHeight={200}
            verticalSpacing="md"
            horizontalSpacing="lg"
            highlightOnHover
            borderRadius="sm"
            withTableBorder
            // Table wrapper for drag and drop
            tableWrapper={({ children }) => (
              <Droppable droppableId="submissions-table">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {children}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            )}
            rowFactory={({ record, index, rowProps, children }) => (
              <Draggable key={record.id} draggableId={record.id} index={index}>
                {(provided, snapshot) => (
                  <DataTableDraggableRow
                    isDragging={snapshot.isDragging}
                    {...rowProps}
                    {...provided.draggableProps}
                    style={{
                      ...provided.draggableProps.style,
                      ...(snapshot.isDragging && {
                        opacity: 0.5,
                        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
                      }),
                    }}
                  >
                    <TableTd
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      style={{
                        cursor: "grab",
                        padding: "8px",
                        textAlign: "center",
                        borderRight: "1px solid var(--mantine-color-gray-3)",
                      }}
                    >
                      <IconGripVertical
                        size={16}
                        color="var(--mantine-color-gray-6)"
                      />
                    </TableTd>
                    {children}
                  </DataTableDraggableRow>
                )}
              </Draggable>
            )}
            // Empty state
            noRecordsText={t("table.noRecords")}
            noRecordsIcon={
              <Box ta="center" c="dimmed">
                <IconUser size={48} stroke={1} />
                <Text mt="sm">{t("table.noRecordsMatch")}</Text>
              </Box>
            }
            // Enhanced styling
            styles={(theme) => ({
              header: {
                backgroundColor: theme.colors.brand[0],
                color: theme.colors.brand[8],
                fontWeight: 600,
              },
              table: {
                tableLayout: "fixed",
                "& td:first-of-type:hover": {
                  backgroundColor: theme.colors.gray[1],
                },
              },
            })}
          />
        </DragDropContext>
      </Paper>

      {/* Pagination Section */}
      {filteredAndSortedRecords.length > 0 && (
        <PaginationSection
          currentPage={currentPage}
          pageSize={pageSize}
          filteredAndSortedRecords={filteredAndSortedRecords}
          setPageSize={setPageSize}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      )}
    </Flex>
  );
}
