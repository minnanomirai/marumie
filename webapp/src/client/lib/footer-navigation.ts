const DEFAULT_ORGANIZATION_SLUG = "minnanomirai";

interface FooterTextLink {
  label: string;
  href: string;
}

/** ページ内アンカー以外の、どのページでも共通のリンク。 */
const COMMON_LINKS: FooterTextLink[] = [
  { label: "利用規約", href: "/terms" },
  { label: "プライバシーポリシー", href: "/privacy" },
];

/** 政治団体ページのスラッグ。政治団体ページではその団体、それ以外のページでは既定の政治団体。 */
function getOrganizationSlug(pathname: string): string {
  const [, rootSegment, slug] = pathname.split("/");
  return rootSegment === "o" && slug ? slug : DEFAULT_ORGANIZATION_SLUG;
}

function getOrganizationLinks(slug: string): FooterTextLink[] {
  const base = `/o/${slug}/`;
  return [
    { label: "TOP", href: `${base}#top` },
    { label: "収支の流れ", href: `${base}#cash-flow` },
    { label: "すべての出入金", href: `${base}#transactions` },
    { label: "月ごとの収支推移", href: `${base}#monthly-trends` },
    { label: "貸借対照表", href: `${base}#balance-sheet` },
    { label: "データについて", href: `${base}#explanation` },
  ];
}

/** 政治団体ページの紹介カード（みんなのみらいとは）へのリンク。 */
export function getIntroLink(pathname: string): FooterTextLink {
  return {
    label: "みんなのみらいとは",
    href: `/o/${getOrganizationSlug(pathname)}/#intro`,
  };
}

/** フッターのテキストリンクを、今いるページに合わせて組み立てる。 */
export function getFooterTextLinks(pathname: string): FooterTextLink[] {
  return [...getOrganizationLinks(getOrganizationSlug(pathname)), ...COMMON_LINKS];
}
