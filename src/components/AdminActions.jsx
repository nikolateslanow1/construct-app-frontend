import React from 'react';

export default function AdminActions({ onDeleteAll }) {
  return (
    <div className="mb-6">
      <button
        onClick={onDeleteAll}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
      >
        Delete All Projects
      </button>
    </div>
  );
}
