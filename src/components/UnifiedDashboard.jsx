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
  deleteAllProjects,
  fetchVisits  
} from '../lib/api';

export default function UnifiedDashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('customer');
  const [selected, setSelected] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [visitCount, setVisitCount] = useState(null); // 👈 New state for counter

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
 	   // 👇 Fetch visit count from backend
 	   fetchVisits().then(data => setVisitCount(data.visits));
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
  <header
    className="relative h-48 md:h-64 bg-cover bg-center flex items-center justify-center"
    style={{ backgroundImage: `url('${headerImage.banner}')` }}
  >
    <div className="bg-black/40 px-6 py-4 rounded-lg">
      <h1 className="text-white text-2xl md:text-4xl font-bold tracking-wide">
        City Code Expeditor Portal
      </h1>
    </div>
  </header>

  <nav className="flex justify-center gap-4 py-6 bg-white shadow-md">
    <button
      onClick={() => setMode('customer')}
      className={`px-6 py-2 rounded-lg font-medium transition ${
        mode === 'customer'
          ? 'bg-brand-600 text-white'
          : 'bg-white border border-brand-600 text-brand-600 hover:bg-blue-50'
      }`}
    >
      Customer
    </button>
    <button
      onClick={() => setMode('admin')}
      className={`px-6 py-2 rounded-lg font-medium transition ${
        mode === 'admin'
          ? 'bg-brand-600 text-white'
          : 'bg-white border border-brand-600 text-brand-600 hover:bg-blue-50'
      }`}
    >
      Admin
    </button>
  </nav>


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

        {/* === Completed Projects Section === */}
        <section className="max-w-4xl mx-auto my-12 p-8 bg-white/90 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold mb-6 text-brand-700 border-b pb-2">Completed Projects</h2>

          {/* Project 1 */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2">87-10 Northern Blvd, Sunnyside NY</h3>
            <div className="mb-2">
              <span className="inline-block bg-gray-100 px-3 py-1 rounded text-sm text-gray-600 mr-2"></span>
            </div>
            <p className="text-gray-700 mb-2">
              Processed the permits and secured proper filings with DEP and FDNY for the owner and tenants of the mixed use building. Consisting of office/ Retail/ Pre-School/ and an underground parking lot.
            </p>
          </div>

          {/* Project 2 */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2">47-16 Greenpoint Avenue, Sunnyside NY</h3>
            <div className="mb-2">
              <span className="inline-block bg-gray-100 px-3 py-1 rounded text-sm text-gray-600 mr-2"></span>
            </div>
            <p className="text-gray-700 mb-2">
              Handled permitting process for a new large Condo project. Cured associated violations from previous owners that would have normally halted the approval from Department of Buildings and Fire Department
            </p>
          </div>

          {/* Project 3 */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2">Solar Panel</h3>
            <p className="text-gray-700 mb-2">
              Expeditor for various residential and commercial businesses where I submitted approval packages for final City approval.
            </p>
          </div>

          {/* Project 4 */}
          <div className="mb-2">
            <h3 className="text-xl font-semibold mb-2">NYC Hospitals</h3>
            <p className="text-gray-700 mb-2">
              Handle various violations and permit along with extensive renovations. Interactions included City and State agencies.
            </p>
          </div>
        </section>
      </main>

      {/* 👇 Footer with visit counter */}
       <footer className="text-center py-4 text-sm text-gray-500">
         {visitCount !== null && `Total visits: ${visitCount}`}
       </footer>

    </div>
  );
}
