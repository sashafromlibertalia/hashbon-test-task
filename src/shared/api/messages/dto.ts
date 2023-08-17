type ApiMessageChunk = {
  status: "content" | "done",
  value: string | null
};

type SendMessageDto = {
  message: string;
};

export type {
  ApiMessageChunk,
  SendMessageDto,
};
