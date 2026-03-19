import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useI18n, Language } from "@/lib/i18n";

/**
 * Syncs the i18n language with the URL :lang param.
 * Wrap route elements with this to enable /rw/ prefix routing.
 */
const LanguageRoute = ({ children }: { children: React.ReactNode }) => {
  const { lang } = useParams<{ lang?: string }>();
  const { setLang } = useI18n();

  useEffect(() => {
    if (lang === "rw") {
      setLang("rw");
    } else {
      setLang("en");
    }
  }, [lang, setLang]);

  return <>{children}</>;
};

export default LanguageRoute;
