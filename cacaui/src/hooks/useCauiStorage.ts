import { useEffect } from "react";

export function useCauiStorage(
  profile: any,
  messages: any
) {
  useEffect(() => {
    localStorage.setItem(
      "cacaui-profile",
      JSON.stringify(profile)
    );
  }, [profile]);

  useEffect(() => {
    localStorage.setItem(
      "cacaui-messages",
      JSON.stringify(messages)
    );
  }, [messages]);
}