// Pages/DeleteNotes.jsx
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';

export default function DeleteNotes() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await axios.delete(`https://notes-tracker.onrender.com/notes/${id}`);
      navigate('/');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="w-full max-w-md p-8 bg-white rounded shadow text-center space-y-6">
          <p className="text-2xl font-semibold">
            Do you really want to delete this note?<br />
            Rethink and then click below.
          </p>

          <button
            type="button"
            onClick={handleDelete}
            className="w-full px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Delete
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full px-6 py-3 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
