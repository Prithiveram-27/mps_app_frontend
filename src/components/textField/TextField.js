import React, { useEffect, useState } from "react";
import "./TextField.css";
import PropTypes from "prop-types";

export const TextField = ({
  type = "text",
  style,
  onChange,
  value,
  placeholder,
  disabled,
  size,
  icon,
  iconPosition,
  name,
  width = "340px",
  required,
  className,
  textFieldStyle,
  containerClass,
  id,
  label,
}) => {
  const [updateValue, setValue] = useState(value ? value : "");
  useEffect(() => {
    setValue(value);
  }, [value]);
  const combinedStyle = {
    width: width,
    height: size === "large" ? "40px" : size === "small" ? "32px" : "36px",
    flexDirection: iconPosition === "end" ? "row-reverse" : "",
    backgroundColor: disabled ? "#f9f9f9" : "#ffffff",
    ...style,
  };
  const valueHandler = (e) => {
    setValue(e.target.value);
    if (onChange) onChange(e);
  };
  return (
    <div>
      {label && (
        <p style={{ marginBottom: 0 }}>
          {label}{" "}
          {required && (
            <span style={{ color: "red", marginLeft: "2px" }}>*</span>
          )}{" "}
        </p>
      )}
      <div
        className={`textfieldParentContainer ${
          containerClass ? containerClass : ""
        }`}
        style={combinedStyle}
      >
        {icon && <div className="textfieldIcon">{icon}</div>}
        <input
          data-testid={id}
          id={id}
          type={type}
          onChange={(e) => valueHandler(e)}
          value={updateValue === undefined ? "" : updateValue}
          required={required}
          placeholder={placeholder}
          disabled={disabled}
          name={name}
          className={`textfield ${className ? className : ""}`}
          style={{
            fontSize:
              size === "large" ? "18px" : size === "small" ? "14px" : "16px",
            cursor: disabled ? "not-allowed" : "",
            ...textFieldStyle,
            color: "black",
          }}
        />
      </div>
    </div>
  );
};

TextField.propTypes = {
  /**
   * Variant of the textField.
   */
  // variant: PropTypes.string,
  /**
   * TextField disabled or not.
   */
  disabled: PropTypes.bool,
  /**
   * Icon to be display in textField.
   */
  icon: PropTypes.object,
  /**
   * Position of Icon.
   */
  iconPosition: PropTypes.oneOf(["start", "end"]),
  /**
   * How large should the textField be?
   */
  size: PropTypes.oneOf(["small", "medium", "large"]),
  /**
   * Optional change handler.
   */
  onChange: PropTypes.func,
  /**
   * Name of TextField.
   */
  name: PropTypes.string,
  /**
   * Width of the textField
   */
  width: PropTypes.string,
  required: PropTypes.bool,
};

TextField.defaultProps = {
  size: "medium",
};
