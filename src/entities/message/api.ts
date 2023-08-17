import { ENV, SendMessageDto } from "~/shared";

const sendMessageRequest = (dto: SendMessageDto) => {
  try {
    return fetch(`${ENV.API_URL}chat/send-message`, {
      method: "POST",
      body: JSON.stringify(dto),
      headers: {
        "Accept": "text/event-stream",
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    // Обработать ошибку, отправив ее в Sentry
    console.error(e);
  }
};

export {
  sendMessageRequest,
};
