import React, { useEffect, useState } from "react";
import "./select.css";
import PropTypes from "prop-types";

/**
 * Select UI component
 * @param {ElementType} children - The options to be displayed in the select.
 * @param {Object} style - Custom styles to be applied to the select container.
 * @param {string} value - The currently selected value.
 * @param {function} onChange - Callback function when the selection changes.
 * @param {boolean} disabled - Whether the select is disabled or not.
 * @param {string} size - Size variant of the select ("small", "medium", "large").
 */
export const Select = ({
  children,
  style,
  value,
  onChange,
  disabled,
  size,
  className,
  id,
  name,
}) => {
  const [options, setOptions] = useState([]);
  const [updateValue, setValue] = useState(value ? value : "");
  useEffect(() => {
    //changing whether there is array of children or single children and convert to array
    const optionsItems = children instanceof Array ? children : [children];
    //for displaying the Options
    const optionsProvided = optionsItems.map((el) => ({
      label: el?.props?.children,
      value: el?.props?.value,
    }));
    setOptions(optionsProvided);
  }, [children]);

  const valueHandler = (e) => {
    setValue(e);
    if (onChange) onChange(e);
  };

  const combinedStyle = {
    height: size === "large" ? "40px" : size === "small" ? "32px" : "36px",
    fontSize: size === "large" ? "18px" : size === "small" ? "14px" : "16px",
    ...style,
  };
  return (
    <select
      id={id}
      data-testid={id}
      name={name}
      disabled={disabled}
      className={`selectParentContainer ${className ? className : ""}`}
      style={combinedStyle}
      onChange={(e) => valueHandler(e.target.value)}
      value={updateValue}
    >
      {options?.map((el, i) => {
        return (
          <option
            className="option"
            style={{
              padding: "2px",
              backgroundColor: "rgba(10, 91, 153, 0.08)",
            }}
            key={i}
            id={i}
            value={el?.value}
          >
            {el?.label}
          </option>
        );
      })}
    </select>
  );
};

Select.propTypes = {
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  onChange: PropTypes.func,
  value: PropTypes.string,
  width: PropTypes.string,
};
