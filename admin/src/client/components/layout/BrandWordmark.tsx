import Image from "next/image";
import { cn } from "@/client/lib";
import { DEPLOY_TARGET_ENV, isStagingTargetEnv } from "@/client/lib/deploy-environment";

interface BrandWordmarkProps {
  className?: string;
}

/**
 * 「みんなのみらい」のロゴ + 「まるみえ政治資金 ADMIN CONSOLE」のヘッダー。
 * ロゴ画像は公開サイトと同じもの（利用範囲は README の「ブランド素材」を参照）。
 * サイドバーと公開画面（ログイン等）のカードで同じ表現を共有する。
 *
 * ステージングでのみ「STAGING」のピルを足して、本番と取り違えたまま操作する事故を防ぐ。
 * 本番・ローカルでは何も描かないので、既存の見た目は変わらない。
 */
export function BrandWordmark({ className }: BrandWordmarkProps) {
  const isStaging = isStagingTargetEnv(DEPLOY_TARGET_ENV);

  return (
    <div className={cn("min-w-0", className)}>
      <Image
        src="/logos/minna-no-mirai-logo.png"
        alt="みんなのみらい"
        width={1200}
        height={152}
        className="h-[18px] w-auto"
        priority
      />
      <div className="mt-1.5 whitespace-nowrap text-[12px] font-black tracking-[0.1em] text-foreground">
        まるみえ政治資金
      </div>
      <div className="mt-0.5 font-latin text-[10px] font-semibold tracking-[0.14em] text-brand-red">
        ADMIN CONSOLE
        {isStaging && (
          <span className="ml-1.5 inline-block rounded-full bg-destructive px-1.5 py-[1px] align-[1px] text-[9px] font-bold tracking-[0.08em] text-destructive-foreground">
            STAGING
          </span>
        )}
      </div>
    </div>
  );
}
