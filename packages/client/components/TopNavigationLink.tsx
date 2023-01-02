import Link from "next/link";
import type { FC } from "react";

interface Props {
  href: string;
  text: string;
}

const TopNavigationLink: FC<Props> = ({ href, text }: Props) => {
  return (
    <Link href={href} passHref className="big-screen-nav-button">
      {text}
    </Link>
  );
};

export default TopNavigationLink;
