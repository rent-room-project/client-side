export default defineEventHandler(async (event) => {
  const lodgingId = getRouterParam(event, "lodgingId");
  const access_token = event.headers.get("access_token");

  const { data } = await request({
    method: "POST",
    url: `/generate-midtrans-token/${lodgingId}`,
    headers: {
      access_token,
    },
  });

  return data;
});
