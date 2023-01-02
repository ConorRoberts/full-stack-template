import { Inter } from "@next/font/google";
import "@conorroberts/beluga/dist/styles.css";
import "../styles/preflight.css";
import "../styles/globals.css";
import type { AppType } from "next/app";
import { useEffect, useState } from "react";
import { Router } from "next/router";
import NavigationDrawer from "~/components/NavigationDrawer";
import TopNavigation from "~/components/TopNavigation";
import BottomNavigation from "~/components/BottomNavigation";
import LoadingScreen from "~/components/LoadingScreen";
import { trpc } from "../utils/trpc";
import { Amplify } from "aws-amplify";
import amplifyConfig from "~/config/amplify";

const inter = Inter({ subsets: ["latin"] });

Amplify.configure(amplifyConfig);
const App: AppType = ({ Component, pageProps }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    // This is used to display a loading screen in transition
    // Helps for when we're fetching data from the server so the user has feedback in the meantime
    Router.events.on("routeChangeStart", () => {
      setDrawerOpen(false);
      setLoading(true);
    });
    Router.events.on("routeChangeComplete", () => {
      setLoading(false);
    });
  }, []);
  return (
    <>
      <style jsx global>
        {`
          html {
            font-family: ${inter.style.fontFamily};
          }
        `}
      </style>
      <div
        className={
          "relative flex min-h-screen flex-col bg-gray-100 px-2 pb-24 pt-2 text-black dark:bg-gray-900 dark:text-white md:pt-[70px] md:pb-2"
        }
      >
        <TopNavigation setDrawerOpen={setDrawerOpen} />
        {loading ? <LoadingScreen /> : <Component {...pageProps} />}
        {drawerOpen && <NavigationDrawer setOpen={setDrawerOpen} open={drawerOpen} />}
        <BottomNavigation setDrawerOpen={setDrawerOpen} />
      </div>
    </>
  );
};

export default trpc.withTRPC(App);

