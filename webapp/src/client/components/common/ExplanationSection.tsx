import "server-only";
import MainColumnCard from "@/client/components/layout/MainColumnCard";
import { SITE_NAME, UPSTREAM_NAME } from "@/client/lib/site-config";

export default function ExplanationSection() {
  return (
    <MainColumnCard id="explanation">
      <div className="space-y-9">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 font-japanese">
            {SITE_NAME}について
          </h3>
          <p className="text-[11px] sm:text-[15px] leading-[1.82] sm:leading-[1.87] tracking-[0.01em] text-gray-500 sm:text-gray-800 font-medium sm:font-normal font-japanese">
            本サイトは、チームみらいが AGPL v3 で公開するオープンソース「{UPSTREAM_NAME}
            」をもとに独自に開発したものです。みらいが重なっていますが、みんなのみらいとチームみらいは異なる団体であり、本サービスについても、チームみらいとは関係のない独立したサービスです。
          </p>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 font-japanese">
            データの出典
          </h3>
          <p className="text-[11px] sm:text-[15px] leading-[1.82] sm:leading-[1.87] tracking-[0.01em] text-gray-500 sm:text-gray-800 font-medium sm:font-normal font-japanese">
            本サイトに表示している政治資金収支データは、動作確認のために用意したデモ用のダミーデータです。実在する政治団体の収支ではありません。
          </p>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 font-japanese">
            免責事項
          </h3>
          <p className="text-[11px] sm:text-[15px] leading-[1.82] sm:leading-[1.87] tracking-[0.01em] text-gray-500 sm:text-gray-800 font-medium sm:font-normal font-japanese">
            本サイトで公開するデータは、可能な限り正確かつ最新の情報を反映するよう努めていますが、現時点においてはその正確性・完全性・即時性について保証するものではありません。今後は、これらの側面について一層踏み込んだ公開を目指してまいります。最終的な収支は、別途公開される「政治資金収支報告書」並びに「選挙運動費用収支報告書」をご確認ください。
          </p>
        </div>
      </div>
    </MainColumnCard>
  );
}
