import React, { useEffect, useState } from "react";

const UsersList = () => {
  const [allusers, setAllUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalUser, setModalUser] = useState(null);
  const [confirmName, setConfirmName] = useState("");
  const [confirmId, setConfirmId] = useState("");
  const [deleteError, setDeleteError] = useState("");

  const fetchInfo = async () => {
    await fetch("http://localhost:4000/allusers")
      .then((resp) => resp.json())
      .then((data) => setAllUsers(data.sort((a, b) => a.id - b.id)));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const openDeleteModal = (user) => {
    setModalUser(user);
    setConfirmName("");
    setConfirmId("");
    setDeleteError("");
    setShowModal(true);
  };

  const closeDeleteModal = () => {
    setShowModal(false);
    setModalUser(null);
    setDeleteError("");
  };

  const handleDeleteConfirm = async () => {
    if (
      confirmName.trim() !== modalUser.name.trim() ||
      String(confirmId).trim() !== String(modalUser.id).trim()
    ) {
      setDeleteError("Name and ID must match the user exactly.");
      return;
    }
    await fetch("http://localhost:4000/removeUser", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: modalUser.id }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.success) {
          alert(`User with the id of ${modalUser.id} has been deleted`);
          closeDeleteModal();
          fetchInfo();
        } else {
          setDeleteError("Deletion failed");
        }
      });
  };

  return (
    <div className="fixed inset-0 z-0 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 flex flex-col items-center justify-center pt-24 overflow-auto">
      <div className="w-full max-w-3xl bg-gradient-to-br from-gray-800 via-gray-900 to-blue-950 rounded-2xl shadow-2xl p-2 sm:p-6 md:p-8 border border-blue-700 max-h-[calc(100vh-7rem)] overflow-y-auto">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-white tracking-wide drop-shadow text-center">
          All Users
        </h1>
        <div className="hidden sm:grid grid-cols-6 gap-4 bg-gray-900/80 rounded-t-xl px-4 py-3 font-semibold text-blue-200 text-base sm:text-lg">
          <span className="text-center">ID</span>
          <span className="text-left">Name</span>
          <span className="text-left">Email</span>
          <span className="text-right">Phone</span>
          <span className="text-right">Spent</span>
          <span className="text-center">Remove</span>
        </div>
        <div className="divide-y divide-blue-900 bg-gray-950/80 rounded-b-xl shadow">
          {allusers.map((user, index) => (
            <div
              key={user.id || index}
              className="grid grid-cols-1 sm:grid-cols-7 gap-2 sm:gap-4 items-center px-4 py-3 hover:bg-blue-950/60 transition text-sm sm:text-base"
            >
              <span className="text-blue-400 font-mono text-xs text-center break-all">
                {user.id}
              </span>

            
                <span className="text-white text-center">{user.name}</span>
                <span className="text-gray-400 text-xs col-span-2">{user.email}</span>
                <span className="text-gray-400 text-xs">{user.phone}</span>

              <span className="text-pink-300 font-semibold text-center">
                ${user.spent ?? 0}
              </span>

              <div className="flex justify-center space-x-2">
                <button
                  onClick={() => openDeleteModal(user)}
                  className="flex items-center justify-center h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-red-700/20 hover:bg-red-700/40 transition"
                  title="Remove user"
                >
                  <svg
                    className="h-5 w-5 sm:h-6 sm:w-6 text-red-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for delete confirmation (unchanged) */}
        {showModal && modalUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-gray-900 border-4 border-red-700 rounded-2xl shadow-2xl p-8 max-w-lg w-full flex flex-col items-center">
              <h2 className="text-2xl font-bold text-red-400 mb-4 text-center">
                Are you sure you want to delete this user?
              </h2>
              <p className="text-blue-200 mb-2 text-center">
                This action cannot be undone. To confirm, type the user{" "}
                <span className="font-bold text-white">name</span> and{" "}
                <span className="font-bold text-white">ID</span> below:
              </p>
              <div className="w-full flex flex-col gap-2 mb-4">
                <input
                  type="text"
                  placeholder="User Name"
                  value={confirmName}
                  onChange={(e) => setConfirmName(e.target.value)}
                  className="px-4 py-2 rounded bg-gray-800 text-white border border-blue-700 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="User ID"
                  value={confirmId}
                  onChange={(e) => setConfirmId(e.target.value)}
                  className="px-4 py-2 rounded bg-gray-800 text-white border border-blue-700 focus:outline-none"
                />
              </div>
              {deleteError && (
                <div className="text-red-400 mb-2 text-center">
                  {deleteError}
                </div>
              )}
              <div className="flex gap-4 mt-2">
                <button
                  onClick={handleDeleteConfirm}
                  className="px-6 py-2 bg-red-700 hover:bg-red-800 text-white font-bold rounded-lg shadow-lg transition text-lg tracking-wide border border-red-900"
                >
                  Confirm Delete
                </button>
                <button
                  onClick={closeDeleteModal}
                  className="px-6 py-2 bg-gray-700 hover:bg-gray-800 text-white font-bold rounded-lg shadow-lg transition text-lg tracking-wide border border-blue-900"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersList;
