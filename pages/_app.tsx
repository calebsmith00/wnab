import type { AppProps } from "next/app";
import Navbar from "../components/Nav/Bar";
import "../styles/main.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
