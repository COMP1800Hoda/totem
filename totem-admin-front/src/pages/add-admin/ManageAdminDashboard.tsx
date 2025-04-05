import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Modal } from 'react-bootstrap';
import Parse from '../../database';
import AddAdminModal from './AddAdminModal';
import EditAdminModal from './EditAdminModal';
import { Header } from '../../components/header/Header';
import { Container } from '../../components/Container.tsx';
import { useNavigate } from 'react-router-dom';
import { checkTokenAndRedirect, getToken } from '../../utils/tokenUtils.js';

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
  const [error, setError] = useState<string | null>(null);
  const [isCheckingToken, setIsCheckingToken] = useState(true); // prevent rendering before token check

  useEffect(() => {
    const checkToken = async () => {
      checkTokenAndRedirect();
      setIsCheckingToken(false); // Set to false after token check
    };
    checkToken();
  }, []);

  useEffect(() => {
    if (isCheckingToken) return; // Prevent rendering until token check is complete
    fetchAdmins();
  }, [isCheckingToken]); // Ensure useEffect runs only on mount

  const token = getToken(); // Get the token from local storage
  const fetchAdmins = async () => {
    try {
      const response = await fetch('http://localhost:8080/manage-admins', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch admins');
      const adminList = await response.json();
      setAdmins(adminList);
    } catch (error: unknown) {
      console.error('Error fetching admins: ', error);
      setError(error instanceof Error ? error.message : 'Unknown error');
    }
  };

  //Check if the token is being checked or if there is an error
  if (isCheckingToken) return null; // Prevent rendering UI until token check is complete
  if (error) navigate('/'); // Redirect to login if there's an error

  const handleDelete = async () => {
    if (!adminToDelete) return;
    try {
      const response = await fetch(
        `http://localhost:8080/manage-admins/${adminToDelete}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error('Failed to delete admin');
      setAdmins(admins.filter((admin) => admin.id !== adminToDelete));
    } catch (error: unknown) {
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
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '4rem',
            marginBottom: '1rem',
          }}
        >
          <h2 className="mt-2">Admin Dashboard</h2>
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
                  {/* Edit Button */}
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => {
                      setSelectedAdmin(admin);
                      console.log('Selected Admin:', admin.name);
                      setShowEditModal(true);
                    }}
                  >
                    EDIT
                  </Button>
                </td>
                <td>
                  {/* Delete Button */}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      setAdminToDelete(admin.id);
                      console.log('Selected Admin:', admin.name);
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
          onAdminAdded={fetchAdmins} // pass as param to refresh the admin table
        />
        {selectedAdmin && (
          <>
            {console.log('Edit Modal Rendered with:', selectedAdmin)}
            <EditAdminModal
              show={showEditModal}
              onClose={() => setShowEditModal(false)}
              admin={selectedAdmin} // pass the selected admin to the modal
              onAdminUpdated={fetchAdmins} // pass as param to refresh the admin table
            />
          </>
        )}

        {/* Confirm Modal */}
        <Modal
          centered
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
