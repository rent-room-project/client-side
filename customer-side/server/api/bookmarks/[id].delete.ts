export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const access_token = event.headers.get("access_token");

  const { data } = await request({
    method: "DELETE",
    url: `/bookmarks/${id}`,
    headers: { access_token },
  });

  return data;
});
