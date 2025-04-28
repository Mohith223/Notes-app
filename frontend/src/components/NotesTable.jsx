
import React, { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import Spinner from './Spinner.jsx';
import { Link, useNavigate } from 'react-router-dom';

const NotesTable = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);
  const navigate = useNavigate();
  const URL = 'https://notes-tracker.onrender.com/notes';

  // Fetch all notes
  const fetchNotes = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(URL);
      setNotes(response.data.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Toggle a single note's selection
  const handleSelect = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // Instead of deleting immediately, navigate to a confirmation page
  const handleBulkClick = () => {
    if (!selectedIds.length) return;
    navigate('/confirm-delete', {
      state: { ids: selectedIds, count: selectedIds.length }
    });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="px-4">
      {/* Navigate to confirmation screen */}
      {selectedIds.length > 0 && (
        <button
          onClick={handleBulkClick}
          className="mb-4 rounded-full border border-red-500 px-4 py-1 text-red-500 hover:bg-red-500 hover:text-white"
        >
          Delete {selectedIds.length} Selected
        </button>
      )}

      <table className="w-full border-separate border-spacing-4 p-4 mt-4">
        <thead>
          <tr>
            <th></th>
            <th className="border-purple-600 text-xl border-2 rounded-md p-2">S.No</th>
            <th className="border-purple-600 text-xl border-2 rounded-md p-2">Topic</th>
            <th className="border-purple-600 text-xl border-2 rounded-md p-2 max-md:hidden">Status</th>
            <th className="border-purple-600 text-xl border-2 rounded-md p-2 max-md:hidden">Date</th>
            <th className="border-purple-600 text-xl border-2 rounded-md p-2">Notes</th>
            <th className="border-purple-600 text-xl border-2 rounded-md p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((item, index) => (
            <tr key={item._id}>
              <td className="text-center">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(item._id)}
                  onChange={() => handleSelect(item._id)}
                />
              </td>
              <td className="text-center border-purple-600 border-2 rounded-md p-2">{index + 1}</td>
              <td className="border-purple-600 border-2 rounded-md p-2">{item.topic}</td>
              <td className="max-md:hidden border-purple-600 border-2 rounded-md p-2">{item.status}</td>
              <td className="max-md:hidden border-purple-600 border-2 rounded-md p-2">{new Date(item.createdAt).toLocaleString()}</td>
              <td>
                <p className="border-purple-600 min-h-[116px] border-2 rounded-md p-2">
                  {item.notes}
                </p>
              </td>
              <td className="flex items-center justify-around p-2">
                <Link to={`/notes/edit/${item._id}`}>
                  <FaEdit className="cursor-pointer text-3xl" />
                </Link>
                <Link to={`/notes/delete/${item._id}`}>
                  <MdDelete className="cursor-pointer text-3xl" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NotesTable;
