export default defineEventHandler(async (event) => {
  let query = "?";

  const { typeId, page, perPage, search } = getQuery(event);

  if (typeId) {
    query += `typeId=${typeId}&`;
  }

  if (page) {
    query += `page=${page}&`;
  }

  if (perPage) {
    query += `perPage=${perPage}&`;
  }

  if (search) {
    query += `search=${search}`;
  }

  try {
    const { data } = await request({
      method: "GET",
      url: `/lodgings${query}`,
    });

    return data;
  } catch (error) {
    return error;
  }
});
