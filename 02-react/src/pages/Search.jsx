import { useState } from 'react';

import Pagination from '../components/Pagination';
import SearchFormSection from '../components/SearchFormSection';
import JobListings from '../components/JobListings';
import jobsData from '../data.json';

const RESULTS_PER_PAGE = 5

export function SearchPage() {
    const [filters, setFilters] = useState({
        technology: '',
        location: '',
        experienceLevel: '',
    })
    const [textToFilter, setTextToFilter] = useState('')
    const [currentPage, setCurrentPage] = useState(1);

    const jobsFilteredByFilters = jobsData.filter(job => {
        return (
            (filters.technology === '' || job.data.technology.toLowerCase() === filters.technology.toLowerCase()) &&
            (filters.location === '' || job.ubicacion.toLowerCase() === filters.location.toLowerCase()) &&
            (filters.experienceLevel === '' || job.data.nivel.toLowerCase() === filters.experienceLevel.toLowerCase())
        )
    })

    const jobsWithTextFilter = textToFilter === ''
        ? jobsFilteredByFilters
        : jobsFilteredByFilters.filter(job => {
            return job.titulo.toLowerCase().includes(textToFilter.toLowerCase()) ||
                job.empresa.toLowerCase().includes(textToFilter.toLowerCase()) ||
                job.ubicacion.toLowerCase().includes(textToFilter.toLowerCase()) ||
                job.descripcion.toLowerCase().includes(textToFilter.toLowerCase()) ||
                job.data.technology.toLowerCase().includes(textToFilter.toLowerCase()) ||
                job.data.modalidad.toLowerCase().includes(textToFilter.toLowerCase()) ||
                job.data.nivel.toLowerCase().includes(textToFilter.toLowerCase())
        })

    const totalPages = Math.ceil(jobsWithTextFilter.length / RESULTS_PER_PAGE)

    const pagedResults = jobsWithTextFilter.slice(
        (currentPage - 1) * RESULTS_PER_PAGE,
        currentPage * RESULTS_PER_PAGE)

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const handleSearch = (filters) => {
        setFilters(filters)
        setCurrentPage(1)
    }

    const handleTextFilter = (newTextToFilter) => {
        setTextToFilter(newTextToFilter)
        setCurrentPage(1)
    }

    return (
        <main>
            <SearchFormSection onSearch={handleSearch} onTextFilter={handleTextFilter} />
            <section>
                <JobListings jobs={pagedResults} />
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </section>
        </main>
    )
}
