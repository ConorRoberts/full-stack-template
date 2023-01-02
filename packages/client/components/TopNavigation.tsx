import Link from "next/link";
import { Menu } from "./Icons";
import Logo from "./Logo";

interface Props {
  setDrawerOpen: (open: boolean) => void;
}

const TopNavigation = ({ setDrawerOpen }: Props) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 hidden h-16 items-center justify-start gap-4 border-b border-gray-200 dark:border-b dark:border-gray-800 bg-gray-100 bg-opacity-90 px-6 backdrop-blur-sm backdrop-filter dark:bg-gray-900 dark:bg-opacity-90 md:flex">
      <div
        className="primary-hover cursor-pointer"
        onClick={() => setDrawerOpen(true)}
      >
        <Menu size={20} />
      </div>
      <Link
        passHref
        href="/"
        className="relative flex h-[calc(75px/2)] w-[calc(250px/2)] cursor-pointer items-center"
      >
        {/* <Image
          src="/images/text-logo.svg"
          fill={true}
          className="object-contain"
          alt="Logo"
          priority
          loading="eager"
        /> */}
        <Logo textClassNames="text-md" shadow={false}/>
      </Link>
    </div>
  );
};

export default TopNavigation;
