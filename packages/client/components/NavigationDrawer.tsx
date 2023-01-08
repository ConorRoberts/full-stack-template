import { Drawer } from "@conorroberts/beluga";
import { SignInIcon, SignOutIcon } from "./Icons";
import { useSession, signIn, signOut } from "next-auth/react";
import { FC } from "react";

interface Props {
  setOpen: (value: boolean) => void;
  open: boolean;
}

const NavigationDrawer: FC<Props> = ({ setOpen, open }) => {
  const { data: session } = useSession();

  return (
    <Drawer onOpenChange={() => setOpen(false)} open={open}>
      <div className="flex h-full flex-col">
        {!session && (
          <div onClick={() => signIn("google")} className="nav-drawer-button">
            <SignInIcon size={20} />
            <p>Sign In</p>
          </div>
        )}
        {session && (
          <div onClick={() => signOut()} className="nav-drawer-button">
            <SignOutIcon size={20} />
            <p>Sign Out</p>
          </div>
        )}
      </div>
    </Drawer>
  );
};

export default NavigationDrawer;
