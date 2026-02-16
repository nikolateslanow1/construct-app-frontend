
# File: src/App.jsx
import React from 'react';
import UnifiedDashboard from './components/UnifiedDashboard';

export default function App() {
  return <UnifiedDashboard />;
}

# File: src/components/AdminActions.jsx
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

# File: src/components/AdminProjectView.jsx
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

# File: src/components/ProjectForm.jsx
import React, { useState } from 'react';

const initialState = {
  name: '',
  address: '',
  phone: '',
  email: '',
  description: '',
  pricing: '',
  jobType: '',
  customerBudget: '',
  runningCostTotal: '',
  customerExpectedCompletion: ''
};

export default function ProjectForm({ onSubmit }) {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      pricing: formData.pricing ? parseFloat(formData.pricing) : null,
      customerBudget: formData.customerBudget ? parseFloat(formData.customerBudget) : null,
      runningCostTotal: formData.runningCostTotal ? parseFloat(formData.runningCostTotal) : null,
      customerExpectedCompletion: formData.customerExpectedCompletion
        ? new Date(formData.customerExpectedCompletion)
        : null
    };

    await onSubmit(payload);
    setFormData(initialState);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-12 rounded-xl shadow-card space-y-6 w-full">
      {['name', 'address', 'phone', 'email'].map((field) => (
        <div key={field}>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </label>
          <input
            type="text"
            value={formData[field]}
            onChange={handleChange(field)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
            placeholder={`Enter ${field}`}
          />
        </div>
      ))}

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
        <textarea
          value={formData.description}
          onChange={handleChange('description')}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
          rows={4}
          placeholder="Project description..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {['pricing', 'customerBudget', 'runningCostTotal'].map((field) => (
          <div key={field}>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              {field.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
            </label>
            <input
              type="number"
              step="0.01"
              value={formData[field]}
              onChange={handleChange(field)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
              placeholder={`Enter ${field}`}
            />
          </div>
        ))}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Job Type</label>
        <input
          type="text"
          value={formData.jobType}
          onChange={handleChange('jobType')}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
          placeholder="e.g., Renovation, New Build"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Expected Completion Date</label>
        <input
          type="date"
          value={formData.customerExpectedCompletion}
          onChange={handleChange('customerExpectedCompletion')}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-brand-600 text-black py-3 rounded-lg font-semibold hover:bg-brand-700 transition"
      >
        Submit Project
      </button>
    </form>
  );
}

# File: src/components/ProjectList.jsx
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

# File: src/components/UnifiedDashboard.jsx
import React, { useEffect, useMemo, useState } from 'react';
import ProjectForm from './ProjectForm';
import ProjectList from './ProjectList';
import AdminActions from './AdminActions';
import AdminProjectView from './AdminProjectView';
import {
  fetchProjects,
  createProject,
  deleteProject,
  duplicateProject,
  deleteAllProjects
} from '../lib/api';

export default function UnifiedDashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('customer');
  const [selected, setSelected] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const refresh = async () => {
    setLoading(true);
    try {
      const data = await fetchProjects();
      setProjects(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const onSubmit = async (payload) => {
    await createProject(payload);
    await refresh();
  };

  const onDelete = async (id) => {
    await deleteProject(id);
    await refresh();
  };

  const onDuplicate = async (id) => {
    await duplicateProject(id);
    await refresh();
  };

  const onDeleteAll = async () => {
    if (window.confirm('Are you sure you want to delete all projects?')) {
      await deleteAllProjects();
      await refresh();
    }
  };

  const AdminLogin = ({ onLogin }) => {
    const [password, setPassword] = useState('');
    const handleLogin = (e) => {
      e.preventDefault();
      if (password === 'admin123') {
        onLogin();
      } else {
        alert('Invalid password');
      }
    };
    return (
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-xl shadow-card max-w-md mx-auto">
        <h2 className="text-lg font-semibold mb-4">Admin Login</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          placeholder="Enter admin password"
        />
        <button
          type="submit"
          className="w-full bg-brand-600 text-white py-2 rounded-lg font-semibold hover:bg-brand-700 transition"
        >
          Login
        </button>
      </form>
    );
  };

  const headerImage = useMemo(() => ({
    banner: '/images/banner.jpg',
    bg: '/images/construct.jpg'
  }), []);

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url('${headerImage.bg}')` }}>
      {/* ... header and nav unchanged ... */}

      <main className="max-w-6xl mx-auto px-6 pb-16">
        {mode === 'customer' && (
          <section className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* ... customer view unchanged ... */}
            <section className="col-span-3">
              <ProjectForm onSubmit={onSubmit} />
            </section>
          </section>
        )}

        {mode === 'admin' && (
          <section className="space-y-6">
            {!isAuthenticated ? (
              <AdminLogin onLogin={() => setIsAuthenticated(true)} />
            ) : (
              <>
                <AdminActions onDeleteAll={onDeleteAll} />
                <ProjectList
                  projects={projects}
                  loading={loading}
                  onSelect={setSelected}
                  onDelete={onDelete}
                  onDuplicate={onDuplicate}
                />
                <AdminProjectView project={selected} />
              </>
            )}
          </section>
        )}
      </main>

      {/* ... footer unchanged ... */}
    </div>
  );
}

# File: src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
