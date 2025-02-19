import { OrganizationList } from "@clerk/nextjs";

export default function createOrganizationPage() {
  return (
    <OrganizationList
      hidePersonal
      afterCreateOrganizationUrl={"/organization/:id"}
      afterSelectOrganizationUrl={"/organization/:id"}
    />
  );
}
