import express from "express";
import yoga from "yoga-layout-prebuilt";
import { readFile } from "fs/promises";

import satori, { init } from "satori/wasm";
import { getCompanyRanking, getCompanyData } from "./how-sustainable-client";
import { dmSans, dmSerifDisplay, loadFonts } from "./load-fonts";
import { BadgeSmall } from "./badge-small";
import { BadgeMedium } from "./badge-medium";
import { BadgeLarge } from "./badge-large";

init(yoga);

export const app = express();

app.get("/:company/badge/:size/badge.svg", async (request, response) => {
  const { company, size } = request.params;

  let svg;
  if (size === "small") {
    const ranking = await getCompanyRanking(company);
    svg = await satori(<BadgeSmall ranking={ranking} />, {
      width: 120,
      height: 120,
      fonts: await loadFonts(),
    });
  } else if (size === "medium") {
    const scores = await getCompanyData(company);
    svg = await satori(<BadgeMedium scores={scores} />, {
      width: 340,
      height: 340,
      fonts: await loadFonts(),
    });
  } else {
    svg = await satori(<BadgeLarge />, {
      width: 640,
      height: 360,
      fonts: await loadFonts(),
    });
  }

  response.writeHead(200, {
    "Content-Type": "image/svg+xml",
    "Content-Length": svg.length,
  });

  response.end(svg);
});
