import i18next from "i18next";
import { AppToaster, sendLog } from "../../components/AppToaster/toaster";
import { addTranslate } from "../http/admin/translate";

async function addToDatabase(key) {
  if (i18next.exists(key)) return;

  try {
    await addTranslate({
      name: key,
      translate_ru: key,
      translate_uz: key,
      translate_uzl: key,
    });
  } catch (e) {
    if (e?.response?.data?.error?.name !== "SequelizeUniqueConstraintError")
      return;

    const getRes = (lang) => i18next.getResourceBundle(lang, "translations");
    const uz_Cyrl = {
      [key]: key,
      ...getRes("uz_Cyrl"),
    };
    const uz_Latn = { [key]: key, ...getRes("uz_Latn") };
    const ru = { [key]: key, ...getRes("ru") };
    i18next.addResourceBundle("uz_Cyrl", "translations", uz_Cyrl);
    i18next.addResourceBundle("uz_Latn", "translations", uz_Latn);
    i18next.addResourceBundle("ru", "translations", ru);
  }
}

export function translateKey(key, params = null) {
  addToDatabase(key);

  return i18next.t(key, params);
}

export default translateKey;
