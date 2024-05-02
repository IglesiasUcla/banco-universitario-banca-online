import cnMerge from "../utils/classnamesMerge";

const inputClasses = {
  root: "group relative h-[25] border-2 rounded-lg border-[#a5a5a6]",
  label: "uppercase absolute left-2 top-1/2 z-0 -translate-y-1/2 bg-white px-1 text-sm text-[#a5a5a6] pointer-events-none duration-200 group-focus-within:top-0 group-focus-within:text-xs group-focus-within:text-primary",
  input: "z-10 h-full w-full px-3.5 py-4 outline-none rounded-lg"
};

const StyledArea = ({
  placeholder,
  helperText,
  leftElement = null,
  rightElement = null,
  error = false,
  rootClass = "",
  labelClass = "",
  inputClass = "",
  ...props
}) => {

  const errorClass = error && "border-red-500";
  const errorLabelClass = error && "text-red-500";

  return (
    <div className={cnMerge([inputClasses.root, rootClass, errorClass])}>
      <label
        className={cnMerge([inputClasses.label, labelClass, errorLabelClass, props.value && 'top-0 text-xs'])}
        htmlFor={props.id ?? props.name}
      >
        {placeholder}
      </label>
      <div>
        {leftElement && (
          <div className="absolute inset-y-0 left-0 pl-3 flex">
            {leftElement}
          </div>
        )}
        <textarea
          id={props.id ?? props.name}
          {...props}
          className={cnMerge([inputClasses.input, inputClass])}
        />
        {rightElement && (
          <div className="absolute inset-y-0 right-0 pr-3 flex">
            {rightElement}
          </div>
        )}
      </div>
      <div
        className="-bottom-6 absolute"
      >
        {error &&
          <p
            className="text-red-500 leading-4 text-xs text-justify pt-2"
          >
            {helperText}
          </p>
        }
      </div>
    </div>
  );
};

export default StyledArea;