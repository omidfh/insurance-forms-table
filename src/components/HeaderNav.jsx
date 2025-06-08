import {
  ActionIcon,
  Flex,
  Menu,
  NavLink,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { RouteBuilder } from "../routes/routes";
import { useAppColors } from "../hooks/useAppColors";
import { useTranslation } from "react-i18next";

const languages = [
  { value: "en", label: "EN" },
  { value: "tr", label: "TR" },
];

export default function HeaderNav() {
  const { i18n, t } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const colors = useAppColors();

  const handleLanguageChange = (value) => {
    console.log(value);
    i18n.changeLanguage(value);
  };

  const currentLanguage = languages.find(
    (lang) => lang.value === i18n.language.split("-")[0]
  )?.label;

  const appRoutes = useMemo(() => RouteBuilder(), [i18n.language]);

  return (
    <Flex maw={"100%"} w={"100%"}>
      <Flex
        justify="space-between"
        direction={"row"}
        align="center"
        w="100%"
        py={"sm"}
        px="md"
        style={{
          background: colors.navBackground,
        }}
      >
        <Flex gap="md">
          {appRoutes.map((route) => {
            const isActive = route.path === pathname;
            return (
              <NavLink
                key={`${route.path}-${i18n.language}`}
                href={route.path}
                label={t(route.titleKey)}
                active={isActive}
                onClick={(event) => {
                  event.preventDefault();
                  navigate(route.path);
                }}
                styles={{
                  root: {
                    backgroundColor: "transparent",
                    borderRadius: "6px",
                  },
                  label: {
                    fontSize: "16px",
                    transition: "color 0.2s ease",
                    paddingBottom: "4px",

                    color: colors.primaryText,

                    fontWeight: isActive ? 600 : 400,
                  },
                  body: {
                    justifyContent: "center",
                  },
                }}
              />
            );
          })}
        </Flex>
        <Flex gap={10}>
          <Menu shadow="md" width={100}>
            <Menu.Target>
              <ActionIcon
                variant="outline"
                size="lg"
                aria-label={t("header.languageSwitch")}
              >
                {currentLanguage}
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              {languages.map((language) => (
                <Menu.Item
                  key={language.value}
                  onClick={() => handleLanguageChange(language.value)}
                >
                  {language.label}
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>

          <ActionIcon
            onClick={toggleColorScheme}
            variant="subtle"
            size="lg"
            aria-label={t("header.toggleColorScheme")}
            style={{
              color: colorScheme === "dark" ? theme.white : theme.black,
            }}
          >
            {colorScheme === "dark" ? (
              <IconSun size="1.2rem" />
            ) : (
              <IconMoon size="1.2rem" />
            )}
          </ActionIcon>
        </Flex>
      </Flex>
    </Flex>
  );
}
