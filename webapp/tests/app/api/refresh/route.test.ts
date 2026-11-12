jest.mock("next/cache", () => ({ revalidateTag: jest.fn() }));

import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { POST } from "@/app/api/refresh/route";

const revalidateTagMock = revalidateTag as jest.Mock;

const request = (token?: string) =>
  new Request("http://localhost/api/refresh", {
    method: "POST",
    headers: token ? { "x-refresh-token": token } : {},
  }) as unknown as NextRequest;

describe("POST /api/refresh", () => {
  const originalToken = process.env.DATA_REFRESH_TOKEN;

  beforeEach(() => {
    revalidateTagMock.mockReset();
    process.env.DATA_REFRESH_TOKEN = "secret";
  });

  afterAll(() => {
    process.env.DATA_REFRESH_TOKEN = originalToken;
  });

  it("政治団体のタグは従来どおり古いデータを返しつつ作り直す", async () => {
    const response = await POST(request("secret"));

    expect(response.status).toBe(200);
    expect(revalidateTagMock).toHaveBeenCalledWith("organizations", "max");
    expect(revalidateTagMock).toHaveBeenCalledWith("top-page-data", "max");
  });

  it("トークンが一致しなければキャッシュを無効化しない", async () => {
    const response = await POST(request("wrong"));

    expect(response.status).toBe(401);
    expect(revalidateTagMock).not.toHaveBeenCalled();
  });
});
