import React from "react";
import "./Modal.scss"

interface IModal {
    show?: boolean;
    hide?: () => void;
}

const Modal: React.FC<IModal> = (props) => {
    return props.show ? (
        <>
            <div className="modal">
                {props.children}
            </div>
            <div className="overlay" onClick={props.hide}/>
        </>
    ) : null;
}

interface IConfirmationModal extends IModal {
    onConfirmation: () => void
    hide: () => void
}

export const ConfirmationModal: React.FC<IConfirmationModal> = (props) => {
    const onConfirmation = () => {
        props.onConfirmation();
        props.hide();
    }
    return (
        <Modal show={props.show} hide={props.hide}>
            <div className="modal_body">
                <p>Are you sure you want to continue?</p>
            </div>
            <div className="modal_footer">
                <button className="btn btn-submit" onClick={onConfirmation}>OK</button>
                <button className="btn" onClick={props.hide}>Close</button>
            </div>
        </Modal>
    );
}


export default Modal;
