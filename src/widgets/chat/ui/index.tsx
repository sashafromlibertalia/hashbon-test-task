import { TextInput } from "~/features/send-message";
import { MessageItem, MessageItemData, sendMessageRequest } from "~/entities/message";
import { useCallback, useEffect, useRef, useState } from "react";
import { processJsonStringAsArray, SendMessageDto } from "~/shared";
import { nanoid } from "nanoid";

import s from "./Chat.module.scss";

export const ChatWidget = () => {
  const [data, setData] = useState<MessageItemData[]>([]);
  const chatContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chatContainer.current) return;

    chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
  }, [data, chatContainer]);

  const sendMessageToBot = useCallback(async (message: string) => {
    const dto: SendMessageDto = Object.freeze({
      message,
    });

    setData(p => p.concat({
      id: nanoid(),
      author: "self",
      text: message,
    }));

    const response = await sendMessageRequest(dto);

    const decoder = new TextDecoder();
    const reader = response?.body?.getReader();

    const botMessageId = nanoid();
    let botMessage = "";

    while (reader) {
      const { value, done } = await reader.read();

      if (done) {
        break;
      }

      const decodedChunk = decoder.decode(value, { stream: true });
      const processedText = processJsonStringAsArray(decodedChunk).map(t => t.value).join("");

      botMessage += processedText;
    }

    setData(p => p.concat({
      id: botMessageId,
      author: "bot",
      text: botMessage,
    }));
  }, [data]);

  return (
    <div className={s.chat}>
      <div className={s.chat__container} ref={chatContainer}>
        {
          data.length === 0 && <p className={s.chat__caption}>Начните беседу с ботом</p>
        }
        {
          data.map((m) => <MessageItem key={m.id} {...m} />)
        }
      </div>
      <TextInput onSend={sendMessageToBot} />
    </div>
  );
};
