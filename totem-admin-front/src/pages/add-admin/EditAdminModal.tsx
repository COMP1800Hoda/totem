/**
 * This component is a modal for editing admin profiles.
 * It allows the admin to update the name, email, and role of an existing admin.
 *
 */
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getToken } from '../../utils/tokenUtils.js';
interface EditAdminModalProps {
  show: boolean;
  onClose: () => void;
  admin: { id: string; name: string; email: string; role: string };
  onAdminUpdated: () => void;
}

const EditAdminModal: React.FC<EditAdminModalProps> = ({
  show,
  onClose,
  admin,
  onAdminUpdated, // refresh the admin table
}) => {
  const [editedAdmin, setEditedAdmin] = useState({ ...admin });

  /**
   * This effect is used to set the initial state of the editedAdmin when the admin prop changes.
   * It ensures that the Edit Admin Modal displays the correct information when opened.
   * The useEffect hook is triggered whenever the admin prop changes, updating the editedAdmin state accordingly.
   */
  useEffect(() => {
    setEditedAdmin({ ...admin });
  }, [admin]);

  console.log('editedAdmin in editModal.tsx:', editedAdmin.name);
  const token = getToken(); // Get the token from local storage
  const handleEditAdmin = async () => {
    try {
      const response = await fetch(`http://localhost:8080/manage-admins`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editedAdmin.name,
          email: editedAdmin.email,
          role: editedAdmin.role,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update admin');
      }
      onAdminUpdated(); // refresh the admin table
      onClose();
    } catch (error) {
      console.log('Error updating admin: ', error);
    }
  };

  return (
    <Modal centered show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Admin Profile</Modal.Title>
      </Modal.Header>

      {/* The body of the modal contains a form for editing admin details */}
      <Modal.Body>
        <Form>
          <Form.Group controlId="formEditAdminName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={editedAdmin.name}
              onChange={(e) =>
                setEditedAdmin({ ...editedAdmin, name: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="formEditAdminEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={editedAdmin.email}
              onChange={(e) =>
                setEditedAdmin({ ...editedAdmin, email: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="formEditAdminRole">
            <Form.Label>Role</Form.Label>
            <Form.Select
              value={editedAdmin.role}
              onChange={(e) => {
                const newEditedAdmin = { ...editedAdmin, role: e.target.value };
                setEditedAdmin(newEditedAdmin);
                console.log('editedAdmin after role change:', newEditedAdmin);
              }}
            >
              <option value="Normal Admin">Normal Admin</option>
              <option value="Super Admin">Super Admin</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>

      {/* The footer of the modal contains the buttons for canceling or saving changes */}
      <Modal.Footer>
        <div className="d-flex gap-5 justify-content-center w-100">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditAdmin}>
            Save Changes
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default EditAdminModal;
