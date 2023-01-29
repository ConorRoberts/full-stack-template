import { Link } from "@remix-run/react";
import type { PropsWithChildren, FC } from "react";

interface Props {
  href: string;
}

const BottomNavigationLink: FC<PropsWithChildren<Props>> = ({ href, children }) => {
  return (
    <Link to={href} className="small-screen-nav-button">
      {children}
    </Link>
  );
};

export default BottomNavigationLink;
