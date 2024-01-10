import { cloneElement, forwardRef, useImperativeHandle, useState } from "react";
import Button from "./Button";
import PropTypes from "prop-types";

const Toggle = forwardRef(function Toggle(props, refs) {
  const [visibility, setVisibility] = useState(true);

  const hideWhenVisible = { display: visibility ? "none" : "" };
  const showWhenVisible = { display: visibility ? "" : "none" };

  const toggleVisibility = () => setVisibility(!visibility);

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div className="toggle flex col">
      <div className="open-toggle" style={showWhenVisible}>
        <Button
          name="toggle-button"
          label="Add Blog"
          onClick={toggleVisibility}
          type="button"
        />
      </div>
      <div className="close-toggle flex col" style={hideWhenVisible}>
        {cloneElement(props.children, { toggleVisibility })}
      </div>
    </div>
  );
});

Toggle.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Toggle;
