import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Parse from '../../database';
import 'bootstrap/dist/css/bootstrap.min.css';

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

  const handleEditAdmin = async () => {
    try {
      const query = new Parse.Query('Admin');
      const adminToUpdate = await query.get(admin.id);
      adminToUpdate.set('admin_name', editedAdmin.name);
      adminToUpdate.set('admin_email', editedAdmin.email);
      adminToUpdate.set('admin_role', editedAdmin.role);
      await adminToUpdate.save();
      onAdminUpdated();
      onClose();
    } catch (error) {
      console.log('Error updating admin: ', error);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Admin Profile</Modal.Title>
      </Modal.Header>

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
              onChange={(e) =>
                setEditedAdmin({ ...editedAdmin, role: e.target.value })
              }
            >
              <option value="Normal Admin">Normal Admin</option>
              <option value="Super Admin">Super Admin</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleEditAdmin}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditAdminModal;
