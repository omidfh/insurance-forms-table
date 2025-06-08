import { Center, Flex } from "@mantine/core";
import React from "react";
import { Outlet } from "react-router-dom";
import HeaderNav from "./HeaderNav";

export default function Layout() {
  return (
    <Flex
      w={"100%"}
      justify={"center"}
      mx={"auto"}
      style={{ flex: 1, overflowY: "auto" }}
    >
      <Flex w="100%" direction={"column"} gap={10} h="100vh">
        <Flex justify="center" w="100%">
          <HeaderNav />
        </Flex>

        <Center>
          <Outlet />
        </Center>
      </Flex>
    </Flex>
  );
}
