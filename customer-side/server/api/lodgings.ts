import { Lodging } from "~/utils/Lodging";

export default defineEventHandler(async (event) => {
  const { data } = await request({
    method: "GET",
    url: "/lodgings",
  });

  return data as {
    lodgings: Lodging[];
    totalData: number;
    totalPage: number | null;
  };
});
