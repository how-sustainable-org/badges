import express from "express";
import yoga from "yoga-layout-prebuilt";
import { readFile } from "fs/promises";

import satori, { init } from "satori/wasm";

init(yoga);

export const app = express();

const dmSans = {
  name: "DM Sans",
  weight: 400,
  style: "normal",
  path: "../assets/fonts/dm-sans-regular.ttf",
} as const;

const dmSerifDisplay = {
  name: "DM Serif Display",
  weight: 400,
  style: "normal",
  path: "../assets/fonts/dm-serif-display-regular.ttf",
} as const;

const symbol = (
  <svg
    width="61"
    height="31"
    viewBox="0 0 61 31"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M46.3834 7.60795C46.3834 7.60795 49.8518 5.16818 52.0787 5.16818C53.402 5.16957 54.7044 5.50908 55.8707 6.15664C57.0369 6.80419 58.031 7.73979 58.7649 8.88052C59.4987 10.0213 59.9496 11.3319 60.0776 12.6963C60.2056 14.0608 60.0068 15.4369 59.4987 16.7026C58.9907 17.9684 58.1891 19.0848 57.165 19.953C56.1409 20.8211 54.926 21.4141 53.6278 21.6794C52.3296 21.9448 50.9883 21.8743 49.7227 21.4742C48.4571 21.0741 47.3063 20.3568 46.3723 19.3858L41.8182 14.662L35.6107 21.1219L40.0645 25.7361C42.4035 28.2165 45.4017 29.92 48.6779 30.6299C51.9541 31.3397 55.36 31.0238 58.4624 29.7224C61.5647 28.4209 64.2233 26.1927 66.0997 23.3213C67.9762 20.4499 68.9857 17.0651 68.9998 13.5976C69.014 10.13 68.0322 6.73646 66.1793 3.84871C64.3263 0.960952 61.6861 -1.29046 58.5945 -2.61908C55.5029 -3.9477 52.0996 -4.29346 48.8178 -3.61236C45.536 -2.93127 42.5239 -1.25411 40.1648 1.20571L22.6278 19.3742C21.5064 20.5492 20.0731 21.3523 18.5102 21.6815C16.9472 22.0107 15.325 21.8512 13.8498 21.2231C12.3745 20.5951 11.1127 19.5269 10.2248 18.1543C9.33678 16.7817 8.86268 15.1666 8.86268 13.5142C8.86268 11.8618 9.33678 10.2467 10.2248 8.87404C11.1127 7.50142 12.3745 6.43324 13.8498 5.80519C15.325 5.17715 16.9472 5.01759 18.5102 5.3468C20.0731 5.67601 21.5064 6.47912 22.6278 7.6541L22.6668 7.69447L27.1819 12.3664L33.4172 5.90646L28.9077 1.23455C26.5627 -1.24067 23.5598 -2.93706 20.2813 -3.63867C17.0028 -4.34028 13.5969 -4.0154 10.4972 -2.70537C7.39749 -1.39534 4.7441 0.840592 2.87478 3.71782C1.00545 6.59505 0.00474189 9.98345 1.68103e-05 13.4517C-0.00470827 16.92 0.986766 20.3113 2.84824 23.194C4.70972 26.0767 7.35701 28.3204 10.4532 29.6395C13.5493 30.9586 16.9543 31.2934 20.2347 30.6014C23.5151 29.9094 26.5226 28.2218 28.8743 25.7534L46.3834 7.60795Z"
      fill="url(#paint0_linear_5_1464)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_5_1464"
        x1="0"
        y1="13.1698"
        x2="69"
        y2="13.1698"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#047857" />
        <stop offset="1" stop-color="#34D399" />
      </linearGradient>
    </defs>
  </svg>
);

app.get("/:company/badge/:size/badge.svg", async (request, response) => {
  const { company } = request.params;

  const [dmSansBuffer, dmSerifDisplayBuffer] = await Promise.all(
    [dmSans, dmSerifDisplay].map((font) =>
      readFile(require.resolve(font.path)),
    ),
  );

  const svg = await satori(
    <div
      style={{
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#27272A",
        width: 120,
        height: 120,
        borderRadius: 8,
        padding: 8,
        paddingTop: 18,
      }}
    >
      <div style={{ position: "absolute", right: 0, top: 0, display: "flex" }}>
        {symbol}
      </div>
      <div
        style={{
          fontFamily: dmSans.name,
          fontSize: 17,
          letterSpacing: 0.5,
          color: "white",
        }}
      >
        Top
      </div>
      <div
        style={{
          fontFamily: dmSerifDisplay.name,
          fontSize: 56,
          letterSpacing: -0.5,
          color: "#34D399",
          margin: "-14px 0px",
        }}
      >
        10%
      </div>
      <div
        style={{
          fontFamily: dmSans.name,
          fontSize: 12,
          letterSpacing: 0.25,
          color: "white",
        }}
      >
        most sustainable
      </div>
    </div>,
    {
      width: 120,
      height: 120,
      fonts: [
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
      ],
    },
  );

  response.writeHead(200, {
    "Content-Type": "image/svg+xml",
    "Content-Length": svg.length,
  });

  response.end(svg);
});
