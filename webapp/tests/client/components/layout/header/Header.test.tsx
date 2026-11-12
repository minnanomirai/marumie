jest.mock("@/client/components/layout/header/HeaderClient", () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock("@/server/contexts/public-finance/presentation/loaders/load-organizations", () => ({
  loadOrganizations: jest.fn(),
}));

import Header from "@/client/components/layout/header/Header";
import { loadOrganizations } from "@/server/contexts/public-finance/presentation/loaders/load-organizations";

const loadOrganizationsMock = loadOrganizations as jest.Mock;

describe("Header", () => {
  it("政治団体の一覧をヘッダーに渡す", async () => {
    const organizations = { default: "minnanomirai", organizations: [] };
    loadOrganizationsMock.mockResolvedValue(organizations);

    const element = await Header();

    expect(element.props).toEqual({ organizations });
  });
});
