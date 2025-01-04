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
  initialJoblist: Job[];
};

const ManageJobs: React.FC<Props> = ({ initialJoblist }) => {
  const [joblist, setJoblist] = useState<Job[]>(initialJoblist);
  const [newJob, setNewJob] = useState<Job | null>(null);

  const handleAddJob = () => {
    if (newJob) {
      setJoblist((prev) => [...prev, { ...newJob, id: Date.now() }]);
      setNewJob(null);
    }
  };

  const handleDeleteJob = (id: number) => {
    setJoblist((prev) => prev.filter((job) => job.id !== id));
  };

  const handleEditJob = (id: number, updatedJob: Partial<Job>) => {
    setJoblist((prev) =>
      prev.map((job) => (job.id === id ? { ...job, ...updatedJob } : job))
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Add Job Form */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Add a New Job</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddJob();
          }}
        >
          <input
            type="text"
            placeholder="MFR"
            value={newJob?.mfr || ''}
            onChange={(e) =>
              setNewJob((prev) => ({ ...prev, mfr: e.target.value || null }))
            }
          />
          {/* Add other fields similarly */}
          <button type="submit">Add Job</button>
        </form>
      </div>

      {/* Job List Table */}
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
              <th>MFR</th>
              <th>Type Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {joblist.map((job) => (
              <tr key={job.id}>
                <td>{job.mfr || 'N/A'}</td>
                <td>{job.type_name || 'N/A'}</td>
                <td>
                  <button onClick={() => handleDeleteJob(job.id)}>Delete</button>
                  <button
                    onClick={() =>
                      handleEditJob(job.id, { mfr: 'Updated MFR' })
                    }
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageJobs;
