import "server-only";
import LegalPageLayout, {
  Paragraph,
  SubSectionTitle,
  List,
} from "@/client/components/layout/LegalPageLayout";

// みんなのみらいのプライバシーポリシー（minnanomirai.org と同じ内容）
export default function PrivacyPage() {
  return (
    <LegalPageLayout title="プライバシーポリシー">
      <div className="space-y-6">
        <Paragraph>
          みんなのみらいは、当会会員を含む当ホームページの利用者（以下、「利用者」といいます。）の個人情報を適切に取り扱い、保護することが重要であると認識しております。本プライバシーポリシーは、みんなのみらいが利用者から取得した個人情報の収集、使用、保護に関する方針を明示しています。利用者は、本プライバシーポリシーに同意することで、みんなのみらいが利用者の個人情報を取り扱う方法について同意するものとします。
        </Paragraph>

        <div>
          <SubSectionTitle>1. 収集される個人情報</SubSectionTitle>
          <Paragraph className="mb-3">
            みんなのみらいは、利用者の個人情報を正確かつ最新の状態に保ち、個人情報への不正アクセス・紛失・破損・改ざん・漏洩などを防止するため、セキュリティシステムの維持・管理体制の整備・職員教育の徹底等の必要な措置を講じ、安全対策を実施し個人情報の厳重な管理を行ないます。
          </Paragraph>
          <List
            items={[
              "お名前、連絡先情報（電話番号、メールアドレスなど）",
              "会社名、役職、所属部署などの職業関連情報",
              "ウェブサイトの利用履歴、Cookie、IPアドレスなどのオンライン情報",
            ]}
          />
        </div>

        <div>
          <SubSectionTitle>2. 個人情報の利用目的</SubSectionTitle>
          <Paragraph className="mb-3">
            利用者からお預かりした個人情報は、みんなのみらいからのご連絡や業務のご案内やご質問に対する回答として、電子メールや資料のご送付に利用いたします。
          </Paragraph>
          <List
            items={[
              "お問い合わせや要望への対応",
              "サービスの提供や契約の履行",
              "ニュースレターやプロモーション情報の提供",
              "ウェブサイトの改善やカスタマイズ",
              "法的要件や規制の遵守",
            ]}
          />
        </div>

        <div>
          <SubSectionTitle>3. 個人情報の第三者への提供</SubSectionTitle>
          <Paragraph>
            みんなのみらいは、利用者の個人情報を第三者に提供することはありません（本人同意や法的要件、規制に基づく場合を除く）。
          </Paragraph>
        </div>

        <div>
          <SubSectionTitle>4. 個人情報の保護とセキュリティ</SubSectionTitle>
          <Paragraph>
            みんなのみらいは、適切なセキュリティ対策を実施し、利用者の個人情報を保護するために合理的な措置を講じます。
          </Paragraph>
        </div>

        <div>
          <SubSectionTitle>5. Cookieの使用</SubSectionTitle>
          <Paragraph className="mb-3">
            みんなのみらいのウェブサイトでは、Cookieを使用する場合があります。Cookieは、ウェブサイトが利用者のブラウザに送信する小さなテキストファイルであり、利用者のコンピュータに一時的に保存されます。Cookieは、ウェブサイトの機能やパーソナライズされた体験を提供するために使用されます。
          </Paragraph>
          <Paragraph className="mb-3">
            みんなのみらいのウェブサイトでは、以下の目的でCookieを使用することがあります。
          </Paragraph>
          <List
            items={[
              "ウェブサイトのトラフィック解析や利用状況の測定",
              "ウェブサイトのカスタマイズやパーソナライズ",
              "オンライン広告の配信や効果測定",
            ]}
          />
          <Paragraph className="mt-3">
            利用者は、ブラウザの設定を変更することで、Cookieの受け入れを拒否することができます。ただし、Cookieを無効にすると、ウェブサイトの一部の機能が制限される可能性があります。
          </Paragraph>
        </div>

        <div>
          <SubSectionTitle>6. 個人情報の保持期間</SubSectionTitle>
          <Paragraph>
            みんなのみらいは、利用者の個人情報を必要な期間だけ保管し、利用目的を達成するために必要な範囲で保持します。個人情報が不要となった場合には、適切に破棄または匿名化します。
          </Paragraph>
        </div>

        <div>
          <SubSectionTitle>7. プライバシーポリシーの変更</SubSectionTitle>
          <Paragraph>
            みんなのみらいは、必要に応じて本プライバシーポリシーを変更することがあります。変更が行われた場合には、ウェブサイト上で通知いたします。本プライバシーポリシーの最新版は常にみんなのみらいのウェブサイト上でご確認いただけます。
          </Paragraph>
        </div>

        <div>
          <SubSectionTitle>8. お問い合わせ</SubSectionTitle>
          <Paragraph className="mb-3">
            ご不明な点や個人情報に関するお問い合わせがある場合は、以下の連絡先までお気軽にご連絡ください。
          </Paragraph>
          <Paragraph className="font-bold">みんなのみらい</Paragraph>
          <Paragraph>〒852-8123 長崎市三原１丁目７番１２号</Paragraph>
        </div>
      </div>
    </LegalPageLayout>
  );
}
