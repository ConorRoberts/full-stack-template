import { SignIn } from "@clerk/nextjs";

const Page = () => {
  return (
    <div className="flex justify-center flex-1 items-center">
      <SignIn />
    </div>
  );
};

export default Page;
