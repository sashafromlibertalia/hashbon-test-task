import { ApiMessageChunk } from "~/shared";

let memoizedSplitChunk: string = "";

const processJsonStringAsArray = (data: string): ApiMessageChunk[] => {
  try {
    const rawData = data.split("}{");

    const processedData = rawData.map((chunk, index) => {
      if (rawData.length - 1 === index) {
        if (chunk.endsWith("}") && !chunk.startsWith("{")) {
          return `{${chunk}`;
        }

        memoizedSplitChunk = chunk;
        return "{}";
      }

      if (!chunk.startsWith("{") && index === 0) {
        return `${memoizedSplitChunk.startsWith("{") ? "" : "{"}${memoizedSplitChunk + chunk}}`;
      }

      if (!chunk.startsWith("{") && !chunk.startsWith("}")) {
        return `{${chunk}}`;
      }

      if (!chunk.endsWith("}")) {
        return `${chunk}}`;
      }

      return chunk;
    });

    return processedData.map(i => JSON.parse(i)).flat();
  } catch (e) {
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
