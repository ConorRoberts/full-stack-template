import Link from "next/link";
import type { PropsWithChildren, FC } from "react";

interface Props {
  href: string;
}

const BottomNavigationLink: FC<PropsWithChildren<Props>> = ({
  href,
  children,
}) => {
  return (
    <Link href={href} passHref className="small-screen-nav-button">
      {children}
    </Link>
  );
};

export default BottomNavigationLink;
