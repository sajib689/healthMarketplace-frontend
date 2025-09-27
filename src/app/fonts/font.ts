import { DM_Sans } from "next/font/google";
import { Roboto_Flex } from "next/font/google";

export const dmSans = DM_Sans({
  subsets: ["latin"], // Add subsets if needed
  weight: ["400", "500", "600", "700"], // Specify available weights
  variable: "--font-dm-sans", // Define a meaningful CSS variable
});

export const robotoFlex = Roboto_Flex({
  subsets: ["latin"], // Add subsets if needed
  weight: ["400", "500", "600", "700"], // Specify available weights
  variable: "--font-roboto-flex", // Define a meaningful CSS variable
});
