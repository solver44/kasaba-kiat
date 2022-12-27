import { $authHost } from ".";

const URL = "api/logs/";

export const getAll = async () => {
  const response = await $authHost.get(URL);
  return response;
};
export const getOneById = async (id) => {
  const response = await $authHost.get(URL + id);
  return response;
};
export const getByOffset = async ({
  offset,
  limit,
  columns,
  searchText,
  trash = false,
}) => {
  const response = await $authHost.post(URL, {
    offset: offset,
    limit: limit,
    columns: columns,
    searchText: searchText,
    trash,
  });
  return response;
};

export const deleteLog = async (id) => {
  const response = await $authHost.delete(URL + id);
  return response;
};

export const addLog = async (data) => {
  const response = await $authHost.post(`${URL}add`, { data });
  return response;
};

export const updateLog = async (id, data) => {
  const response = await $authHost.put(URL + id, { data });
  return response;
};

export const sendLog = async (user_id, title, body) => {
  try {
    await addLog({
      user_id,
      title,
      body,
    });
  } catch (error) {
    // console.log(error.response.data.error);
  }
};
