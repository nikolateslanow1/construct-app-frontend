import React from 'react';

export default function AdminActions({ onDeleteAll, onExportCsv, disableDeleteAll = false }) {
  const deleteClass = disableDeleteAll
    ? 'bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed'
    : 'bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition';

  return (
    <div className="mb-6 flex items-center gap-3">
      <button
        onClick={onDeleteAll}
        className={deleteClass}
        disabled={disableDeleteAll}
        aria-disabled={disableDeleteAll}
      >
        Delete All Projects
      </button>
      {onExportCsv && (
        <button
          onClick={onExportCsv}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Export CSV
        </button>
      )}
    </div>
  );
}
