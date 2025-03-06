import React from 'react';
import './AdminHomePage.css';
import { useNavigate } from 'react-router-dom';

const AdminHomePage: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="admin-homepage">
            <h1 className='welcome-heading'>Welcome, admin!</h1>
            <div className='section'>
                <h2>Book Management</h2>
                <div className="menu-item">
                    <div className="menu-row">
                        <span>Manage Books</span>
                        <button

                            // onClick={() =>}
                            className="rightarrow"
                        >
                            <i className="fa fa-angle-right" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div className="menu-row">
                        <span>Add New Book</span>
                        <button

                            onClick={() => {
                                console.log('Button clicked');
                                navigate('/file-upload')
                            }}
                            className="rightarrow"
                        >
                            <i className="fa fa-angle-right" aria-hidden="true"></i>
                        </button>

                    </div>
                </div>

                <h2>User Management</h2>
                <div className="menu-item">
                    <div className="menu-row">
                        <span>Manage Users</span>
                        <button
                            // onClick={() =>}
                            className="rightarrow"
                        >
                            <i className="fa fa-angle-right" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div className="menu-row">
                        <span>Manage Admins</span>
                        <button
                            // onClick={() =>}
                            className="rightarrow"
                        >
                            <i className="fa fa-angle-right" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>


                <h2>Account Settings</h2>
                <div className="menu-item">
                    <div className="menu-row">
                        <span>Change Password</span>
                        <button
                            // onClick={() =>}
                            className="rightarrow"
                        >
                            <i className="fa fa-angle-right" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div className="menu-row">
                        <span>Log Out</span>
                        <button
                            // onClick={() =>}
                            className="rightarrow"
                        >
                            <i className="fa fa-angle-right" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminHomePage;