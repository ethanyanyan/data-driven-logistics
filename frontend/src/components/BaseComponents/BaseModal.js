// BaseModal.js
import React from "react";
import Modal from "react-modal";
import "./BaseModal.css";

const customStyles = {
  overlay: {
    zIndex: 9999,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    background: "none",
    padding: 0,
  },
};

if (process.env.NODE_ENV !== "test") Modal.setAppElement("#root");

const BaseModal = ({
  isOpen,
  onRequestClose,
  width = "500px",
  height = null,
  headerAlign = "center",
  buttonAlign = "center",
  bgTransparent = false,
  bgGrey = false,
  hideXBtn = false,
  style,
  header,
  body,
  buttons,
}) => {
  const dialogStyle = {
    width,
    height,
    borderRadius: "8px",
    background: bgTransparent ? "transparent" : bgGrey ? "#ececec" : "white",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    padding: "20px",
    ...style,
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: customStyles.overlay,
        content: {
          ...customStyles.content,
          ...dialogStyle,
        },
      }}
    >
      <div className={`modal-header text-${headerAlign}`}>
        {header}
        {!hideXBtn && (
          <button className="close-btn" onClick={onRequestClose}>
            &times;
          </button>
        )}
      </div>
      {body && <div className="modal-body">{body}</div>}
      {buttons && (
        <div className={`modal-footer align-${buttonAlign}`}>{buttons}</div>
      )}
    </Modal>
  );
};

export default BaseModal;
