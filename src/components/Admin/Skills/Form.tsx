import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { FormState, useFormContext } from 'react-hook-form';

const ErrorView = ({
  name,
  formState,
}: {
  name: string;
  formState: FormState<Any>;
}) => {
  return formState.touchedFields[name] && formState.errors[name] ? (
    <div className="error">{formState.errors[name].message || "Error"}</div>
  ) : null;
};

export const Input = ({
  label,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string; name: string }) => {
  const methods = useFormContext();

  return (
    <>
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <input
        {...methods.register(props.name)}
        {...props}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
      ></input>
      <ErrorView name={props.name} formState={methods.formState} />
    </>
  );
};

export const TextArea = ({
  label,
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  name: string;
}) => {
  const methods = useFormContext();

  return (
    <>
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <textarea
        {...methods.register(props.name)}
        {...props}
        className={
          "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline " +
          className
        }
      ></textarea>
      <ErrorView name={props.name} formState={methods.formState} />
    </>
  );
};
