import css from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  errorMessage: string;
}

export default function ErrorMessage({ errorMessage }: ErrorMessageProps) {
  return (
    <p className={css.text}>
      There was an error: {errorMessage}. <br /> Please try again...
    </p>
  );
}
