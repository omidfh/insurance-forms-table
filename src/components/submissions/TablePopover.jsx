import {
  ActionIcon,
  Button,
  Divider,
  Group,
  Popover,
  Stack,
  Text,
} from "@mantine/core";
import {
  IconCalendar,
  IconColumns,
  IconEye,
  IconEyeOff,
  IconMapPin,
  IconShield,
  IconUser,
} from "@tabler/icons-react";
import React, { useState } from "react";

export default function TablePopover({
  visibleColumnsCount,
  toggleAllColumns,
  columnVisibility,
  toggleColumnVisibility,
}) {
  const [columnPopoverOpened, setColumnPopoverOpened] = useState(false);

  return (
    <Popover
      width={280}
      position="bottom-end"
      withArrow
      shadow="md"
      opened={columnPopoverOpened}
      onChange={setColumnPopoverOpened}
    >
      <Popover.Target>
        <Button
          variant="outline"
          leftIcon={<IconColumns size={16} />}
          onClick={() => setColumnPopoverOpened((o) => !o)}
          size="md"
        >
          Columns ({visibleColumnsCount})
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Stack spacing="xs">
          <Group position="apart">
            <Text weight={500} size="sm">
              Column Visibility
            </Text>
            <Group spacing="xs">
              <ActionIcon
                size="sm"
                variant="subtle"
                onClick={() => toggleAllColumns(true)}
                title="Show all columns"
              >
                <IconEye size={14} />
              </ActionIcon>
              <ActionIcon
                size="sm"
                variant="subtle"
                onClick={() => toggleAllColumns(false)}
                title="Hide all columns"
              >
                <IconEyeOff size={14} />
              </ActionIcon>
            </Group>
          </Group>
          <Divider />

          {Object.entries(columnVisibility).map(([columnKey, isVisible]) => (
            <Group key={columnKey} position="apart" spacing="xs">
              <Group spacing="xs">
                {/* Column icons */}
                {columnKey === "Full Name" && <IconUser size={14} />}
                {columnKey === "Age" && <IconCalendar size={14} />}
                {columnKey === "Insurance Type" && <IconShield size={14} />}
                {columnKey === "City" && <IconMapPin size={14} />}
                <Text size="sm">{columnKey}</Text>
              </Group>
              <ActionIcon
                size="sm"
                variant={isVisible ? "filled" : "subtle"}
                color={isVisible ? "brand" : "gray"}
                onClick={() => toggleColumnVisibility(columnKey)}
              >
                {isVisible ? <IconEye size={14} /> : <IconEyeOff size={14} />}
              </ActionIcon>
            </Group>
          ))}

          <Divider />
          <Text size="xs" color="dimmed" ta="center">
            Click the eye icons to show/hide columns
          </Text>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
}
