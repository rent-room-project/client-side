export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  const { data } = await request({
    method: "GET",
    url: `/lodgings/${id}`,
  });

  return data;
});
