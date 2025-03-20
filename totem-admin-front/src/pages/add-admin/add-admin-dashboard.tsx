import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { InputGroup, Table, Form, Button } from 'react-bootstrap';
import Parse from '../../database';
import axios from 'axios';

interface Admin {
  name: string;
  role: string;
  email: string;
}

const AdminProfile = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const query = new Parse.Query('Admin');
        const results = await query.find(); // fetch all the admins in db

        //map results into the state
        const adminList = results.map((admin) => ({
          name: admin.get('admin_name'),
          role: admin.get('admin_role'),
          email: admin.get('admin_email'),
        }));

        setAdmins(adminList);
      } catch (error) {
        console.error('Error fetching admins: ', error);
      }
    };

    fetchAdmins();
  }, []);

  return (
    <div className="container mt-4">
      {/* Table */}
      <h2 className="mb-3">Admin Management Dashboard</h2>
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
            <tr key={admin.email}>
              <td>{admin.name}</td>
              <td>{admin.email}</td>
              <td>{admin.role}</td>
              <td>
                <Button variant="success" size="sm">
                  EDIT
                </Button>
              </td>
              <td>
                <Button variant="danger" size="sm">
                  DELETE
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminProfile;
