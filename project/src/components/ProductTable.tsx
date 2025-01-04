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
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredJobs, setFilteredJobs] = useState(joblist);
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

    const filtered = joblist.filter((job) =>
      Object.entries(job)
        // Include only visible columns in the search
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

  return (
    <div style={{ margin: '20px 0' }}>
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
                    width: '150px',
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
                      width: '150px',
                      visibility: visibleColumns[key as keyof typeof visibleColumns]
                        ? 'visible'
                        : 'hidden',
                    }}
                  >
                    {job[key as keyof Job] || 'N/A'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
