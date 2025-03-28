import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Modal } from 'react-bootstrap';
import Parse from '../../database';
import AddAdminModal from './AddAdminModal';
import EditAdminModal from './EditAdminModal';
import { Header } from '../../components/header/Header';
import { Container } from '../../components/Container.tsx';
import { useNavigate } from 'react-router-dom';
import {
  checkTokenAndRedirect,
  getToken,
} from '../../components/utils/tokenUtils.js';

interface Admin {
  id: string;
  name: string;
  role: string;
  email: string;
}

const AdminProfile = () => {
  const navigate = useNavigate();
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState<string | null>(null);
  const [error, setError] = useState(null);
  const [isCheckingToken, setIsCheckingToken] = useState(true); // prevent rendering before token check

  useEffect(() => {
    const checkToken = async () => {
      await checkTokenAndRedirect();
      setIsCheckingToken(false); // Set to false after token check
    };
    checkToken();
  }, []);

  useEffect(() => {
    if (isCheckingToken) return; // Prevent rendering until token check is complete

    console.log('manage admin before');

    const token = getToken(); // Get the token from local storage

    fetch('http://localhost:8080/manage-admins', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch admins');
        }
        return response.json();
      })
      .catch((error) => {
        setError(error.message);
        console.log('Error:', error);
      });

    console.log('manage admin after');

    fetchAdmins();
  }, [isCheckingToken]); // Ensure useEffect runs only on mount

  const fetchAdmins = async () => {
    try {
      const query = new Parse.Query('Admin');
      const results = await query.find(); // fetch all the admins in db

      //map results into the state
      const adminList = results.map((admin: Parse.Object) => ({
        id: admin.id, // Store Parse Object ID
        name: admin.get('admin_name'),
        role: admin.get('admin_role'),
        email: admin.get('admin_email'),
      }));

      setAdmins(adminList);
    } catch (error) {
      console.error('Error fetching admins: ', error);
    }
  };

  // Prevent UI rendering if token is still being checked
  if (isCheckingToken) return null;
  if (error) return;

  const handleDelete = async () => {
    if (!adminToDelete) return;
    try {
      const query = new Parse.Query('Admin');
      const adminToRemove = await query.get(adminToDelete); // find the admin by id
      if (adminToDelete) {
        await adminToRemove.destroy();
        setAdmins(admins.filter((admin) => admin.id !== adminToDelete)); // Update state
      }
    } catch (error) {
      console.error('Error deleting admin: ', error);
    } finally {
      setShowConfirmModal(false);
      setAdminToDelete(null);
    }
  };

  return (
    <div className="container">
      <Header />
      <Container>
        {/* Table */}
        <div className="d-flex justify-content-between align-items-center mt-5 mb-3">
          <h2 className="m-0">Admin Dashboard</h2>
          <Button
            variant="primary"
            size="sm"
            style={{
              width: '110px',
              height: '40px',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={() => setShowAddModal(true)}
          >
            + Add Admin
          </Button>
        </div>
        <Table bordered hover responsive>
          <thead className="bg-light">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>EDIT</th>
              <th>DELETE</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id}>
                <td>{admin.name}</td>
                <td>{admin.email}</td>
                <td>{admin.role}</td>
                <td>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => {
                      setSelectedAdmin(admin), setShowEditModal(true);
                    }}
                  >
                    EDIT
                  </Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      setAdminToDelete(admin.id);
                      setShowConfirmModal(true);
                    }}
                  >
                    DELETE
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <AddAdminModal
          show={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAdminAdded={fetchAdmins}
        />
        {selectedAdmin && (
          <EditAdminModal
            show={showEditModal}
            onClose={() => setShowEditModal(false)}
            admin={selectedAdmin}
            onAdminUpdated={fetchAdmins}
          />
        )}

        {/* Confirm Modal */}
        <Modal
          show={showConfirmModal}
          onHide={() => setShowConfirmModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete Admin{' '}
            <strong>
              {admins.find((admin) => admin.id === adminToDelete)?.name ||
                'this admin'}
            </strong>
            ?
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex gap-5 justify-content-center w-100">
              <Button
                variant="secondary"
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default AdminProfile;
