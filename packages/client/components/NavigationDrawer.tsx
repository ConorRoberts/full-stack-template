import Link from "next/link";
import { Drawer } from "@conorroberts/beluga";
import { SignInIcon, SignOutIcon } from "./Icons";

interface Props {
  setOpen: (value: boolean) => void;
  open: boolean;
}

const NavigationDrawer = ({ setOpen, open }: Props) => {

  const user = false;

  return (
    <Drawer onOpenChange={() => setOpen(false)} open={open}>
      <div className="flex h-full flex-col">
        {!user && (
          <div className="nav-drawer-button" >
            <SignInIcon size={20} />
            <p>Sign In</p>
          </div>
        )}
        {user && (
          <Link href="/api/auth/signout">
            <div className="nav-drawer-button">
              <SignOutIcon size={20} />
              <p>Sign Out</p>
            </div>
          </Link>
        )}
      </div>
    </Drawer>
  );
};

export default NavigationDrawer;
