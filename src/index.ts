import { Hono } from "hono";
import type { WebhookRequestBody } from "@line/bot-sdk";
import { createWhoamiMessage } from "./message-builder";
import { reply } from "./line";
import { createHmacSHA256 } from "./utils";

type Bindings = {
  LINE_MESSAGING_ACCESS_TOKEN: string;
  LINE_CHANNEL_SECRET: string;
  ENABLE_LINE_VERIFY_SIGNATURE: boolean;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", (c) => {
  return c.text("LINE Whoami Bot API");
});

app.post("/webhook", async (c) => {
  const body = await c.req.json<WebhookRequestBody>();

  // verify the request
  if (c.env.ENABLE_LINE_VERIFY_SIGNATURE) {
    const bodyString = JSON.stringify(body);
    const signature = c.req.header("x-line-signature");
    const hmac = await createHmacSHA256(c.env.LINE_CHANNEL_SECRET, bodyString);
    if (signature !== hmac) {
      return c.json({ error: "unauthorized: invalid signature" }, 401);
    }
  }

  // handle the events
  for (const event of body.events) {
    if (event.type !== "message") {
      continue;
    }
    if (!event.replyToken) {
      continue;
    }
    if (event.message.type !== "text") {
      continue;
    }
    const triggerTexts = ["whoami", "my id", "ไอดีของฉัน"];
    if (!triggerTexts.includes(event.message.text.toLowerCase())) {
      continue;
    }

    const message = createWhoamiMessage(event.source);
    await reply({
      replyToken: event.replyToken,
      messages: [message],
      accessToken: c.env.LINE_MESSAGING_ACCESS_TOKEN,
    });
  }

  return c.json({ status: "ok" });
});

export default app;
