import {
  Box,
  Button,
  Stack,
  Text,
  Title,
  Container,
  Paper,
} from "@mantine/core";
import { IconRefresh, IconAlertTriangle } from "@tabler/icons-react";
import { useAppColors } from "../hooks/useAppColors";
import { useTranslation } from "react-i18next";

export function MainErrorFallback({ resetErrorBoundary }) {
  const colors = useAppColors();
  const { t } = useTranslation();

  return (
    <Container
      size="sm"
      style={{ minHeight: "100vh", display: "flex", alignItems: "center" }}
    >
      <Paper
        p="xl"
        radius="md"
        style={{
          backgroundColor: colors.cardBackground,
          border: `1px solid ${colors.border}`,
          width: "100%",
        }}
      >
        <Stack align="center" gap="lg">
          <Box
            style={{
              backgroundColor: colors.hoverBackground,
              borderRadius: "50%",
              padding: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconAlertTriangle
              size={48}
              style={{ color: colors.primaryText }}
            />
          </Box>

          {/* Error Title */}
          <Title order={2} ta="center" style={{ color: colors.primaryText }}>
            {t("error.title")}
          </Title>

          {/* Error Description */}
          <Text ta="center" style={{ color: colors.secondaryText }} size="lg">
            {t("error.description")}
          </Text>

          <Stack gap="sm" style={{ width: "100%" }}>
            <Button
              leftSection={<IconRefresh size={16} />}
              onClick={resetErrorBoundary}
              size="md"
              style={{
                backgroundColor: colors.activeBackground,
                color: colors.activeText,
                border: "none",
              }}
              styles={{
                root: {
                  "&:hover": {
                    backgroundColor: colors.primaryText,
                  },
                },
              }}
            >
              {t("common.tryAgain")}
            </Button>

            <Button
              variant="outline"
              onClick={() => window.location.replace("/")}
              size="md"
              style={{
                borderColor: colors.border,
                color: colors.primaryText,
              }}
              styles={{
                root: {
                  "&:hover": {
                    backgroundColor: colors.hoverBackground,
                  },
                },
              }}
            >
              {t("common.goHome")}
            </Button>
          </Stack>

          <Text ta="center" size="sm" style={{ color: colors.secondaryText }}>
            {t("error.footerNote")}
          </Text>
        </Stack>
      </Paper>
    </Container>
  );
}
