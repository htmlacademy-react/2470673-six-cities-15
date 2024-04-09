import { UserData } from "./types";

export type UserConnect = UserData & {
    avatarUrl: string;
    isPro: boolean;
    name: string;
  };