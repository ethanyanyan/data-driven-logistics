import React from "react";
import Modal from "react-modal";
import "./BaseModal.css";

const customStyles = {
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

Modal.setAppElement("#root");

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
  children,
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
      ariaHideApp={true}
      style={{
        ...customStyles,
        content: { ...customStyles.content, ...dialogStyle },
      }}
    >
      <div className={`modal-header text-${headerAlign}`}>
        {children.header}
        {!hideXBtn && (
          <button className="close-btn" onClick={onRequestClose}>
            &times;
          </button>
        )}
      </div>
      <div className="modal-body">{children.body}</div>
      {children.buttons && (
        <div className={`modal-footer align-${buttonAlign}`}>
          {children.buttons}
        </div>
      )}
    </Modal>
  );
};

export default BaseModal;
