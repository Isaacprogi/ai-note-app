import React, { useState, useEffect } from 'react';
import './modal.css';

interface Props {
    onClose: () => void;
    isOpen: boolean;
    children: React.ReactNode;
    isBackground?: boolean;
}

const Modal: React.FC<Props> = ({ isOpen, onClose, children, isBackground = true }) => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setShowModal(true);
        } else if (!isOpen && showModal) {
            setTimeout(() => {
                setShowModal(false);
            }, 300);
        }
    }, [isOpen]);

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return showModal ? (
        <div
            onClick={handleOverlayClick}
            className={`w-full h-full sm:flex sm:items-center p-2 sm:justify-center fixed inset-0 bg-opacity-[.7] overflow-y-auto ${isOpen ? (isBackground ? 'modal open' : '') : 'modal'} z-[99999999] top-0 right-0`}
        >
            <div className="relative overflow-auto">
                {children}
            </div>
        </div>

    ) : null;
}

export default Modal;
