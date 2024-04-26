export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { data } = await request({
    method: "POST",
    url: "/register",
    data: body,
  });

  return data;
});
