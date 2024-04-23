import type { Author } from "./Author";
import type { Type } from "./Type";

export type Lodging = {
  id: string;
  name: string;
  facility: string;
  roomCapacity: number;
  imgUrl: string;
  location: string;
  price: number;
  Type: Type;
  Author: Author;
};
