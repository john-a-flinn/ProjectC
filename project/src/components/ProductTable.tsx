'use client';

import React, { useState } from 'react';

type Job = {
  id: number;
  mfr: string | null;
  type_name: string | null;
  type_id: number | null;
  style_name: string | null;
  style_id: string | null;
  color_number: number | null;
  color_name: string | null;
  size: string | null;
};

type Props = {
  joblist: Job[];
};

const ProductTable: React.FC<Props> = ({ joblist }) => {
  const [jobs, setJobs] = useState<Job[]>(joblist);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredJobs, setFilteredJobs] = useState(joblist);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [newJob, setNewJob] = useState<Partial<Job>>({
    id: jobs.length + 1,
  });
  const [visibleColumns, setVisibleColumns] = useState({
    mfr: true,
    type_name: true,
    type_id: true,
    style_name: true,
    style_id: true,
    color_number: true,
    color_name: true,
    size: true,
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = jobs.filter((job) =>
      Object.entries(job)
        .filter(([key]) => visibleColumns[key as keyof typeof visibleColumns])
        .some(([_, value]) =>
          value?.toString().toLowerCase().includes(query)
        )
    );
    setFilteredJobs(filtered);
  };

  const toggleColumn = (column: keyof typeof visibleColumns) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  const handleAddJob = () => {
    if (newJob.mfr && newJob.type_name) {
      setJobs((prev) => [...prev, { ...newJob, id: prev.length + 1 } as Job]);
      setFilteredJobs((prev) => [...prev, { ...newJob, id: prev.length + 1 } as Job]);
      setNewJob({ id: jobs.length + 2 });
    }
  };

  const handleEditJob = (job: Job) => {
    setEditingJob(job);
  };

  const handleSaveEdit = () => {
    if (editingJob) {
      setJobs((prev) =>
        prev.map((job) => (job.id === editingJob.id ? editingJob : job))
      );
      setFilteredJobs((prev) =>
        prev.map((job) => (job.id === editingJob.id ? editingJob : job))
      );
      setEditingJob(null);
    }
  };

  const handleDeleteJob = (id: number) => {
    setJobs((prev) => prev.filter((job) => job.id !== id));
    setFilteredJobs((prev) => prev.filter((job) => job.id !== id));
  };

  return (
    <div style={{ margin: '20px 0' }}>
      {/* Search Bar */}
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Search by visible fields"
          value={searchQuery}
          onChange={handleSearch}
          style={{
            padding: '10px',
            width: '50%',
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #ddd',
          }}
        />
      </div>

      {/* Add Job Form */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Add New Job</h3>
        <input
          type="text"
          placeholder="Manufacturer"
          value={newJob.mfr || ''}
          onChange={(e) =>
            setNewJob((prev) => ({ ...prev, mfr: e.target.value }))
          }
        />
        <input
          type="text"
          placeholder="Type Name"
          value={newJob.type_name || ''}
          onChange={(e) =>
            setNewJob((prev) => ({ ...prev, type_name: e.target.value }))
          }
        />
        <button onClick={handleAddJob}>Add Job</button>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            borderCollapse: 'collapse',
            width: '100%',
            textAlign: 'left',
            border: '1px solid #ddd',
          }}
        >
          <thead>
            <tr>
              {Object.keys(visibleColumns).map((key) => (
                <th
                  key={key}
                  style={{
                    padding: '8px',
                    borderBottom: '2px solid #000',
                    textAlign: 'center',
                  }}
                >
                  <button
                    onClick={() => toggleColumn(key as keyof typeof visibleColumns)}
                    style={{
                      border: 'none',
                      background: 'none',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                    }}
                  >
                    {key.toUpperCase()} {visibleColumns[key as keyof typeof visibleColumns] ? '⬆' : '⬇'}
                  </button>
                </th>
              ))}
              <th style={{ padding: '8px', borderBottom: '2px solid #000' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.map((job) => (
              <tr key={job.id}>
                {Object.keys(visibleColumns).map((key) => (
                  <td
                    key={key}
                    style={{
                      padding: '8px',
                      borderBottom: '1px solid #ddd',
                      textAlign: 'center',
                    }}
                  >
                    {job[key as keyof Job] || 'N/A'}
                  </td>
                ))}
                <td style={{ textAlign: 'center' }}>
                  <button onClick={() => handleEditJob(job)}>Edit</button>
                  <button onClick={() => handleDeleteJob(job.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Job Form */}
      {editingJob && (
        <div style={{ marginTop: '20px' }}>
          <h3>Edit Job</h3>
          <input
            type="text"
            value={editingJob.mfr || ''}
            onChange={(e) =>
              setEditingJob((prev) => ({ ...prev!, mfr: e.target.value }))
            }
          />
          <input
            type="text"
            value={editingJob.type_name || ''}
            onChange={(e) =>
              setEditingJob((prev) => ({ ...prev!, type_name: e.target.value }))
            }
          />
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={() => setEditingJob(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default ProductTable;