import { SignIn, useClerk,  } from "@clerk/nextjs";

const Page = () => {
  const clerk  =useClerk();

  return (
    <div className="flex justify-center flex-1 items-center">
      <SignIn />
    </div>
  );
};

export default Page;
