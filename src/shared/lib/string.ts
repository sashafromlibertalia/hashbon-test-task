import { ApiMessageChunk } from "~/shared";

const processJsonStringAsArray = (data: string): ApiMessageChunk[] => {
  try {
    const processedData = data.replaceAll("}{", "},{");

    return JSON.parse(`[${processedData}]`);
  } catch (e) {
    // Данный блок будет отрабатывать тогда, когда в чанке придет некорректный JSON
    console.error(e);

    return [{
      status: "done",
      value: "Увы, произошла ошибка при ответе на ваше сообщение",
    }];
  }
};

export {
  processJsonStringAsArray,
};
