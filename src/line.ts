import type { Message } from "@line/bot-sdk";

const LINE_API_BASE_URL = "https://api.line.me";

export type ReplyRequest = {
  replyToken: string;
  messages: any[];
  accessToken: string;
};

export const reply = async (req: ReplyRequest) => {
  const url = `${LINE_API_BASE_URL}/v2/bot/message/reply`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${req.accessToken}`,
  };
  const body = JSON.stringify({
    replyToken: req.replyToken,
    messages: req.messages,
  });

  const res = await fetch(url, { method: "POST", headers, body });
  return await res.json();
};
