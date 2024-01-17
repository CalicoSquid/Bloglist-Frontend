import PropTypes from "prop-types";

Message.propTypes = {
  message: PropTypes.object.isRequired,
};

export default function Message({ message }) {
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
