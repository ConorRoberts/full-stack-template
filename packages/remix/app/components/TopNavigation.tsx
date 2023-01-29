import { Link } from "@remix-run/react";
import { Menu } from "./Icons";
import Logo from "./Logo";
import { FC } from "react";
import DarkModeButton from "./DarkModeButton";

interface Props {
  setDrawerOpen: (open: boolean) => void;
}

const TopNavigation: FC<Props> = ({ setDrawerOpen }) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 hidden h-16 items-center justify-start gap-4 border-b border-gray-200 dark:border-b dark:border-gray-800 bg-gray-100 bg-opacity-90 px-6 backdrop-blur-sm backdrop-filter dark:bg-gray-900 dark:bg-opacity-90 md:flex">
      <div className="primary-hover cursor-pointer" onClick={() => setDrawerOpen(true)}>
        <Menu size={20} />
      </div>
      <Link to="/" className="flex items-center">
        <Logo />
      </Link>
      <div className="ml-auto">
        <DarkModeButton />
      </div>
    </div>
  );
};

export default TopNavigation;
