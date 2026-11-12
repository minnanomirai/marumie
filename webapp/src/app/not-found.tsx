import "server-only";
import { redirect } from "next/navigation";
import LegalPageLayout, { Paragraph } from "@/client/components/layout/LegalPageLayout";
import { loadOrganizations } from "@/server/contexts/public-finance/presentation/loaders/load-organizations";

export default async function NotFound() {
  const { default: defaultSlug } = await loadOrganizations();

  if (defaultSlug) {
    redirect(`/o/${defaultSlug}`);
  }

  // 組織が 1 件もない場合は、ここでページを返す。
  // "/" も not-found になるため、"/" へリダイレクトすると無限ループになる。
  return (
    <LegalPageLayout title="準備中です">
      <Paragraph>政治資金のデータは、現在準備中です。公開まで、しばらくお待ちください。</Paragraph>
    </LegalPageLayout>
  );
}
