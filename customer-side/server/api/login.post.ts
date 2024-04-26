export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { data } = await request({
    method: "POST",
    url: "/login",
    data: body,
  });

  return data;
});
