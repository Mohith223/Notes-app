import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ConfirmDelete = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { ids = [], count = 0 } = state || {};

  // Base notes URL
  const BASE = 'https://notes-tracker.onrender.com/notes';

  // If no IDs, bounce home
  if (!ids.length) {
    navigate('/', { replace: true });
    return null;
  }

  const doDelete = async () => {
    try {
      // <-- point at the new /bulk endpoint here:
      await axios.delete(`${BASE}/bulk`, { data: { ids } });
      navigate('/', { replace: true });
    } catch (err) {
      console.error('Bulk delete failed:', err);
    }
  };

  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">
        Do you really want to delete {count > 1 ? `${count} notes` : 'this note'}?
      </h1>
      <p className="mb-6">Rethink and then click below.</p>
      <div className="flex justify-center space-x-4">
        <button
          onClick={doDelete}
          className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          Delete
        </button>
        <button
          onClick={() => navigate(-1)}
          className="rounded border px-4 py-2 hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmDelete;