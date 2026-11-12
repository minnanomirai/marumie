import "server-only";
import Image from "next/image";
import Link from "next/link";
import MainColumnCard from "@/client/components/layout/MainColumnCard";
import { Title } from "@/client/components/ui/Typography";
import { ORGANIZATION_SITE_URL } from "@/client/lib/site-config";

const PARAGRAPH_CLASS =
  "text-[11px] sm:text-[15px] leading-[1.82] sm:leading-[1.87] tracking-[0.01em] text-gray-500 sm:text-gray-800 font-medium sm:font-normal font-japanese";

/** 政治団体ページに置く、みんなのみらいと「まるみえ政治資金」の紹介。 */
export default function OrganizationIntroSection() {
  return (
    <MainColumnCard id="intro">
      <div className="flex flex-col gap-4">
        {/* アイコン + タイトル（ほかのセクションの見出しとそろえる）。団体のサイトへのリンク */}
        <Link
          href={ORGANIZATION_SITE_URL}
          className="flex items-center gap-2 self-start hover:opacity-80 transition-opacity cursor-pointer"
        >
          <span className="w-[30px] h-[30px] flex items-center justify-center flex-shrink-0">
            <Image src="/icons/icon-minnanomirai.png" alt="" width={26} height={26} />
          </span>
          <Title className="text-[--color-text-primary]">みんなのみらいとは</Title>
        </Link>
        <div className="space-y-3 sm:space-y-4">
          <p className={PARAGRAPH_CLASS}>
            「みんなのみらい」は、ふるさと長崎県のみらいをみんなでつくる目的で、前長崎県知事の大石賢吾が立ち上げた政治団体です。
          </p>
          <p className={PARAGRAPH_CLASS}>
            みんなのみらいが大切にしている価値観のひとつが「政治の見える化」。政治を、ガラスのように透明にしていくことです。政治に関するお金の流れを見える化することは、政治家や政治団体が意図的な資金操作をしていないことを広く示すことで、政治への信頼をつくっていくことに加えて、結果として政治家や政治団体を守ることにもつながると考えています。
          </p>
          <p className={PARAGRAPH_CLASS}>
            そこで、みなさまから大切な会費や寄附をいつ、いくらお預かりしたのか、何に、いくら使ったのかについて、収入と支出の流れを、このページで誰でも見られるように公開します。法令で定められた収支報告書の提出を待つのではなく、日々の流れをわかりやすく示すことで、説明責任を果たしてまいります。
          </p>
          <p className={PARAGRAPH_CLASS}>
            見られて困るお金は、一円もありません。透明であることは、私たちの約束であり、みなさまと一緒にみらいをつくるための土台と考えています。
          </p>
        </div>
      </div>
    </MainColumnCard>
  );
}
