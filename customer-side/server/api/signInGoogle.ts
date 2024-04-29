export default defineEventHandler(async (event) => {
  const google_token = event.headers.get("google_token");

  const { data } = await request({
    method: "POST",
    url: "/google-login",
    headers: { google_token },
  });

  return data;
});
