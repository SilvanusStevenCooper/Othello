import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import MobileSidebar from "./mobile-sidebar";
import FormPopover from "@/components/form/form-popover";

const Navbar = () => {
  return (
    <nav
      className="
  fixed z-50 w-full top-0 h-14 px-4 border-b shadow-sm
  bg-white flex items-center 
  "
    >
      <MobileSidebar />
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex">
          <Logo />
        </div>
        <FormPopover align="start" side="bottom" sideOffset={18}>
          <Button
            size={"sm"}
            className="rounded-md hidden md:block h-auto py-1.5 px-2"
            variant={"primary"}
          >
            Create
          </Button>
        </FormPopover>

        <FormPopover>
          <Button
            size={"sm"}
            className="rounded-md block md:hidden"
            variant={"primary"}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </FormPopover>
      </div>
      <div className="ml-auto flex items-center gap-x-2">
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl={"/organization/:id"}
          afterSelectOrganizationUrl={"/organization/:id"}
          afterLeaveOrganizationUrl="/select-org"
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
            },
          }}
        />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: {
                height: "30",
                width: "30",
              },
            },
          }}
        />
      </div>
    </nav>
  );
};

export default Navbar;
