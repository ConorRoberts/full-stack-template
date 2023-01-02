import { SignOutButton } from "@clerk/nextjs";
import { Button } from "@conorroberts/beluga";

const Page = () => {
  return (
    <SignOutButton>
      <Button>Sign out</Button>
    </SignOutButton>
  );
};

export default Page;
