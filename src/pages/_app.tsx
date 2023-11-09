import { ClerkProvider } from "@clerk/nextjs";
import type { AppProps } from "next/app";
import "../styles/global.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "@/components/layout";
import DesignerContextProvider from "@/components/context/DesignerContext";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps} afterSignInUrl="/" afterSignUpUrl="/">
      <Layout>
        <DesignerContextProvider>
          <Component {...pageProps} />
          <ToastContainer
            position="bottom-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </DesignerContextProvider>
      </Layout>
    </ClerkProvider>
  );
}
export default MyApp;
