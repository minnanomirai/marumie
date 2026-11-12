import { getHeaderNavigation } from "@/client/lib/header-navigation";

describe("getHeaderNavigation", () => {
  it("政治団体ページの /o/[slug]/[year] のセクションを指す", () => {
    const { homeHref, items } = getHeaderNavigation("minnanomirai", 2026);

    expect(homeHref).toBe("/o/minnanomirai/2026/");
    expect(items).toEqual([
      { href: "/o/minnanomirai/2026/#cash-flow", label: "収支の流れ" },
      { href: "/o/minnanomirai/2026/#transactions", label: "すべての出入金" },
      { href: "/o/minnanomirai/2026/#monthly-trends", label: "1年間の推移" },
      { href: "/o/minnanomirai/2026/#balance-sheet", label: "貸借対照表" },
      { href: "/o/minnanomirai/2026/#explanation", label: "データについて" },
    ]);
  });

  it("外部サイトへのリンクを含めない", () => {
    const { items } = getHeaderNavigation("minnanomirai", 2026);

    expect(items.filter((item) => item.href.startsWith("http"))).toEqual([]);
  });

  it("slug は URL エンコードする", () => {
    expect(getHeaderNavigation("a/b", 2026).homeHref).toBe("/o/a%2Fb/2026/");
  });
});
