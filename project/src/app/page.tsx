import { prisma } from '@/lib/prisma';

export default async function Page() {
  // Fetch data from both tables
  const jobs = await prisma.joblist.findMany();

  console.log('Fetched Jobs:', jobs);

  return (
    <main>
      <h1>Data from Database</h1>

      <section>
        <h2>Jobs</h2>
        <table>
          <thead>
            <tr>
              <th>MFR</th>
              <th>Type Name</th>
              <th>Type ID</th>
              <th>Style Name</th>
              <th>Style ID</th>
              <th>Color Number</th>
              <th>Color Name</th>
              <th>Size</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id}>
                <td>{job.mfr}</td>
                <td>{job.type_name}</td>
                <td>{job.type_id}</td>
                <td>{job.style_name || 'N/A'}</td>
                <td>{job.style_id || 'N/A'}</td>
                <td>{job.color_number || 'N/A'}</td>
                <td>{job.colorname || 'N/A'}</td>
                <td>{job.size || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}