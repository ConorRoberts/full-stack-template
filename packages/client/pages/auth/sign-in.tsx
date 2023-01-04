import { SignIn, useClerk,  } from "@clerk/nextjs";
import Link from "next/link";

const Page = () => {
  const clerk  =useClerk();

  return (
    <div className="flex justify-center flex-1 items-center">
      <Link href="/api/auth/login">
        Login
      </Link>
    </div>
  );
};

export default Page;
