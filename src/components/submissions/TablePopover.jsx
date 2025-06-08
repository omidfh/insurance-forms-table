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
import { useTranslation } from "react-i18next";

export default function TablePopover({
  visibleColumnsCount,
  toggleAllColumns,
  columnVisibility,
  toggleColumnVisibility,
}) {
  const [columnPopoverOpened, setColumnPopoverOpened] = useState(false);
  const { t } = useTranslation();

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
          {t("table.columnsButton", { count: visibleColumnsCount })}
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Stack spacing="xs">
          <Group position="apart">
            <Text weight={500} size="sm">
              {t("table.columnVisibility")}
            </Text>
            <Group spacing="xs">
              <ActionIcon
                size="sm"
                variant="subtle"
                onClick={() => toggleAllColumns(true)}
                title={t("table.showAllColumns")}
              >
                <IconEye size={14} />
              </ActionIcon>
              <ActionIcon
                size="sm"
                variant="subtle"
                onClick={() => toggleAllColumns(false)}
                title={t("table.hideAllColumns")}
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
                {t(`table.${columnKey.replaceAll(" ", "").toLowerCase()}`) ||
                  columnKey}
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
            {t("table.columnToggleHint")}
          </Text>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
}
