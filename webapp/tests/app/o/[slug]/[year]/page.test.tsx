jest.mock("next/navigation", () => ({ redirect: jest.fn() }));
jest.mock("@/server/contexts/public-finance/presentation/loaders/load-organizations", () => ({
  loadOrganizations: jest.fn(),
}));
jest.mock("@/server/contexts/public-finance/presentation/loaders/load-top-page-data", () => ({
  loadTopPageData: jest.fn(),
}));
// 描画はしないので、重い UI ライブラリを読み込む子コンポーネントは差し替える。
jest.mock("@/client/components/common/ExplanationSection", () => ({
  __esModule: true,
  default: function ExplanationSection() {
    return null;
  },
}));
jest.mock("@/client/components/top-page/OrganizationIntroSection", () => ({
  __esModule: true,
  default: function OrganizationIntroSection() {
    return null;
  },
}));
jest.mock("@/client/components/top-page/BalanceSheetSection", () => ({ __esModule: true, default: () => null }));
jest.mock("@/client/components/top-page/CashFlowSection", () => ({ __esModule: true, default: () => null }));
jest.mock("@/client/components/top-page/MonthlyTrendsSection", () => ({ __esModule: true, default: () => null }));
jest.mock("@/client/components/top-page/TransactionsSection", () => ({ __esModule: true, default: () => null }));

import type { ReactElement } from "react";
import OrgPage from "@/app/o/[slug]/[year]/page";
import ExplanationSection from "@/client/components/common/ExplanationSection";
import BalanceSheetSection from "@/client/components/top-page/BalanceSheetSection";
import CashFlowSection from "@/client/components/top-page/CashFlowSection";
import MonthlyTrendsSection from "@/client/components/top-page/MonthlyTrendsSection";
import OrganizationIntroSection from "@/client/components/top-page/OrganizationIntroSection";
import TransactionsSection from "@/client/components/top-page/TransactionsSection";
import { loadOrganizations } from "@/server/contexts/public-finance/presentation/loaders/load-organizations";
import { loadTopPageData } from "@/server/contexts/public-finance/presentation/loaders/load-top-page-data";

const loadOrganizationsMock = loadOrganizations as jest.Mock;
const loadTopPageDataMock = loadTopPageData as jest.Mock;

const params = Promise.resolve({ slug: "minnanomirai", year: "2026" });

async function renderSections(): Promise<ReactElement[]> {
  const page = (await OrgPage({ params })) as ReactElement<{ children: ReactElement[] }>;
  return page.props.children.filter(Boolean);
}

describe("OrgPage のセクション構成", () => {
  beforeEach(() => {
    loadOrganizationsMock.mockResolvedValue({
      default: "minnanomirai",
      organizations: [{ slug: "minnanomirai", orgName: null, displayName: "みんなのみらい" }],
    });
    loadTopPageDataMock.mockResolvedValue(null);
  });

  it("収支の流れ・すべての出入金・紹介・月ごとの推移・貸借対照表・データについての順に並べる", async () => {
    const sections = await renderSections();

    expect(sections.map((section) => section.type)).toEqual([
      CashFlowSection,
      TransactionsSection,
      OrganizationIntroSection,
      MonthlyTrendsSection,
      BalanceSheetSection,
      ExplanationSection,
    ]);
  });

  it("調査研究費のセクションは出さない", async () => {
    const sections = await renderSections();

    expect(sections).toHaveLength(6);
  });
});
