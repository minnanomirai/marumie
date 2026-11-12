jest.mock("@/server/contexts/public-finance/presentation/loaders/load-organizations", () => ({
  loadOrganizations: jest.fn(),
}));

import sitemap, { revalidate } from "@/app/sitemap";
import { loadOrganizations } from "@/server/contexts/public-finance/presentation/loaders/load-organizations";

const loadOrganizationsMock = loadOrganizations as jest.Mock;

const BASE_URL = process.env.WEBAPP_URL || "http://localhost:3000";

describe("sitemap", () => {
  beforeEach(() => {
    loadOrganizationsMock.mockResolvedValue({
      default: "minnanomirai",
      organizations: [{ slug: "minnanomirai", orgName: null, displayName: "みんなのみらい" }],
    });
  });

  it("政治団体は年度ごとのトップページと全件ページを列挙し、リダイレクトするだけの URL は出さない", async () => {
    const urls = (await sitemap()).map((entry) => entry.url);

    expect(urls).toEqual([
      `${BASE_URL}/o/minnanomirai/2026`,
      `${BASE_URL}/o/minnanomirai/2026/transactions`,
    ]);
  });

  it("議員ページ（/p/）の URL を出さない", async () => {
    const urls = (await sitemap()).map((entry) => entry.url);

    expect(urls.filter((url) => url.includes("/p/"))).toEqual([]);
  });

  it("再デプロイなしで公開内容の変化を反映するため、1 時間ごとに作り直す", () => {
    expect(revalidate).toBe(3600);
  });
});
