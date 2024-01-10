import PropTypes from "prop-types";

Error.propTypes = {
  message: PropTypes.object.isRequired,
};

export default function Error({ message }) {
  return (
    <div className="message-container">
      {message.error ? (
        <div className="error">
          <p>{message.error}</p>
        </div>
      ) : (
        <div className="success">
          <p>{message.success}</p>
        </div>
      )}
    </div>
  );
}
