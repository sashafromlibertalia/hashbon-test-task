import s from "./Chat.module.scss";
import { TextInput } from "~/features/send-message";
import { MessageItem, MessageItemData } from "~/entities/message";
import { useCallback, useState } from "react";
import { ENV, processJsonStringAsArray, SendMessageDto } from "~/shared";
import { nanoid } from "nanoid";

export const ChatWidget = () => {
  const [data, setData] = useState<MessageItemData[]>([]);
  const [isResponding, setIsResponding] = useState(false);

  const sendMessageToBot = useCallback(async (message: string) => {
    try {
      const dto: SendMessageDto = Object.freeze({
        message,
      });

      setData(p => p.concat({
        id: nanoid(),
        author: "self",
        text: message,
      }));

      setIsResponding(true);

      const response = await fetch(`${ENV.API_URL}chat/send-message`, {
        method: "POST",
        body: JSON.stringify(dto),
        headers: {
          "Accept": "text/event-stream",
          "Content-Type": "application/json",
        },
      });

      const decoder = new TextDecoder();
      const reader = response.body?.getReader();

      const botMessageId = nanoid();
      let botMessage = "";

      while (reader) {
        const { value, done } = await reader.read();
        if (done) {
          setIsResponding(false);
          break;
        }

        const decodedChunk = decoder.decode(value, { stream: true });
        const processedText = processJsonStringAsArray(decodedChunk).map(t => t.value).join("");

        botMessage += processedText;
      }

      console.log(botMessage);

      setData(p => p.concat({
        id: botMessageId,
        author: "bot",
        text: botMessage,
      }));
    } catch (e) {
      // Обработать ошибку. Например, отправив ее в `Sentry`
      console.error(e);
    }
  }, [data]);

  return (
    <div className={s.chat}>
      <div className={s.chat__container}>
        {
          data.length === 0 && <p className={s.chat__caption}>Начните беседу с ботом</p>
        }
        {
          data.map((m) => <MessageItem key={m.id} {...m} />)
        }
        {
          isResponding && <p className={s.chat__caption}>Бот начинает отвечать</p>
        }
      </div>
      <TextInput onSend={sendMessageToBot} />
    </div>
  );
};
