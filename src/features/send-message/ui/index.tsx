import s from "./TextInput.module.scss";
import { ChangeEvent, FC, TextareaHTMLAttributes, useCallback, useRef, useState } from "react";
import { clsx } from "clsx";

type Props = {
  onSend?: (data: string) => void;
} & TextareaHTMLAttributes<HTMLTextAreaElement>

export const TextInput: FC<Props> = (props) => {
  const {
    placeholder = "Start typing here...",
    className,
    onSend,
    ...rest
  } = props;
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [userMessage, setUserMessage] = useState("");

  const onMessageSubmit = useCallback(() => {
    onSend?.(userMessage);
    if (textareaRef.current) {
      textareaRef.current.value = "";
      textareaRef.current.style.height = "auto";
    }
  }, [userMessage, textareaRef.current]);

  const handleResizeOnInput = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    event.target.style.height = "auto";
    event.target.style.height = (event.target.scrollHeight) + "px";
  }, []);

  return (
    <span className={s.input__wrapper}>
      {/*
        Для соответствия макету можно было взять <div>,
        который будет иметь contentEditable='true', но
        текущее решение более корректно с точки зрения семантики
      */}
      <textarea
        {...rest}
        autoFocus
        aria-multiline="true"
        aria-placeholder={placeholder}
        className={clsx(s.input, className)}
        placeholder={placeholder}
        ref={textareaRef}
        role="textbox"
        rows={1}
        onChange={(e) => setUserMessage(e.target.value)}
        onInput={handleResizeOnInput} />
      <button className={s.input__button}
        type={"submit"}
        onClick={onMessageSubmit}>
        <svg fill="none" height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.875 9.59168L1.54169 0.425015C1.398 0.353154 1.2366 0.324361 1.07692 0.342103C0.917248 0.359845 0.766105 0.423365 0.641692 0.525015C0.522879 0.624593 0.434198 0.755338 0.385617 0.902552C0.337036 1.04977 0.330482 1.20761 0.366692 1.35835L2.57503 9.50002H12V11.1667H2.57503L0.333359 19.2833C0.299381 19.4092 0.295415 19.5413 0.321779 19.669C0.348144 19.7967 0.404103 19.9164 0.485158 20.0186C0.566213 20.1207 0.670102 20.2024 0.78847 20.257C0.906839 20.3117 1.03639 20.3379 1.16669 20.3333C1.29714 20.3326 1.42559 20.3012 1.54169 20.2417L19.875 11.075C20.0115 11.0051 20.1261 10.8988 20.2061 10.768C20.2861 10.6371 20.3284 10.4867 20.3284 10.3333C20.3284 10.18 20.2861 10.0296 20.2061 9.89872C20.1261 9.76786 20.0115 9.66161 19.875 9.59168Z" fill="white" />
        </svg>
      </button>
    </span>
  );
};
