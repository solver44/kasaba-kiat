import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { ToasterWithDrawer2 } from "../../components/AppToaster/toaster";
import { getAll } from "../http/admin/translate";

export function fetchLangResources() {
  return new Promise(async (resolve) => {
    let response;
    try {
      response = await getAll();
    } catch (error) {
      ToasterWithDrawer2({
        title: "Error while loading app",
        body: error?.response?.data,
      });
      return;
    }

    const uz_Cyrl = {};
    const uz_Latn = {};
    const ru = {};

    response?.data.map((item) => {
      uz_Cyrl[item.name] = item.translate_uz;
      // console.log(obj);
      uz_Latn[item.name] = item.translate_uzl;
      ru[item.name] = item.translate_ru;
      return null;
    });

    i18next.addResourceBundle("uz_Cyrl", "translations", uz_Cyrl);
    i18next.addResourceBundle("uz_Latn", "translations", uz_Latn);
    i18next.addResourceBundle("ru", "translations", ru);

    // await new Promise((res) => setTimeout(res, 1000));
    resolve(true);
  });
}

// fetchLangResources();

i18next.use(initReactI18next).init({
  defaultNS: "translations",
  fallbackLng: "uz_Cyrl",
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
