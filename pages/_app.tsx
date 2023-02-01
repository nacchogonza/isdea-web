import "../styles/globals.css";
import "../styles/index.css";
import App from "next/app";
import Head from "next/head";
import { createContext } from "react";
import { fetchAPI } from "../lib/api";
import type { AppProps } from "next/app";

import Menu from "../components/Menu";
import Footer from "../components/Footer";


export const GlobalContext = createContext({});

const MyApp = ({ Component, pageProps } : AppProps) => {
  const { menuGlobal, footerGlobal } = pageProps;
  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href={"/favicon.ico"}
        />
      </Head>
      <GlobalContext.Provider value={menuGlobal.attributes}>
        <Menu menuItems={menuGlobal.attributes.content} image={menuGlobal.attributes.logo}/>
        <Component {...pageProps} />
        <Footer footerData={footerGlobal.attributes} image={footerGlobal.attributes.logo}/>
      </GlobalContext.Provider>
    </>
  );
};

MyApp.getInitialProps = async (ctx : any) => {
  const appProps = await App.getInitialProps(ctx);
  const menuRes = await fetchAPI("/menu", {
    populate: {
      logo: '*',
      content: {
        populate: '*'
      }
    },
  });
  const footRes = await fetchAPI("/footer", {
    populate: "*",
  });
  // Pass the data to our page via props
  return { ...appProps, pageProps: { menuGlobal: menuRes.data, footerGlobal: footRes.data } };
};

export default MyApp;
