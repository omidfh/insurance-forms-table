import { Group, Badge, Text, ActionIcon } from "@mantine/core";
import {
  IconUser,
  IconCalendar,
  IconMapPin,
  IconShield,
  IconChevronUp,
  IconChevronDown,
  IconSelector,
  IconGenderAndrogyne,
} from "@tabler/icons-react";
import i18next from "i18next";
import { useMemo } from "react";

export function GetColumns(onSort, sortStatus, columnVisibility = {}) {
  // Helper function to render sort icon
  const renderSortIcon = (accessor) => {
    if (sortStatus?.columnAccessor === accessor) {
      return sortStatus.direction === "asc" ? (
        <IconChevronUp size={14} color="var(--mantine-color-brand-6)" />
      ) : (
        <IconChevronDown size={14} color="var(--mantine-color-brand-6)" />
      );
    }
    return <IconSelector size={14} color="var(--mantine-color-gray-5)" />;
  };

  // Helper function to create sortable header
  const createSortableHeader = (icon, text, accessor) => (
    <Group
      spacing="xs"
      style={{ cursor: "pointer", userSelect: "none" }}
      onClick={() => onSort && onSort(accessor)}
    >
      {icon}
      <Text>{text}</Text>
      {renderSortIcon(accessor)}
    </Group>
  );

  // Define all available columns

  const allColumns = useMemo(() => {
    return [
      {
        accessor: "",
        hiddenContent: true,
        width: "5%",
        title: "",
        isAlwaysVisible: true, // Drag handle column is always visible
      },
      {
        accessor: "Full Name",
        title: createSortableHeader(
          <IconUser size={16} />,
          i18next.t("table.fullName"),
          "Full Name"
        ),

        width: "20%",
        render: ({ "Full Name": name }) => (
          <Group spacing="sm">
            <Text weight={500}>{name}</Text>
          </Group>
        ),
      },
      {
        accessor: "Age",
        title: createSortableHeader(
          <IconCalendar size={16} />,
          i18next.t("table.age"),
          "Age"
        ),

        textAlignment: "center",
        width: "15%",
        render: ({ Age }) => (
          <Badge
            variant="light"
            color={Age < 25 ? "green" : Age < 50 ? "blue" : "orange"}
            size="lg"
          >
            {Age}
          </Badge>
        ),
      },
      {
        accessor: "Gender",
        title: createSortableHeader(
          <IconGenderAndrogyne size={16} />,
          i18next.t("table.gender"),
          "Gender"
        ),
        textAlignment: "center",
        width: "15%",
        render: ({ Gender }) => (
          <Badge
            variant="outline"
            color={
              Gender === "Male" ? "blue" : Gender === "Female" ? "pink" : "gray"
            }
          >
            {i18next.t(`formOptions.gender.${Gender}`, Gender)}
          </Badge>
        ),
      },
      {
        accessor: "Insurance Type",
        title: createSortableHeader(
          <IconShield size={16} />,
          i18next.t("table.insuranceType"),
          "Insurance Type"
        ),
        width: "20%",
        render: ({ "Insurance Type": insurance }) => (
          <Badge variant="light">{insurance}</Badge>
        ),
      },
      {
        accessor: "City",
        title: createSortableHeader(
          <IconMapPin size={16} />,
          i18next.t("table.city"),
          "City"
        ),
        width: "15%",
        render: ({ City }) => <Text color="dimmed">{City}</Text>,
      },
    ];
  }, [i18next.language, sortStatus, columnVisibility]);

  // Filter columns based on visibility settings
  const visibleColumns = allColumns.filter((column) => {
    // Always show the drag handle column
    if (column.isAlwaysVisible) return true;

    // Show column if it's marked as visible in columnVisibility
    return columnVisibility[column.accessor] !== false;
  });

  // Adjust column widths based on visible columns count
  const adjustedColumns = visibleColumns.map((column) => {
    if (column.isAlwaysVisible) return column;

    // Recalculate widths for better distribution
    const visibleDataColumns = visibleColumns.length - 1; // Exclude drag handle
    let newWidth;

    switch (visibleDataColumns) {
      case 1:
        newWidth = "95%";
        break;
      case 2:
        newWidth = column.accessor === "Full Name" ? "60%" : "35%";
        break;
      case 3:
        if (column.accessor === "Full Name") newWidth = "40%";
        else if (column.accessor === "Insurance Type") newWidth = "35%";
        else newWidth = "20%";
        break;
      case 4:
        if (column.accessor === "Full Name") newWidth = "30%";
        else if (column.accessor === "Insurance Type") newWidth = "25%";
        else newWidth = "15%";
        break;
      default:
        newWidth = column.width; // Use original width
    }

    return {
      ...column,
      width: newWidth,
    };
  });

  return adjustedColumns;
}

// Helper function to get default column visibility
export function getDefaultColumnVisibility() {
  return {
    "Full Name": true,
    Age: true,
    Gender: true,
    "Insurance Type": true,
    City: true,
  };
}
