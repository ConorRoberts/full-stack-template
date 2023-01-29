import type { FC } from "react";
import clsx from "clsx";

type Props = {
  className?: string;
};

const Logo: FC<Props> = ({ className }) => {
  return (
    <div className={clsx("relative", className)}>
      <h1>Logo</h1>
    </div>
  );
};

export default Logo;
