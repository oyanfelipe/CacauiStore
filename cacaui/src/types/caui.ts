export type Profile = {
  name: string;
  likesIntense: boolean;
  likesCreamy: boolean;
  visits: number;
};

export type Message = {
  sender: "user" | "caui";
  text: string;
};