type ErrorMessageProps = {
  message: string | null;
};

export const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <div className="text-red-600 text-center">{message}</div>
);
