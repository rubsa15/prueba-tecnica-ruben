interface Props {
  id: string;
  name: string;
  options: { key: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}

export const Dropdown: React.FC<Props> = ({
  id,
  name,
  options,
  value,
  onChange,
}) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <select
      id={id}
      name={name}
      className='block border border-[#2E344D] rounded-[12px] py-1.5 px-4 w-full'
      value={value}
      onChange={handleSelectChange}
    >
      {options.map((option) => (
        <option value={option.key} key={option.key}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
