import React from 'react';

export default function AdminProjectView({ project }) {
  if (!project) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-card max-w-2xl mx-auto text-center">
        <p className="text-gray-600">Select a project to view details.</p>
      </div>
    );
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return isNaN(date) ? 'N/A' : date.toLocaleDateString();
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-card max-w-2xl mx-auto space-y-6">
      {['name', 'address', 'phone', 'email'].map((field) => (
        <div key={field}>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </label>
          <p className="p-3 border border-gray-300 rounded-lg bg-gray-50">{project[field] || '—'}</p>
        </div>
      ))}

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
        <p className="p-3 border border-gray-300 rounded-lg bg-gray-50 whitespace-pre-wrap">
          {project.description || '—'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {['pricing', 'customerBudget', 'runningCostTotal'].map((field) => (
          <div key={field}>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              {field.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
            </label>
            <p className="p-3 border border-gray-300 rounded-lg bg-gray-50">
              {project[field] != null ? `$${project[field]}` : '—'}
            </p>
          </div>
        ))}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Job Type</label>
        <p className="p-3 border border-gray-300 rounded-lg bg-gray-50">{project.jobType || '—'}</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Expected Completion Date</label>
        <p className="p-3 border border-gray-300 rounded-lg bg-gray-50">
          {formatDate(project.customerExpectedCompletion)}
        </p>
      </div>
    </div>
  );
}
