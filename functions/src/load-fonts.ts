import { readFile } from "fs/promises";

export const dmSans = {
  name: "DM Sans",
  weight: 400,
  style: "normal",
  path: "../assets/fonts/dm-sans-regular.ttf",
} as const;

export const dmSerifDisplay = {
  name: "DM Serif Display",
  weight: 400,
  style: "normal",
  path: "../assets/fonts/dm-serif-display-regular.ttf",
} as const;

export async function loadFonts() {
  const [dmSansBuffer, dmSerifDisplayBuffer] = await Promise.all(
    [dmSans, dmSerifDisplay].map((font) =>
      readFile(require.resolve(font.path)),
    ),
  );

  return [
    {
      name: dmSans.name,
      data: dmSansBuffer,
      weight: dmSans.weight,
      style: dmSans.style,
    },
    {
      name: dmSerifDisplay.name,
      data: dmSerifDisplayBuffer,
      weight: dmSerifDisplay.weight,
      style: dmSerifDisplay.style,
    },
  ];
}
