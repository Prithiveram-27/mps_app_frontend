import React from "react";
import PropTypes from "prop-types";

/**
 * display menuItem
 * @param {*} icon An icon element to be displayed before the menu item's content.
 * @param {*} iconPosition The position of the icon relative to the menu item's content. It can be set to "start" (before the content) or "end" (after the content).
 * @param {*} children The content to be displayed inside the menu item. It can be any valid React elements or components.
 * @param {*} onClick A function to be called when the menu item is clicked. It is typically used to handle click events on the menu item. The function will receive the value prop of the menu item as an argument.
 * @param {*} value The value associated with the menu item. It can be used to identify the selected menu item or pass additional data when the onClick event is triggered.
 */
export const MenuItem = ({
  icon,
  iconPosition,
  children,
  onClick,
  value,
  style,
  containerStyle,
  className,
  containerClass,
  id,
  name,
}) => {
  return (
    <div
      className={`menuItem ${containerClass ? containerClass : ""}`}
      style={{ ...containerStyle }}
    >
      {" "}
      <div
        id={id}
        data-testid={id}
        name={name}
        className={`menuItemChild ${className ? className : ""}`}
        onClick={() => onClick && onClick(value)}
        style={{
          flexDirection: iconPosition === "end" ? "row-reverse" : "",
          ...style,
        }}
      >
        {icon && <div className="menuIcon">{icon}</div>}
        {children}
      </div>
    </div>
  );
};

MenuItem.propTypes = {
  loading: PropTypes.bool,
  icon: PropTypes.object,
  iconPosition: PropTypes.oneOf(["start", "end"]),
  onClick: PropTypes.func,
};
