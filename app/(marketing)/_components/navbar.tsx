import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Navbar = () => {
  return (
    <div
      className="fixed h-14 top-0 items-center 
  w-full px-4 border-b shadow-sm bg-white flex"
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
          <Button size={"sm"} variant={"outline"} asChild>
            <Link href="/sign-in">Login</Link>
          </Button>
          <Button size={"sm"} asChild>
            <Link href={"/sign-up"}>Get Taskify for Free</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
