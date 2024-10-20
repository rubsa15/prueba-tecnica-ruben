import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';
import { formErrors } from '../../constants/formErrors';

interface Props<T extends FieldValues> {
  id: string;
  name: Path<T>;
  label: string;
  value: number | undefined;
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  type?: string;
  formValidation?: object;
  percentage?: boolean;
}

export const Input = <T extends FieldValues>({
  id,
  name,
  label,
  value,
  type,
  formValidation,
  register,
  percentage,
  errors,
}: Props<T>) => {
  const percentageStyle = percentage ? 'pl-4 pr-8' : 'px-4';

  return (
    <div className='flex flex-col'>
      <label htmlFor={id} className='text-[#2E344D]'>
        {label}
      </label>
      <div className='relative w-full'>
        <input
          id={id}
          defaultValue={value}
          type={type}
          className={`border border-[#2E344D] rounded-[12px] py-1.5  ${percentageStyle} w-full`}
          {...register(name, formValidation)}
        />
        {percentage && (
          <span className='absolute right-4 top-1/2 -translate-y-1/2 text-[#2E344D]'>
            %
          </span>
        )}
      </div>
      {Object.keys(formErrors).map(
        (error) =>
          errors?.[name]?.type === error && (
            <span className='text-red-500' key={error}>
              {formErrors[error]}
            </span>
          )
      )}
    </div>
  );
};
