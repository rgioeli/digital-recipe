import Layout from "../src/infrastructure/Layout";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "styled-components";
import { theme } from "../src/theme/theme";
import OpenNavContext from "../src/context/OpenNavContext";
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <OpenNavContext>
        <ThemeProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </OpenNavContext>
    </SessionProvider>
  );
}

export default MyApp;
