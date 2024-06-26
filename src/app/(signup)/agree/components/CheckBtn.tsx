export default function CheckBtn(props: React.ComponentProps<"input">) {
  const { ...restProps } = props;
  return (
    <div className="flex justify-center items-center">
      <label className="container">
        <input
          value="wedding-gift"
          className="peer cursor-pointer hidden after:opacity-100"
          defaultChecked={false}
          type="checkbox"
          {...restProps}
        />
        <span className=" rounded-full  inline-block w-5 h-5 border-2 relative cursor-pointer after:content-[''] after:absolute after:top-2/4 after:left-2/4 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[10px] after:h-[10px] after:bg-[#333] after:rounded-[100%] after:opacity-0 peer-checked:after:opacity-100"></span>
      </label>
    </div>
  );
}
