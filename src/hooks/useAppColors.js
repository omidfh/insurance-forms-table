import { useMantineColorScheme, useMantineTheme } from "@mantine/core";

export function useAppColors() {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  return {
    // Text colors
    normalText: colorScheme === "dark" ? "white" : "black",
    primaryText:
      colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.brand[8],
    secondaryText:
      colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.brand[6],

    // Background colors
    navBackground:
      colorScheme === "dark" ? theme.colors.brand[9] : theme.colors.brand[1],
    cardBackground:
      colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.brand[0],
    hoverBackground:
      colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.brand[1],

    // Active states
    activeBackground:
      colorScheme === "dark" ? theme.colors.brand[8] : theme.colors.brand[6],
    activeText: colorScheme === "dark" ? theme.colors.dark[0] : "white",

    // Border colors
    border:
      colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.brand[2],

    // Utility
    colorScheme,
    theme,
  };
}
