import type { FC } from "react";
import clsx from "clsx";

type Props = {
  className?: string;
  textClassNames?: string;
  shadow?: boolean;
};

const Logo: FC<Props> = ({
  className,
  textClassNames = "text-5xl sm:text-6xl md:text-7xl",
  shadow = true,
}) => {
  return (
    <div className={clsx("relative", className)}>
      {shadow && (
        <div className="absolute inset-0 z-0 bg-white opacity-50 blur-[60px]"></div>
      )}
      <div className="z-5 relative inset-0 flex items-center justify-center overflow-hidden">
       <h1>Logo</h1>
      </div>
    </div>
  );
};

export default Logo;
