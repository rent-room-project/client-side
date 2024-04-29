export default defineEventHandler(async (event) => {
  const access_token = event.headers.get("access_token");

  const { data } = await request({
    method: "GET",
    url: "/bookmarks",
    headers: { access_token },
  });

  return data;
});
