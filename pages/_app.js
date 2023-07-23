import "../styles.css";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Nextra({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  const router = useRouter();

  const isBrowser = typeof window !== "undefined";
  const [initialRouteTracked, setInitialRouteTracked] = useState(false);

  useEffect(() => {
    if (isBrowser && !initialRouteTracked) {
      const event = "pageview";
      const eventProperties = {
        source: "docs",
        path: router.asPath,
      };
      setInitialRouteTracked(true);
    }
  }, [router]);

  useEffect(() => {
    // Track page views
    const handleRouteChange = (path) => {
      const event = "pageview";
      const eventProperties = {
        source: "docs",
        path: path,
      };
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  return getLayout(<Component {...pageProps} />);
}
