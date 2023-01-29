import { SignIn } from "@clerk/remix";

const Page = () => {
  return (
    <div className="flex justify-center flex-1 items-center">
      <SignIn />
    </div>
  );
};

export default Page;
