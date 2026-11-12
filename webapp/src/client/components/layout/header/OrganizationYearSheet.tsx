"use client";
import "client-only";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { OrganizationsResponse } from "@/types/organization";

const AVAILABLE_YEARS = [2026] as const;
const DEFAULT_YEAR = 2026;

interface OrganizationYearSheetProps {
  organizations: OrganizationsResponse;
  initialSlug?: string;
  initialYear?: number;
}

export default function OrganizationYearSheet({
  organizations,
  initialSlug,
  initialYear,
}: OrganizationYearSheetProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [currentSlug, setCurrentSlug] = useState(initialSlug || "");
  const [currentYear, setCurrentYear] = useState(initialYear || DEFAULT_YEAR);

  useEffect(() => {
    const pathSegments = pathname.split("/");
    // URL format: /o/{slug}/{year}/...
    if (pathSegments[1] === "o" && pathSegments[2]) {
      setCurrentSlug(pathSegments[2]);
      if (pathSegments[3]) {
        const yearFromPath = parseInt(pathSegments[3], 10);
        if (AVAILABLE_YEARS.includes(yearFromPath as (typeof AVAILABLE_YEARS)[number])) {
          setCurrentYear(yearFromPath);
        }
      }
    }
  }, [pathname]);

  const currentOrganization = organizations.organizations.find((org) => org.slug === currentSlug);

  const handleSelect = (slug: string, year: number) => {
    const pathSegments = pathname.split("/");

    // Determine the rest of the path after slug/year (e.g., /transactions)
    let restOfPath = "";
    if (pathSegments[1] === "o" && pathSegments[2]) {
      // Check if there's content after the year
      if (pathSegments[4]) {
        restOfPath = `/${pathSegments.slice(4).join("/")}`;
      }
    }

    const newPath = `/o/${slug}/${year}${restOfPath}`;
    router.push(newPath);
  };

  const handleOrganizationSelect = (slug: string) => {
    handleSelect(slug, currentYear);
  };

  const handleYearSelect = (year: number) => {
    handleSelect(currentSlug, year);
  };

  const triggerLabel = currentOrganization?.displayName ?? "政治団体を選択";

  return (
    <div className="relative w-full min-w-0 max-w-full">
      {/* Trigger Button */}
      <button
        type="button"
        className="flex items-center gap-4 w-full min-w-0 pb-1.5 pl-6 pr-4 pt-2 border-[0.5px] border-black rounded-lg font-bold hover:opacity-90 transition-opacity cursor-pointer"
        style={{
          backgroundImage: "#F2F2F2",
        }}
        onClick={() => setIsOpen(true)}
      >
        <span className="flex flex-col gap-1.5 items-start flex-1 min-w-0 leading-none">
          <span className="text-[14px] leading-none text-black truncate w-full text-left">
            {triggerLabel}
          </span>
          <span className="text-xs leading-none text-[#222222]">{currentYear}年</span>
        </span>
        <Image
          src="/icons/icon-chevron-down.svg"
          alt=""
          width={24}
          height={24}
          className={isOpen ? "rotate-180" : ""}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <button
            type="button"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setIsOpen(false)}
            aria-label="閉じる"
          />

          {/* Dropdown Content */}
          <div className="absolute right-0 top-full mt-1 z-50 w-68 bg-white rounded-lg border border-black/50 shadow-lg py-3 max-h-[70vh] overflow-y-auto">
            {/* Organization Selection */}
            <div className="px-4 flex flex-col gap-1">
              <p className="text-[11px] text-[#5a5a5a]">表示する団体名</p>
              <div className="flex flex-col">
                {organizations.organizations.map((org) => (
                  <button
                    key={org.slug}
                    type="button"
                    onClick={() => handleOrganizationSelect(org.slug)}
                    className="flex items-center gap-2 min-h-9 py-2 pl-6 text-left cursor-pointer rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <span className="w-3 flex items-center justify-center">
                      {currentSlug === org.slug && <SelectedMark />}
                    </span>
                    <span className="flex flex-col gap-0.5">
                      <span className="text-xs text-gray-900">{org.displayName}</span>
                      {org.orgName && (
                        <span className="text-[10px] text-[#6a6a6a]">{org.orgName}</span>
                      )}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <hr className="my-2 border-gray-200" />

            {/* Year Selection */}
            <div className="px-4 py-1 flex flex-col gap-2">
              <p className="text-[11px] text-[#5a5a5a]">対象年</p>
              <div className="flex gap-3">
                {AVAILABLE_YEARS.map((year) => (
                  <button
                    key={year}
                    type="button"
                    onClick={() => handleYearSelect(year)}
                    className={`px-3 py-1.5 rounded-full text-[11px] leading-none transition-all cursor-pointer hover:opacity-70 ${
                      currentYear === year ? "font-bold text-[#222222]" : "bg-[#ececec] text-black"
                    }`}
                    style={
                      currentYear === year
                        ? {
                            background: "#F2F2F2",
                          }
                        : undefined
                    }
                  >
                    {year}年
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <hr className="my-2 border-gray-200" />

            {/* Close */}
            <div className="px-4 flex justify-end">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-xs font-bold text-[#222222] cursor-pointer"
              >
                閉じる
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/** 選択中の ✓（デザインの「ヘッダー」節の #222222・太字） */
function SelectedMark() {
  return (
    <span className="text-[11px] font-bold leading-none text-[#222222]" aria-hidden="true">
      ✓
    </span>
  );
}
