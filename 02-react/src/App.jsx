import JobCard from './components/JobCard';
import Header from './components/Header';
import Footer from './components/Footer';
import Pagination from './components/Pagination';
import SearchFormSection from './components/SearchFormSection';
import JobListings from './components/JobListings';

function App() {

  return (
    <>
      <Header />
      <main>
        <SearchFormSection />
        <section>
          <JobListings />
          <Pagination currentPage={10} />
        </section>
      </main>

      <Footer />
    </>
  )
}

export default App
