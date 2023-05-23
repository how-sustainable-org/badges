import { fetch, HeadersInit } from "undici";

const token = "HSIv0qtRxUTCLizJdm2WD"
const headers: HeadersInit = {
  Authorization: `Bearer ${token}`,
};

const BASE_URL = "https://api.howsustainabledataservices.com";

console.log(headers)

export async function getCompanyRanking(pageId: string) {
  console.log(headers)

  const response = await fetch(`${BASE_URL}/companies/${pageId}/scores`, {
    headers,
  });

  const body = (await response.json()) as any;
  console.log(body[0])

  if (body[0]) {
    return Math.round((1 - body[0]["how_sustainable_rank_avg"]) * 100);
  } else {
    return 0
  }
}

export async function getCompanyData(pageId: string) {
  console.log(headers)

  const response = await fetch(`${BASE_URL}/companies/${pageId}/scores`, {
    headers,
  });

  const body = (await response.json()) as any;
  console.log(body[0])

  if (body[0]) {
    return body[0];
  } else {
    return null;
  }
}