import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useI18n } from "@/lib/i18n";

/**
 * Syncs the i18n language with the URL path.
 * Routes under /rw/ automatically switch to Kinyarwanda.
 */
const LanguageRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { setLang } = useI18n();

  useEffect(() => {
    if (location.pathname === "/rw" || location.pathname.startsWith("/rw/")) {
      setLang("rw");
    } else {
      setLang("en");
    }
  }, [location.pathname, setLang]);

  return <>{children}</>;
};

export default LanguageRoute;
