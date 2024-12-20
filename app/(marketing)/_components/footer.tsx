import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Footer = () => {
  return (
    <div
      className="fixed  bottom-0 
  w-full p-4 mt-4 border-t bg-slate-200"
    >
      <div
        className="md:max-w-screen-lg mx-auto flex 
        items-center w-full justify-between"
      >
        <Logo />
        <div
          className="space-x-4  md:w-auto flex 
        items-center justify-between w-full
        "
        >
          <Button size={"sm"} variant={"ghost"}>
            Privacy Policy
          </Button>
          <Button size={"sm"} variant={"ghost"}>
            Terms & Conditions
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
