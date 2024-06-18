import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import {Alert, Snackbar} from "@mui/material";

const CreateUserModal = ({ handleCloseAddUserModal, fetchData, isUserEdit, currentUser, handleUserEdit }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobilenumber, setMobilenumber] = useState('');
    const [is_admin, setIsAdmin] = useState(false);
    const [address, setAddress] = useState('');
    const [date_of_birth, setDateOfBirth] = useState('');
    const [marriage_date, setMarriageDate] = useState('');

    const [notification, setNotification] = useState(null);
    const [openNotification, setOpenNotification] = useState(false);
    const [notificationSeverity, setNotificationSeverity] = useState("");


    useEffect(() => {
        if (isUserEdit && currentUser) {
            setUsername(currentUser.username);
            setEmail(currentUser.email);
            setMobilenumber(currentUser.mobilenumber);
            setIsAdmin(currentUser.is_admin);
            setAddress(currentUser.address);
            setDateOfBirth(currentUser.date_of_birth);
            setMarriageDate(currentUser.marriage_date);
        } else {
            setUsername('');
            setEmail('');
            setPassword('');
            setMobilenumber('');
            setIsAdmin(false);
            setAddress('');
            setDateOfBirth('');
            setMarriageDate('');
        }
    }, [isUserEdit, currentUser]);

    useEffect(() => {
        if (currentUser?.date_of_birth) {
            const formattedDate = new Date(currentUser.date_of_birth).toISOString().split('T')[0];
            setDateOfBirth(formattedDate);
        }
        if (currentUser?.marriage_date) {
            const formattedDate = new Date(currentUser.marriage_date).toISOString().split('T')[0];
            setMarriageDate(formattedDate);
        }
    }, [currentUser]);

    const handleSave = async () => {
        try {
            const user = { username, email, password, mobilenumber, is_admin, address, date_of_birth, marriage_date};
            if (isUserEdit) {
                axios.put(`http://localhost:3000/api/v1/user/updateUserById/?id=${currentUser?.user_id}`, user)
                    .then(() => {
                        if (isUserEdit) {
                            handleUserEdit();
                        }
                        setOpenNotification(true);
                        setNotification("User edited successfully!");
                        setNotificationSeverity("success");
                        setTimeout(() => {
                            fetchData();
                            handleCloseAddUserModal();
                        }, 500);
                    })
                    .catch((error) => {
                        setOpenNotification(true);
                        setNotification(`${error.response.data.error}`);
                        setNotificationSeverity("error");
                    });
            } else {
                axios.post('http://localhost:3000/api/v1/user/createUser', user)
                    .then(() => {
                        if (isUserEdit) {
                            handleUserEdit();
                        }
                        setOpenNotification(true);
                        setNotification("User added successfully!");
                        setNotificationSeverity("success");
                        setTimeout(() => {
                            fetchData();
                            handleCloseAddUserModal();
                        }, 500);
                    })
                    .catch((error) => {
                        setOpenNotification(true);
                        setNotification(`${error.response.data.error}`);
                        setNotificationSeverity("error");
                    });
            }
        } catch (error) {
            console.error("Error saving user:", error);

        }
    };

    return (
        <>
        <Snackbar
            autoHideDuration={2000}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={openNotification}
            onClose={() => setOpenNotification(null)}
        >
            <Alert
                onClose={() => setOpenNotification(null)}
                severity={notificationSeverity}
                className={
                    notificationSeverity === "success"
                        ? "notificationSuccess"
                        : "notificationError"
                }
            >
                {notification}
            </Alert>
        </Snackbar>
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
                            required
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            required
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
                                required
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                    )}
                    <Form.Group controlId="formIsAdmin">
                        <Form.Check
                            type="checkbox"
                            label="Admin"
                            checked={is_admin}
                            onChange={(e) => setIsAdmin(e.target.checked)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formDateOfBirth">
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control
                            type="date"
                            required
                            placeholder="Enter Date of Birth"
                            value={date_of_birth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formMarriageDate">
                        <Form.Label>Marriage Date</Form.Label>
                        <Form.Control
                            type="date"
                            required
                            placeholder="Enter Marriage Date"
                            value={marriage_date}
                            onChange={(e) => setMarriageDate(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            required
                            placeholder="Enter Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formMobilenumber">
                        <Form.Label>Mobile Number</Form.Label>
                        <Form.Control
                            type="text"
                            required
                            placeholder="Enter mobile number"
                            value={mobilenumber}
                            onChange={(e) => setMobilenumber(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseAddUserModal}>
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    type="submit"
                    onClick={() => handleSave()}
                >Submit</Button>
            </Modal.Footer>
        </Modal>
        </>
    );
};

export default CreateUserModal;