import type { LinksFunction, MetaFunction } from "@remix-run/cloudflare";
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { rootAuthLoader } from "@clerk/remix/ssr.server";
import { ClerkApp, ClerkCatchBoundary } from "@clerk/remix";
import belugaStyles from "@conorroberts/beluga/dist/styles.css";
import tailwindPreflightStyles from "../styles/preflight.css";
import tailwindStyles from "~/styles/app.css";
import { useState } from "react";
import TopNavigation from "./components/TopNavigation";
import BottomNavigation from "./components/BottomNavigation";
import NavigationDrawer from "./components/NavigationDrawer";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: belugaStyles },
    { rel: "stylesheet", href: tailwindPreflightStyles },
    { rel: "stylesheet", href: tailwindStyles },
  ];
};

export const loader: LoaderFunction = (args) => rootAuthLoader(args);

export const CatchBoundary = ClerkCatchBoundary();

const App = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <div
          className={
            "relative flex min-h-screen flex-col bg-gray-100 px-2 pb-24 pt-2 text-black dark:bg-gray-900 dark:text-white md:pt-[70px] md:pb-2"
          }
        >
          <TopNavigation setDrawerOpen={setDrawerOpen} />
          <Outlet />
          {/* {loading ? <LoadingScreen /> : <Component {...pageProps} />} */}
          {drawerOpen && <NavigationDrawer setOpen={setDrawerOpen} open={drawerOpen} />}
          <BottomNavigation setDrawerOpen={setDrawerOpen} />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};

export default ClerkApp(App);

