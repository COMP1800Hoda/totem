/**
 * Separte the add admin modal from the manage admin dashboard page
 * This component is used to add a new admin to the system.
 * It uses the Parse SDK to save the new admin's information to the database.
 * It also uses bcrypt to hash the password before saving it.
 */
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import { getToken } from '../../utils/tokenUtils.js';

interface AddAdminModalProps {
  show: boolean;
  onClose: () => void;
  onAdminAdded: () => void; // function to refresh the admin table
}
const AddAdminModal: React.FC<AddAdminModalProps> = ({
  show,
  onClose,
  onAdminAdded,
}) => {
  const [newAdmin, setNewAdmin] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Normal Admin',
  });
  const token = getToken();

  const handleAddAdmin = async () => {
    try {
      const response = await fetch(
        'https://adminfinaldeployment-9gry1pfp.b4a.run/manage-admins',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: newAdmin.email,
            password: newAdmin.password,
            name: newAdmin.name,
            role: newAdmin.role,
          }),
        }
      );
      setNewAdmin({ name: '', email: '', password: '', role: 'Normal Admin' });
      if (!response.ok) {
        throw new Error('Failed to add admin from AddAdminModal.tsx.');
      }
      onAdminAdded();
      onClose();
    } catch (error) {
      console.error('Error adding admin: ', error);
    }
  };

  return (
    <Modal centered show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Admin</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formAdminName" className="mb-4">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter admin name"
              value={newAdmin.name}
              onChange={(e) =>
                setNewAdmin({ ...newAdmin, name: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group controlId="formAdminEmail" className="mb-4">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter admin email"
              value={newAdmin.email}
              onChange={(e) =>
                setNewAdmin({ ...newAdmin, email: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group controlId="formAdminPassword" className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter admin password"
              value={newAdmin.password}
              onChange={(e) =>
                setNewAdmin({ ...newAdmin, password: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group controlId="formAdminRole" className="mb-2">
            <Form.Label>Role</Form.Label>
            <Form.Select
              value={newAdmin.role}
              onChange={(e) =>
                setNewAdmin({ ...newAdmin, role: e.target.value })
              }
            >
              <option value="Normal Admin">Normal Admin</option>
              <option value="Super Admin">Super Admin</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex gap-5 justify-content-center w-100">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddAdmin}>
            Add Admin
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default AddAdminModal;
