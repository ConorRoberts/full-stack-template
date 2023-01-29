import { Link } from "@remix-run/react";
import type { FC } from "react";

interface Props {
  href: string;
  text: string;
}

const TopNavigationLink: FC<Props> = ({ href, text }: Props) => {
  return (
    <Link to={href} className="big-screen-nav-button">
      {text}
    </Link>
  );
};

export default TopNavigationLink;
