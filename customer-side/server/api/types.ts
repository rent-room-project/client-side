import { Type } from "~/utils/Type";

export default defineEventHandler(async (event) => {
  const { data } = await request({
    method: "GET",
    url: "/types",
  });

  return data as Type[];
});
