import { fetch, HeadersInit } from "undici";

const headers: HeadersInit = {
  "X-Auth-Token": "HS-hackathon",
};

const BASE_URL = "https://howsustainable.org/api";

export async function getCompanyRanking(pageId: string) {
  const response = await fetch(`${BASE_URL}/companies/${pageId}/scores`, {
    headers,
  });

  const body = (await response.json()) as any;

  return Math.round((1 - body[0]["how_sustainable_rank_avg"]) * 100);
}
