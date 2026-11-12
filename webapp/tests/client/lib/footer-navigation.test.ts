import { getFooterTextLinks, getIntroLink } from "@/client/lib/footer-navigation";

function hrefOf(links: ReturnType<typeof getFooterTextLinks>, label: string) {
  return links.find((link) => link.label === label)?.href;
}

describe("getFooterTextLinks", () => {
  it("政治団体ページでは /o/[slug]/ のセクションと、利用規約・プライバシーポリシーを指す", () => {
    expect(getFooterTextLinks("/o/sample-party/2026")).toEqual([
      { label: "TOP", href: "/o/sample-party/#top" },
      { label: "収支の流れ", href: "/o/sample-party/#cash-flow" },
      { label: "すべての出入金", href: "/o/sample-party/#transactions" },
      { label: "月ごとの収支推移", href: "/o/sample-party/#monthly-trends" },
      { label: "貸借対照表", href: "/o/sample-party/#balance-sheet" },
      { label: "データについて", href: "/o/sample-party/#explanation" },
      { label: "利用規約", href: "/terms" },
      { label: "プライバシーポリシー", href: "/privacy" },
    ]);
  });

  it("/o/ 以外のページでは既定の政治団体を指す", () => {
    expect(hrefOf(getFooterTextLinks("/terms"), "収支の流れ")).toBe("/o/minnanomirai/#cash-flow");
  });

  it("外部サイトへのリンクを含めない", () => {
    const links = getFooterTextLinks("/o/minnanomirai/2026");

    expect(links.filter((link) => link.href.startsWith("http"))).toEqual([]);
  });
});

describe("getIntroLink", () => {
  it("政治団体ページでは、その団体の紹介カードを指す", () => {
    expect(getIntroLink("/o/minnanomirai/2026")).toEqual({
      label: "みんなのみらいとは",
      href: "/o/minnanomirai/#intro",
    });
  });

  it("利用規約・プライバシーポリシーなど団体のないページでは、みんなのみらいの紹介カードを指す", () => {
    expect(getIntroLink("/terms").href).toBe("/o/minnanomirai/#intro");
    expect(getIntroLink("/privacy").href).toBe("/o/minnanomirai/#intro");
  });

  it("取引一覧ページでも、その団体の紹介カードを指す", () => {
    expect(getIntroLink("/o/minnanomirai/2026/transactions").href).toBe(
      "/o/minnanomirai/#intro",
    );
  });
});
