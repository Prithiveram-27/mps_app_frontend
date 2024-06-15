import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ViewUserModal = ({ onClose, currentUser }) => {
    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>View User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><strong>Username:</strong> {currentUser.username}</p>
                <p><strong>Email:</strong> {currentUser.email}</p>
                <p><strong>Mobile Number:</strong> {currentUser.mobilenumber}</p>
                <p><strong>Admin:</strong> {currentUser.is_admin ? 'Yes' : 'No'}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ViewUserModal;
