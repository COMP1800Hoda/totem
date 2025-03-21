import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { InputGroup, Table, Form, Button, Modal } from 'react-bootstrap';
import Parse from '../../database';
import AddAdminModal from './AddAdminModal';
import EditAdminModal from './EditAdminModal';

interface Admin {
  id: string;
  name: string;
  role: string;
  email: string;
}

const AdminProfile = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);

  const fetchAdmins = async () => {
    try {
      const query = new Parse.Query('Admin');
      const results = await query.find(); // fetch all the admins in db

      //map results into the state
      const adminList = results.map((admin) => ({
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

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleDelete = async (adminId: string) => {
    try {
      const query = new Parse.Query('Admin');
      const adminToDelete = await query.get(adminId); // find the admin by id
      if (adminToDelete) {
        await adminToDelete.destroy();
        setAdmins(admins.filter((admin) => admin.id !== adminId)); // Update state
      }
    } catch (error) {
      console.error('Error deleting admin: ', error);
    }
  };

  return (
    <div className="container mt-4">
      {/* Table */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Admin Management Dashboard</h2>
        <Button
          variant="primary"
          size="sm"
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
                  onClick={() => handleDelete(admin.id)}
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
    </div>
  );
};

export default AdminProfile;
