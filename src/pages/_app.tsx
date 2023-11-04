import { ClerkProvider } from "@clerk/nextjs";
import type { AppProps } from "next/app";
import '../styles/global.css';
import Layout from "@/components/layout";
import DesignerContextProvider from "@/components/context/DesignerContext";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider  {...pageProps} afterSignInUrl='/' afterSignUpUrl='/' >
      <Layout>
        <DesignerContextProvider>
          <Component {...pageProps} />
        </DesignerContextProvider>
      </Layout>
    </ClerkProvider>
  );
}
export default MyApp;