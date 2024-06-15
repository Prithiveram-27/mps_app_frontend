import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const DeleteUserModal = ({ open, onClose, currentUser, getData }) => {
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3000/api/v1/users/${currentUser.user_id}`);
            getData();
            onClose();
        } catch (error) {
            console.error("Error deleting user:", error);
            // Handle error accordingly
        }
    };

    return (
        <Modal show={open} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete user {currentUser.username}?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteUserModal;
