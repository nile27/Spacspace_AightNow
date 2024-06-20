import CheckIcon from "@/icons/CheckIcon";

type TCheckboxProps = {
  id: string;
  children?: React.ReactNode;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & React.ComponentProps<"input">;

function Checkbox(props: TCheckboxProps) {
  const { id, children, checked, onChange, ...restProps } = props;

  return (
    <div className="flex items-center">
      <div className="inline-flex items-center">
        <label className="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor={id}>
          <input
            type="checkbox"
            className="before:content[''] peer relative h-5 w-5  appearance-none rounded border before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-mainNavy-500 before:opacity-0 checked:border-mainNavy-500 checked:bg-mainNavy-500 checked:before:bg-mainNavy-500"
            id={id}
            onChange={onChange}
          />
          <span className="absolute text-white opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
            <CheckIcon />
          </span>
        </label>
        <label className="mt-px font-light text-gray-700 cursor-pointer select-none" htmlFor={id}>
          {children}
        </label>
      </div>
    </div>
  );
}

export default Checkbox;
