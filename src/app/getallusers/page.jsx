"use client";

import { useState, useEffect } from "react";
import axios from "../utils/api";
import GetAllUsers from "../components/GetAllUsers";

export default function GetAllUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [alertModal, setAlertModal] = useState({
    show: false,
    type: "",
    text: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [formError, setFormError] = useState("");
  const [message, setMessage] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/users");
      setUsers(res.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openModal = (user) => {
    if (user) {
      setSelectedUser(user);
      setForm({ username: user.username, email: user.email, password: "" });
      setFormError("");
      setMessage("");
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setForm({ username: "", email: "", password: "" });
  };

  const openDeleteModal = (user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setUserToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    try {
      await axios.put(`/user/${selectedUser._id}`, form);
      setUsers(
        users.map((u) => (u._id === selectedUser._id ? { ...u, ...form } : u))
      );
      showAlert("success", "Update successful");
      setTimeout(closeModal, 1500);
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      setFormError(msg);
      showAlert("error", msg);
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/user/${id}`);
      setUsers(users.filter((user) => user._id !== id));
      closeDeleteModal();
    } catch (err) {
      alert(
        "Unable to delete user: " + (err.response?.data?.message || err.message)
      );
    }
  };

  const showAlert = (type, text) => {
    setAlertModal({ show: true, type, text });
  };

  useEffect(() => {
    if (alertModal.show) {
      setTimeout(() => {
        setAlertModal({ ...alertModal, show: false });
      }, 10000);
    }
  }, [alertModal]);

  if (loading || error) {
    return (
      <div>
        <GetAllUsers />
        <div className="min-h-screen flex items-center justify-center">
          <p
            className={`text-5xl font-bold ${
              error ? "text-red-500" : "text-white"
            }`}
          >
            {error ? `An error occurred.: ${error}` : "Loading user data..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <GetAllUsers />
      <div className="min-h-screen text-white p-4">
        <h1 className="text-5xl font-bold mb-6 text-center">All user data</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-6 py-3 text-left">ID</th>
                <th className="px-6 py-3 text-left">Username</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-gray-700 divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="px-6 py-4">{user._id}</td>
                  <td className="px-6 py-4">{user.username}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() => openModal(user)}
                      className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => openDeleteModal(user)}
                      className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/90 bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
              <h1 className="text-3xl font-bold mb-6 text-center text-black">
                Update User
              </h1>
              <form onSubmit={handleUpdateSubmit} className="space-y-4">
                <label className="flex items-center border-b border-black/70 text-black py-2">
                  <input
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="Username"
                    className="bg-transparent outline-none text-black placeholder-black/70 flex-1"
                  />
                </label>

                <label className="flex items-center border-b border-black/70 text-black py-2">
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="bg-transparent outline-none text-black placeholder-black/70 flex-1"
                  />
                </label>

                <label className="flex items-center border-b border-black/70 text-black py-2">
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Password (optional)"
                    className="bg-transparent outline-none text-black placeholder-black/70 flex-1"
                  />
                </label>

                <button
                  type="submit"
                  disabled={updateLoading}
                  className={`w-full py-2 rounded text-white ${
                    updateLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {updateLoading ? "Updating..." : "Update"}
                </button>
              </form>
              <button
                onClick={closeModal}
                className="mt-4 text-black underline text-sm block text-center"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {isDeleteModalOpen && (
          <div className="fixed inset-0 bg-black/90 bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-black">
              <h2 className="text-2xl font-bold mb-4 text-center">
                Confirm Delete
              </h2>
              <p className="mb-6 text-center">
                Are you sure you want to delete user{" "}
                <b>{userToDelete?.username}</b>?
              </p>
              <div className="flex justify-between">
                <button
                  onClick={() => handleDelete(userToDelete._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={closeDeleteModal}
                  className="text-gray-700 underline px-4 py-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {alertModal.show && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md text-center max-w-md w-full">
            <h2
              className={`text-xl font-bold mb-4 ${
                alertModal.type === "error" ? "text-red-600" : "text-green-600"
              }`}
            >
              {alertModal.type === "error" ? "Error" : "Success"}
            </h2>
            <p className="mb-4 text-black">{alertModal.text}</p>
            <button
              onClick={() => setAlertModal({ ...alertModal, show: false })}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
