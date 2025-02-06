import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const AllUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: users = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      return res.data;
    },
  });

  // Opening
  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Closing
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <div className="text-center p-6">Loading...</div>;
  if (error)
    return (
      <div className="text-center p-6 text-red-500">Error loading users</div>
    );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">All Users</h1>
      <input
        type="text"
        placeholder="Search by name or email..."
        className="w-full p-2 mb-4 border rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="p-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition relative cursor-pointer"
          >
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
            <p className="text-gray-500">{user.address.city}</p>
            <button
              className="bg-green-400 px-2 py-1 rounded-2xl cursor-pointer"
              onClick={() => openModal(user)}
            >
              Details
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center mx-6 items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">{selectedUser.name}</h2>
            <div>
              <p>
                <strong>Username:</strong> {selectedUser.username}
              </p>
              <p>
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedUser.phone}
              </p>
              <p>
                <strong>Website:</strong> {selectedUser.website}
              </p>
              <p>
                <strong>Address:</strong> {selectedUser.address.street},{" "}
                {selectedUser.address.suite}, {selectedUser.address.city},{" "}
                {selectedUser.address.zipcode}
              </p>
              <p>
                <strong>Geo Coordinates:</strong> Lat:{" "}
                {selectedUser.address.geo.lat}, Lng:{" "}
                {selectedUser.address.geo.lng}
              </p>
              <p>
                <strong>Company:</strong> {selectedUser.company.name}
              </p>
              <p>
                <strong>Catch Phrase:</strong>{" "}
                {selectedUser.company.catchPhrase}
              </p>
              <p>
                <strong>Business:</strong> {selectedUser.company.bs}
              </p>
            </div>
            <button
              className="mt-4 w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUser;
