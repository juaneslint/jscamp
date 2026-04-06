import { useState } from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import Pagination from './components/Pagination';
import SearchFormSection from './components/SearchFormSection';
import JobListings from './components/JobListings';
import jobsData from './data.json';

const RESULTS_PER_PAGE = 5

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(jobsData.length / RESULTS_PER_PAGE)
  const pagedResults = jobsData.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE)
    
  const handlePageChange = (page) => {
    setCurrentPage(page);
  }

  return (
    <>
      <Header />
      <main>
        <SearchFormSection />
        <section>
          <JobListings jobs={pagedResults} />
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </section>
      </main>

      <Footer />
    </>
  )
}

export default App
