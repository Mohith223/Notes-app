// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Heading     from './components/Heading';
import AddNotes    from './Pages/AddNotes';
import DeleteNotes from './Pages/DeleteNotes';
import EditNotes   from './Pages/EditNotes';
import Spinner     from './components/Spinner'; 
import ConfirmDelete from './Pages/confirmdelete';

export default function App() {
  return (
    <Routes>
      <Route path="/loading"          element={<Spinner />} />
      <Route path="/"                 element={<Heading />} />
      <Route path="/notes/create"     element={<AddNotes />} />
      <Route path="/notes/delete/:id" element={<DeleteNotes />} />
      <Route path="/notes/edit/:id"   element={<EditNotes />} />
      <Route path="/confirm-delete"   element={<ConfirmDelete />} /> 

      {/* catch-all: redirect anything else back to "/" */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
