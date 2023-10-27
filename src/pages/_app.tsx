import { ClerkProvider } from "@clerk/nextjs";
import type { AppProps } from "next/app";
import '../styles/global.css';
import Layout from "@/components/layout";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider  {...pageProps} afterSignInUrl='/' afterSignUpUrl='/' >
      <Layout>
      <Component {...pageProps} />
      </Layout>
    </ClerkProvider>
  );
}
export default MyApp;