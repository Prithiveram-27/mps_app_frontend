import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const CreateUserModal = ({ handleCloseAddUserModal, fetchData, isUserEdit, currentUser, handleUserEdit }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobilenumber, setMobilenumber] = useState('');
    const [is_admin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (isUserEdit && currentUser) {
            setUsername(currentUser.username);
            setEmail(currentUser.email);
            setMobilenumber(currentUser.mobilenumber);
            setIsAdmin(currentUser.is_admin);
        } else {
            setUsername('');
            setEmail('');
            setPassword('');
            setMobilenumber('');
            setIsAdmin(false);
        }
    }, [isUserEdit, currentUser]);

    const handleSave = async () => {
        try {
            const user = { username, email, password, mobilenumber, is_admin };
            if (isUserEdit) {
                await axios.put(`http://localhost:3000/api/v1/users/${currentUser.user_id}`, user);
            } else {
                await axios.post('http://localhost:3000/api/v1/users', user);
            }
            fetchData();
            handleCloseAddUserModal();
            handleUserEdit();
        } catch (error) {
            console.error("Error saving user:", error);
            
        }
    };

    return (
        <Modal show={true} onHide={handleCloseAddUserModal}>
            <Modal.Header closeButton>
                <Modal.Title>{isUserEdit ? 'Edit User' : 'Create User'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    {!isUserEdit && (
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                    )}
                    <Form.Group controlId="formMobilenumber">
                        <Form.Label>Mobile Number</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter mobile number"
                            value={mobilenumber}
                            onChange={(e) => setMobilenumber(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formIsAdmin">
                        <Form.Check
                            type="checkbox"
                            label="Admin"
                            checked={is_admin}
                            onChange={(e) => setIsAdmin(e.target.checked)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseAddUserModal}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateUserModal;
