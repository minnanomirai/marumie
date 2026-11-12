"use client";
import "client-only";
import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import OrganizationYearSheet from "@/client/components/layout/header/OrganizationYearSheet";
import { getHeaderNavigation } from "@/client/lib/header-navigation";
import { MARUMIE_SITE_URL, ORGANIZATION_SITE_URL, SITE_NAME } from "@/client/lib/site-config";
import type { OrganizationsResponse } from "@/types/organization";

const DEFAULT_YEAR = 2026;
const AVAILABLE_YEARS = [2026];

interface HeaderClientProps {
  organizations: OrganizationsResponse;
}

export default function HeaderClient({ organizations }: HeaderClientProps) {
  const pathname = usePathname();

  // 現在のslugとyearを取得（/o/[slug]/[year]/... の形式の場合）
  const pathSegments = pathname.split("/");
  const isPageWithSlug = pathSegments[1] === "o";
  const slugFromPath = isPageWithSlug ? pathSegments[2] : null;
  const yearFromPath = isPageWithSlug && pathSegments[3] ? parseInt(pathSegments[3], 10) : null;

  const currentYear =
    yearFromPath && AVAILABLE_YEARS.includes(yearFromPath) ? yearFromPath : DEFAULT_YEAR;

  // ナビは今いる政治団体ページ自身を指す。
  const currentOrganizationSlug = slugFromPath ?? organizations.default;
  const navigationItems = currentOrganizationSlug
    ? getHeaderNavigation(currentOrganizationSlug, currentYear).items
    : [];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-2.5 py-3 xl:px-6 xl:py-4">
      {/* Main Header Container with rounded background */}
      <div className="bg-white rounded-[20px] border border-[#EAEAEA] px-3 py-3 xl:px-6 xl:py-0 relative z-10">
        <div className="flex items-center gap-2 xl:h-16">
          {/* Logo and Title Section: ロゴは団体の本体サイト、「まるみえ政治資金」はこのサイトのトップへ */}
          <div className="flex items-center gap-2 xl:gap-4">
            <a
              href={ORGANIZATION_SITE_URL}
              className="hover:opacity-80 transition-opacity cursor-pointer"
            >
              <Image
                src="/logos/minna-no-mirai-logo.png"
                alt="みんなのみらい"
                width={1200}
                height={152}
                className="h-[15px] sm:h-[22px] xl:h-[26px] w-auto"
                priority
              />
            </a>
            <span aria-hidden="true" className="h-4 sm:h-5 w-px bg-[#C8C8C8]" />
            <a
              href={MARUMIE_SITE_URL}
              aria-label={SITE_NAME}
              className="font-japanese text-[9px] sm:text-[14px] xl:text-[17px] font-black tracking-[0.06em] sm:tracking-[0.1em] text-[#222222] whitespace-nowrap hover:opacity-80 transition-opacity cursor-pointer"
            >
              まるみえ政治資金
            </a>
          </div>

          {/* Navigation Menu + Organization Selector */}
          <div className="flex items-center gap-8 flex-1 justify-end h-12 min-w-0">
            <nav
              className="hidden lg:flex items-center flex-shrink-0"
              aria-label="メインナビゲーション"
            >
              <span aria-hidden="true" className="h-3 w-px bg-[#C8C8C8]" />
              {navigationItems.map((item) => (
                <Fragment key={item.href}>
                  <Link
                    href={item.href}
                    className="px-4 text-[13px] font-bold tracking-[0.08em] text-[#484848] hover:text-[#BF342B] transition-colors whitespace-nowrap cursor-pointer"
                  >
                    {item.label}
                  </Link>
                  <span aria-hidden="true" className="h-3 w-px bg-[#C8C8C8]" />
                </Fragment>
              ))}
            </nav>
            <div className="flex items-center w-full max-w-[217px] min-w-[92px] h-12 flex-shrink">
              <OrganizationYearSheet
                organizations={organizations}
                initialSlug={currentOrganizationSlug ?? undefined}
                initialYear={currentYear}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
