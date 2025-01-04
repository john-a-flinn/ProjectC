import { prisma } from '@/lib/prisma';
import ProductTable from '@/components/ProductTable'; // Adjust the path as needed

export default async function Page() {
  // Fetch data from the joblist table
  const joblist = await prisma.joblist.findMany();

  return (
    <main>
      <h1>Data from Database</h1>
      <section>
        <h2>Job List</h2>
        {/* Pass the fetched joblist data to ProductTable */}
        <ProductTable joblist={joblist} />
        
      </section>
    </main>
  );
}