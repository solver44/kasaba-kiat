import translateKey from "../services/localization/translateText";

export const GET_ERRORS = (error) => {
  switch (error) {
    case "user_not_found":
      return "Фойдаланувчи ёки махфий сўз хато киритилган";
    case "wrong_password_specified":
      return "Фойдаланувчи ёки махфий сўз хато киритилган";
    case "there_is_something_wrong_with_the_account":
      return "Ҳисобда носозлик мавжуд. Тизим администраторига мурожаат етинг.";
    case "user_is_already_exists":
      return translateKey("user_is_already_exists");
    case "No access":
      return translateKey("no_access");
    case "Unauthorized":
      return translateKey("unauthorized");
    default:
      return null;
  }
};
