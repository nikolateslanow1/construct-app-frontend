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

    try {
      const response = await fetch("https://construct-app-414b8cde3eb0.herokuapp.com/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Submission failed:", errorText);
      } else {
        const result = await response.json();
        console.log("Submission successful:", result);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
    setFormData(initialState);
  };

  return (

    <div
	style={{
	  backgroundImage: `url(${process.env.PUBLIC_URL}/images/construct.jpg)`,
	  backgroundSize: 'cover',
	  backgroundPosition: 'center',
	  backgroundRepeat: 'no-repeat',
	  minHeight: '100vh'
	}}
    >

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 max-w-screen-xl mx-auto px-6 py-12 backdrop-blur-sm bg-white/80">

        {/* Left Section */}
        <div className="col-span-2 bg-white p-6 rounded-xl shadow-card w-full">
          <h2 className="text-lg font-semibold mb-4">Bio</h2>
          <p className="text-gray-700 text-sm leading-relaxed mb-4"> With a master’s degree in urban planning from Queens College, I launched my career in the construction industry in 2016, guided by a friend's advice to begin as a DOB (Department of Buildings) expeditor. That pivotal decision became the foundation of my professional growth, equipping me with deep insights into New York City's complex permitting processes and the inner workings of construction compliance. </p> <p className="text-gray-700 text-sm leading-relaxed mb-4"> Driven by a passion for efficiency and precision, I transitioned into freelance work, where I thrived as my own boss. Managing multiple projects simultaneously, I honed my ability to navigate challenges, meet tight deadlines, and deliver consistent results. My specialty lies in securing permit approvals swiftly and accurately ensuring that every client experiences steady, measurable progress week after week. </p> <p className="text-gray-700 text-sm leading-relaxed mb-4"> Today, I am a fully accomplished project manager known for treating every request with urgency, care, and strategic foresight. Whether you're launching a new build or navigating regulatory hurdles, I bring a wealth of experience and a client-first mindset to every phase of the project. Whatever your project needs are, I will handle every aspect of getting it approved. </p> </div> 




        {/* Center Form */}
    <form onSubmit={handleSubmit} className="col-span-3 bg-white p-12 rounded-xl shadow-card space-y-6 w-full">
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
        {['pricing', 'customerBudget'].map((field) => (
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
        Get a Free Quote
      </button>
    </form>


        {/* Right Section */}
        <div className="col-span-2 bg-white p-6 rounded-xl shadow-card w-full">
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-md font-semibold mt-6 mb-2">Certifications</h3>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              <li>Department of Buildings Class 2</li>
              <li>Fire Department R-02 – Filing Representative</li>
              <li>OSHA 30 Certification – Construction Site Representative</li>
              <li>F-03 – Indoor Place of Assembly Safety Personnel</li>
            </ul>
          </div>

          <div className="pt-6">
            <h2 className="text-lg font-semibold mb-4">Agency Forms</h2>
            <ul className="text-sm text-gray-700 space-y-4">
              <li><strong>DOB Forms:</strong> <a href="https://www.nyc.gov/site/buildings/dob/forms.page" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">DOB link</a></li>
              <li><strong>FDNY:</strong> TM1 – Simple Click and fill out and submit for processing.</li>
              <li><strong>DEP:</strong> <a href="https://www.nyc.gov/site/dep/pay-my-bills/forms.page#" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">DEP link</a></li>
              <li><strong>DOT:</strong> <a href="mailto:ConstructionApprovalsPlus@gmail.com">Email me- Form available upon request</a></li>
              <li><strong>ECB Violations:</strong> <a href="mailto:ConstructionApprovalsPlus@gmail.com">Email me- Form available upon request</a></li>
            </ul>
          </div>

          <div className="pt-6">
            <h2 className="text-lg font-semibold mb-4">Solar Panel Consultation?</h2>
            <ul className="text-sm text-gray-700 space-y-4">
              <li><a href="mailto:ConstructionApprovalsPlus@gmail.com">Need to get your Solar Panels Approved, Inquiry here</a></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 text-center py-6 mt-12 border-t border-gray-300">
        <p className="text-sm text-gray-700">
          Contact Info Anthony Lackram<br />
          <strong>Phone:</strong> 917-582-2753<br />
          <strong>Email:</strong> <a href="mailto:ConstructionApprovalsPlus@gmail.com" className="text-blue-600 underline">ConstructionApprovalsPlus@gmail.com</a>
        </p>
      </footer>
    </div>
  );
}
