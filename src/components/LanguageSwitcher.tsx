import { useTranslation } from "react-i18next";
import "./LanguageSwitcher.scss";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="language-switcher">
      <button
        onClick={() => changeLanguage("en")}
        className={i18n.language.startsWith("en") ? "is-active" : ""}
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage("pt")}
        className={i18n.language.startsWith("pt") ? "is-active" : ""}
      >
        PT
      </button>
    </div>
  );
};

export default LanguageSwitcher;
