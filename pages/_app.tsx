import "antd/dist/antd.variable.min.css";
import "../styles/globals.css";

import { ConfigProvider, Layout } from "antd";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import NextNProgress from "nextjs-progressbar";
import React, { ReactElement, ReactNode } from "react";

import HeaderMenu from "../components/layout/header_menu";
import SiderMenu from "../components/layout/sider_menu";
import MyBreadcrum from "../components/reusable/breadcrumb";
import Logo from "../public/images/logo_color.png";
import { primaryColor } from "../utils/constant";
import { convertRoutePathToArray } from "../utils/function";

import type { AppProps } from "next/app";
import AdminLayout from "../components/layout/layout";
const { Content, Footer, Sider } = Layout;

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();

  /// Only get 3 first value from array
  const arrPathname = convertRoutePathToArray(router.pathname)
    .slice(0, 3)
    .map((val) => (val[0]?.toUpperCase() ?? "") + val.slice(1));

  ConfigProvider.config({
    theme: {
      primaryColor: primaryColor,
    },
  });

  const getLayout =
    Component.getLayout ?? ((page) => <AdminLayout>{page}</AdminLayout>);

  return getLayout(
    <>
      <Head>
        <title>{arrPathname.join(" - ")}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NextNProgress />

      <ConfigProvider>
        <Component {...pageProps} />
      </ConfigProvider>
    </>
  );
}
