import type { FC, PropsWithChildren } from "react";
import Head from "next/head";
import { APP_NAME } from "~/config/config";

interface Props {
  title: string;
  description?: string;
  image?: string;
}

/**
 * Component for giving metadata to a given page.
 */
const MetaData: FC<PropsWithChildren<Props>> = ({ title, description, image, ...props }) => {
  const formattedTitle = `${title} | ${APP_NAME}`;

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
      />
      <link rel="manifest" href="/manifest.json" />
      <link
        href="/icons/icon-16x16.png"
        rel="icon"
        type="image/png"
        sizes="16x16"
      />
      <link
        href="/icons/icon-32x32.png"
        rel="icon"
        type="image/png"
        sizes="32x32"
      />
      <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      <title>{formattedTitle}</title>
      <meta property="og:title" content={formattedTitle} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      {props?.children && props.children}
    </Head>
  );
};

export default MetaData;
