import s from "./TextInput.module.scss";
import { FC, TextareaHTMLAttributes, useCallback } from "react";
import { clsx } from "clsx";

type Props = {
  onSend: (data: string) => void;
} & TextareaHTMLAttributes<HTMLTextAreaElement>

export const TextInput: FC<Props> = (props) => {
  const {
    placeholder = "Start typing here...",
    className,
    onSend,
    ...rest
  } = props;

  const onMessageSubmit = useCallback(() => {
    console.log(123);
  }, []);

  return (
    <span className={s.wrapper}>
      <textarea
        {...rest}
        autoFocus
        aria-multiline="true"
        aria-placeholder={placeholder}
        className={clsx(s.input, className)}
        placeholder={placeholder}
        role="textbox"
        rows={1} />
      <button type={"submit"}
        onClick={onMessageSubmit}>
        Отправить
      </button>
    </span>
  );
};
