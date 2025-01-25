import type { EventSource } from "@line/bot-sdk";

const getTypeAndId = (source: EventSource) => {
  const type = source.type;
  let id = "";
  if (type === "user") {
    id = source.userId;
  }
  if (type === "group") {
    id = source.groupId;
  }
  if (type === "room") {
    id = source.roomId;
  }
  return { type, id };
};

// NOTE: currently return as any because of the action type 'clipboard' is not supported by the type definition
export const createWhoamiMessage = (source: EventSource): any => {
  const { type, id } = getTypeAndId(source);

  return {
    type: "flex",
    altText: `your ${type} id: ${id}`,
    contents: {
      type: "bubble",
      size: "mega",
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: "Your User/Group ID",
            weight: "bold",
            color: "#1DB446",
            size: "sm",
          },
          {
            type: "box",
            layout: "horizontal",
            contents: [
              {
                type: "text",
                text: id,
                weight: "regular",
                size: "md",
                margin: "none",
                style: "normal",
                decoration: "none",
                align: "start",
                gravity: "center",
                wrap: true,
              },
            ],
            position: "relative",
            backgroundColor: "#ededed",
            cornerRadius: "sm",
            justifyContent: "center",
            alignItems: "flex-start",
            margin: "lg",
            spacing: "none",
            maxHeight: "64px",
            paddingAll: "lg",
          },
          {
            type: "text",
            text: `type: ${source.type}`,
            margin: "xs",
            size: "sm",
            color: "#696969",
            offsetStart: "xs",
          },
          {
            type: "separator",
            margin: "xxl",
          },
          {
            type: "box",
            layout: "horizontal",
            margin: "md",
            contents: [
              {
                type: "button",
                action: {
                  type: "clipboard",
                  label: "Copy",
                  clipboardText: id,
                },
                height: "sm",
                style: "primary",
              },
            ],
          },
        ],
      },
      styles: {
        footer: {
          separator: true,
        },
      },
    },
  };
};
