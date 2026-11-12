interface HeaderNavigationItem {
  href: string;
  label: string;
}

interface HeaderNavigation {
  /** ロゴとトップリンクの行き先（今いるページ自身） */
  homeHref: string;
  items: HeaderNavigationItem[];
}

/** 政治団体ページのセクション（/o/[slug]/[year]）。 */
const ORGANIZATION_SECTIONS: HeaderNavigationItem[] = [
  { href: "#cash-flow", label: "収支の流れ" },
  { href: "#transactions", label: "すべての出入金" },
  { href: "#monthly-trends", label: "1年間の推移" },
  { href: "#balance-sheet", label: "貸借対照表" },
  { href: "#explanation", label: "データについて" },
];

/** ヘッダーのナビの行き先を組み立てる。アンカーは今いる政治団体ページ自身を基準にする。 */
export function getHeaderNavigation(slug: string, year: number): HeaderNavigation {
  const homeHref = `/o/${encodeURIComponent(slug)}/${year}/`;

  return {
    homeHref,
    items: ORGANIZATION_SECTIONS.map((section) => ({
      ...section,
      href: `${homeHref}${section.href}`,
    })),
  };
}
