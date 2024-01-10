import PropTypes from "prop-types";

Button.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  type: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default function Button({ name, label, onClick, type, loading }) {

  return (
    <button
      disabled={loading || false}
      type={type}
      className={name}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
