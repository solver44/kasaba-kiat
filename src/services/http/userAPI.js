import { $authHost, $host } from ".";
import jwt_decode from "jwt-decode";

const URL = "api/user/";

export const login = async (postData) => {
  const { data } = await $host.post(`${URL}login`, postData);
  return { token: data.token, data: jwt_decode(data.token) };
};

export const checkToken = async () => {
  const { data } = await $authHost.get(`${URL}auth`);
  return { token: data.token, data: jwt_decode(data.token) };
};

export const setLanguage = async (id, lang) => {
  const response = await $host.get(URL + "language/" + id, {
    params: {
      lang,
    },
  });
  return response;
};
