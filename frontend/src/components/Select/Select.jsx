import "./Select.scss";

const Select = ({ name, id, value, onChange, options }) => {
  return (
    <div className="select-container">
      <select name={name} id={id} value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
