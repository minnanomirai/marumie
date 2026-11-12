"use client";
import "client-only";
import Link from "next/link";
import { Fragment } from "react";
import { usePathname } from "next/navigation";
import { getFooterTextLinks, getIntroLink } from "@/client/lib/footer-navigation";
import {
  SERVICE_REPO_URL,
  SITE_NAME,
  UPSTREAM_NAME,
  UPSTREAM_REPO_URL,
} from "@/client/lib/site-config";

// PC 表示の見出し。列の幅（コンテナの幅）に合わせて文字を縮め、1 行に収める。
// 「みんなのみらい まるみえ政治資金について」が約 21.7 文字分の幅になるため 4.4cqw を上限の目安にする
const COLUMN_TITLE_CLASS =
  "font-japanese text-[20px] lg:text-[min(24px,4.4cqw)] lg:whitespace-nowrap font-bold tracking-[0.12em] leading-[1.6]";

/** 矢印の丸ボタンの中身（外部リンクは ↗、サイト内は →）。 */
function ArrowIcon({ external }: { external: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-full border border-white text-lg"
    >
      {external ? "↗" : "→"}
    </span>
  );
}

const SOURCE_LINK_CLASS =
  "inline-flex items-center gap-4 font-japanese text-[14px] tracking-[0.08em]";

/** 矢印の丸ボタンと文字のボックス。href が空のあいだはリンクにしない。 */
function SourceCodeLink({ href, label }: { href: string; label: string }) {
  const icon = <ArrowIcon external />;
  if (!href) {
    return (
      <span className={SOURCE_LINK_CLASS}>
        {icon}
        {label}
      </span>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${SOURCE_LINK_CLASS} hover:opacity-80 transition-opacity`}
    >
      {icon}
      {label}
    </a>
  );
}

export default function Footer() {
  const pathname = usePathname();

  const textLinks = getFooterTextLinks(pathname);
  const introLink = getIntroLink(pathname);

  return (
    <footer className="w-full bg-white px-5 lg:px-[117px] pt-6 pb-12">
      <div className="max-w-[1278px] mx-auto flex flex-col items-center gap-10">
        {/* 黒いカード（みんなのみらいのサイトの「お問い合わせ」と同じ作り） */}
        <div className="w-full rounded-[20px] bg-[#222222] text-white px-8 py-12 lg:px-[92px] lg:py-[64px] grid gap-10 lg:grid-cols-2 lg:gap-0">
          <div className="lg:pr-12 [container-type:inline-size]">
            <p className="font-english text-[28px] lg:text-[34px] font-semibold tracking-[0.1em] leading-[1.35]">
              About.
            </p>
            <p className={COLUMN_TITLE_CLASS}>{SITE_NAME}について</p>
            <p className="mt-6 font-japanese text-[14px] leading-[2] tracking-[0.08em] text-[#E5E5E5]">
              政治資金の流れを、見える形で公開するサイトです。
              <br />
              表示している数値はデモ用のダミーデータです。
            </p>
            <Link
              href={introLink.href}
              className={`mt-6 ${SOURCE_LINK_CLASS} hover:opacity-80 transition-opacity`}
            >
              <ArrowIcon external={false} />
              {introLink.label}
            </Link>
          </div>
          <div className="lg:border-l lg:border-[#4E4E4E] lg:pl-12 [container-type:inline-size]">
            <p className="font-english text-[28px] lg:text-[34px] font-semibold tracking-[0.1em] leading-[1.35]">
              Open Source.
            </p>
            <p className={COLUMN_TITLE_CLASS}>オープンソースについて</p>
            <p className="mt-6 font-japanese text-[14px] leading-[2] tracking-[0.08em] text-[#E5E5E5]">
              本サービスは、チームみらいが AGPL v3 で公開するオープンソース「{UPSTREAM_NAME}
              」をもとに独自に開発しました。元となるオープンソースを開発・公開されたすべての開発者の皆さまに敬意を表します。本サービスは、チームみらいとは関係のない、独立したサービスです。
            </p>
            <div className="mt-6 flex flex-col items-start gap-4">
              <SourceCodeLink href={SERVICE_REPO_URL} label="本サービスのソースコード（GitHub）" />
              <SourceCodeLink href={UPSTREAM_REPO_URL} label="元のソースコード（GitHub）" />
            </div>
          </div>
        </div>

        {/* テキストリンク（項目の間に細い縦線） */}
        <nav
          aria-label="フッターナビゲーション"
          className="flex flex-wrap items-center justify-center gap-y-3"
        >
          <span aria-hidden="true" className="h-3 w-px bg-[#C8C8C8]" />
          {textLinks.map((link) => (
            <Fragment key={link.href}>
              <Link
                href={link.href}
                className="px-5 font-japanese text-[14px] font-bold tracking-[0.08em] text-[#484848] hover:text-[#BF342B] transition-colors"
              >
                {link.label}
              </Link>
              <span aria-hidden="true" className="h-3 w-px bg-[#C8C8C8]" />
            </Fragment>
          ))}
        </nav>

        <p className="font-japanese text-[13px] tracking-[0.1em] text-[#484848]">
          © みんなのみらい All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
