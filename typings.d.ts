type User = {
  id: string;
  username: string;
  name: string;
  encrypted_password?: string;
  image: string;
  role: string;
};

type Market = {
  id: string;
  name: string;
  image: string;
  products: Product[];
};

type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
};

type Chat = {
  id: string;
  user1: User;
  user2: User;
  messages: Message[];
};

type Message = {
  id: string;
  user: User;
  text: string;
  timestamp: string;
};
