import { createTheme } from "@mantine/core";

export const theme = createTheme({
  primaryColor: "indigo",
  colors: {
    brand: [
      "#eef2ff", //0
      "#e0e7ff", //1
      "#c7d2fe", //2
      "#a5b4fc", //3
      "#818cf8", //4
      "#6366f1", //5
      "#4f46e5", //6
      "#4338ca", //7
      "#3730a3", //8
      "#312e81", //9
    ],
  },
  primaryShade: 6,
  fontFamily: "Inter, sans-serif",
  defaultRadius: "md",
});
