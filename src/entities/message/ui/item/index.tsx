import { FC, useEffect, useState } from "react";
import s from "./MessageItem.module.scss";
import { clsx } from "clsx";

export type MessageItemData = {
  author?: "self" | "bot",
  text: string;
  id?: string;
}

type Props = MessageItemData

export const MessageItem: FC<Props> = (props) => {
  const {
    author = "self",
    text,
  } = props;

  const [animatedText, setAnimatedText] = useState(author === "bot" ? "" : text);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (author !== "bot") return;

    if (currentIndex < text.length) {
      const typeWritingFunc = setTimeout(() => {
        setAnimatedText(p => p + text[currentIndex]);
        setCurrentIndex(p => p + 1);
      }, 20);

      return () => clearInterval(typeWritingFunc);
    }
  }, [text, currentIndex]);

  if (!text)
    return null;

  return (
    <div className={clsx(s.message__wrapper, s?.[`message__wrapper_${author}`])}>
      <span className={clsx(s.message__avatar, s?.[`message__avatar_${author}`])}>
        {
          author === "self" && "Я"
        }
        {
          author === "bot" &&
            <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.6154 13.9231H20.6539C20.6539 10.2019 17.6442 7.19232 13.9231 7.19232H12.9616V5.97117C13.254 5.80234 13.4968 5.5595 13.6656 5.26706C13.8344 4.97462 13.9232 4.6429 13.9231 4.30524C13.923 3.96759 13.834 3.63591 13.6651 3.34356C13.4961 3.05121 13.2532 2.80849 12.9607 2.63981C12.6682 2.47113 12.3364 2.38244 11.9988 2.38266C11.6611 2.38288 11.3295 2.47199 11.0372 2.64104C10.7449 2.8101 10.5023 3.05312 10.3337 3.34569C10.1652 3.63826 10.0766 3.97005 10.0769 4.30771C10.0769 5.01925 10.4616 5.64425 11.0385 5.97117V7.19232H10.0769C6.35579 7.19232 3.34617 10.2019 3.34617 13.9231H2.38463C1.85579 13.9231 1.4231 14.3558 1.4231 14.8846V17.7692C1.4231 18.2981 1.85579 18.7308 2.38463 18.7308H3.34617V19.6923C3.34617 20.2024 3.54878 20.6915 3.90943 21.0521C4.27008 21.4128 4.75922 21.6154 5.26925 21.6154H18.7308C19.7981 21.6154 20.6539 20.7596 20.6539 19.6923V18.7308H21.6154C22.1442 18.7308 22.5769 18.2981 22.5769 17.7692V14.8846C22.5769 14.3558 22.1442 13.9231 21.6154 13.9231ZM9.87502 16.3269C9.50002 15.4808 8.66348 14.8846 7.6731 14.8846C6.68271 14.8846 5.84617 15.4808 5.47117 16.3269C5.34617 16.0289 5.26925 15.7116 5.26925 15.3654C5.26925 14.7279 5.52251 14.1164 5.97332 13.6656C6.42413 13.2148 7.03556 12.9616 7.6731 12.9616C8.31063 12.9616 8.92206 13.2148 9.37287 13.6656C9.82368 14.1164 10.0769 14.7279 10.0769 15.3654C10.0769 15.7116 10 16.0289 9.87502 16.3269ZM18.5289 16.3269C18.1539 15.4808 17.2885 14.8846 16.3269 14.8846C15.3654 14.8846 14.5 15.4808 14.125 16.3269C14 16.0289 13.9231 15.7116 13.9231 15.3654C13.9231 14.7279 14.1764 14.1164 14.6272 13.6656C15.078 13.2148 15.6894 12.9616 16.3269 12.9616C16.9645 12.9616 17.5759 13.2148 18.0267 13.6656C18.4775 14.1164 18.7308 14.7279 18.7308 15.3654C18.7308 15.7116 18.6539 16.0289 18.5289 16.3269Z" fill="white" />
            </svg>
        }
      </span>
      <span className={clsx(s.message, s?.[`message__${author}`])}>
        {animatedText}
      </span>
    </div>
  );
};
