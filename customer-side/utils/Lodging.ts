export type Lodging = {
  id: string;
  name: string;
  facility: string;
  roomCapacity: number;
  imgUrl: string;
  location: string;
  price: number;
  Type: {
    id: string;
    name: string;
  };
  Author: {
    id: string;
    username: string;
    email: string;
    role: string;
    phoneNumber?: string;
    address?: string;
  };
};
