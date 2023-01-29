import { Link } from "@remix-run/react";
import { Drawer } from "@conorroberts/beluga";
import { SignInIcon, SignOutIcon } from "./Icons";
import { useUser } from "@clerk/remix";
import { FC } from "react";

interface Props {
  setOpen: (value: boolean) => void;
  open: boolean;
}

const NavigationDrawer: FC<Props> = ({ setOpen, open }) => {
  const { user } = useUser();

  return (
    <Drawer onOpenChange={() => setOpen(false)} open={open}>
      <div className="flex h-full flex-col">
        {!user && (
          <Link to="/auth/sign-in" className="nav-drawer-button">
            <SignInIcon size={20} />
            <p>Sign In</p>
          </Link>
        )}
        {user && (
          <Link to="/auth/sign-out" className="nav-drawer-button">
            <SignOutIcon size={20} />
            <p>Sign Out</p>
          </Link>
        )}
      </div>
    </Drawer>
  );
};

export default NavigationDrawer;
