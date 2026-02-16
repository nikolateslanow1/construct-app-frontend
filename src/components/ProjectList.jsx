import React from 'react';

const EmptyState = () => (
  <div className="bg-white p-8 rounded-xl shadow-card max-w-2xl mx-auto text-center">
    <h3 className="text-lg font-semibold text-gray-800 mb-2">No requests yet</h3>
    <p className="text-gray-600">Submit your first housing request to see it appear here.</p>
  </div>
);

const LoadingState = () => (
  <div className="bg-white p-8 rounded-xl shadow-card max-w-2xl mx-auto text-center">
    <p className="text-gray-700">Loading requests…</p>
  </div>
);

export default function ProjectList({ projects = [], loading = false, onSelect, onDelete, onDuplicate }) {
  if (loading) return <LoadingState />;
  if (!projects.length) return <EmptyState />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((proj) => (
        <div
          key={proj.id ?? `${proj.name}-${proj.email}-${proj.customerExpectedCompletion}`}
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-card transition"
        >
          <div className="flex items-start justify-between">
            <h2 className="text-xl font-bold text-brand-700 mb-2">{proj.name}</h2>
            <div className="flex gap-2">
              <button
                onClick={() => onDuplicate?.(proj.id)}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition text-sm"
              >
                Duplicate
              </button>
              <button
                onClick={() => onDelete?.(proj.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition text-sm"
              >
                Delete
              </button>
            </div>
          </div>

          <div
            className="space-y-1 text-gray-700 cursor-pointer"
            onClick={() => onSelect?.(proj)}
            title="Select to view details"
          >
            <p><span className="font-medium">Address:</span> {proj.address}</p>
            <p><span className="font-medium">Phone:</span> {proj.phone}</p>
            <p><span className="font-medium">Email:</span> {proj.email}</p>
            <p><span className="font-medium">Description:</span> {proj.description}</p>
            <p><span className="font-medium">Pricing:</span> {proj.pricing}</p>
            <p><span className="font-medium">Types:</span> {proj.jobType}</p>
            <p><span className="font-medium">Target Budget:</span> {proj.customerBudget}</p>
            <p><span className="font-medium">Completion Date:</span> {proj.customerExpectedCompletion}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
