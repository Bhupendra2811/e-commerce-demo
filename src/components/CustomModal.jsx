import React from 'react';
import Modal from 'react-modal';


const customStyles = {
    content: {
        width: '600px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: 'white',
        padding: '20px',
        borderRadius: '8px',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: '1000',
    },
};

const CustomModal = ({ isOpen, onRequestClose, children }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles} // Use the style prop here
            contentLabel="Modal"
            ariaHideApp={false} // To prevent warnings about appElement not being defined
        >
            {children}
        </Modal>
    );
};

export default CustomModal;


