import "server-only";
import HeaderClient from "@/client/components/layout/header/HeaderClient";
import { loadOrganizations } from "@/server/contexts/public-finance/presentation/loaders/load-organizations";

export default async function Header() {
  const organizationsData = await loadOrganizations();

  return <HeaderClient organizations={organizationsData} />;
}
