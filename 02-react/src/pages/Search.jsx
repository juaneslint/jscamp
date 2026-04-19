import { useEffect, useState } from 'react';

import Pagination from '../components/Pagination';
import SearchFormSection from '../components/SearchFormSection';
import JobListings from '../components/JobListings';
import Spinner from '../components/Spinner';

const RESULTS_PER_PAGE = 5

const useFilters = () => {
    const [filters, setFilters] = useState({
        technology: '',
        location: '',
        experienceLevel: '',
    })
    const [textToFilter, setTextToFilter] = useState('')
    const [currentPage, setCurrentPage] = useState(1);

    const [jobs, setJobs] = useState([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(true)    

    const isFiltering = () => {
        return !!(filters.technology || filters.location || filters.experienceLevel || textToFilter)
    }

    const handleClearFilters = () => {
        setFilters({ // limpia los filtros 
            technology: '',
            location: '',
            experienceLevel: '',
        })
        setTextToFilter('') // limpia el filtro de texto
        setCurrentPage(1) // vuelve a la primera página

    }

    useEffect(() => {
        async function fetchJobs() {
            try {
                setLoading(true)

                const params = new URLSearchParams()
                if(textToFilter) params.append('text', textToFilter)
                if(filters.technology) params.append('technology', filters.technology)
                if(filters.location) params.append('type', filters.location)
                if(filters.experienceLevel) params.append('level', filters.experienceLevel)
                
                const offset = (currentPage - 1) * RESULTS_PER_PAGE
                params.append('limit', RESULTS_PER_PAGE)
                params.append('offset', offset)

                const queryParams = params.toString()

                const response = await fetch(`https://jscamp-api.vercel.app/api/jobs?${queryParams}`)
                const json = await response .json()

                setJobs(json.data)
                setTotal(json.total)
            } catch (error){
                console.error('Error fetching jobs:', error)
            }
            finally{
                setLoading(false)
            }
        }
        fetchJobs()
    }, [filters, textToFilter, currentPage])

   

    const totalPages = Math.ceil(total / RESULTS_PER_PAGE)

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

    return {
        loading,
        jobs,
        total,
        totalPages,
        currentPage,
        isFiltering,
        handlePageChange,
        handleSearch,
        handleTextFilter,
        handleClearFilters,
        filters,
        textToFilter
    }
}

export function SearchPage() {

    const {
        jobs,
        total,
        loading,
        totalPages,
        currentPage,
        handlePageChange,
        handleSearch,
        handleTextFilter,
        isFiltering,
        handleClearFilters,
        filters,
        textToFilter
    }
    = useFilters()
    

    useEffect(() => {
        document.title = `Resultados: ${total}, Página ${currentPage} - DevJobs`
    }, [total, currentPage]) // si [] -> solo se ejecuta una vez al montar

    return (
        <main>
            <SearchFormSection onSearch={handleSearch} onTextFilter={handleTextFilter} showClearButton={isFiltering()} handleClearFilters={handleClearFilters} filters={filters} textToFilter={textToFilter} />
            <section>
                {
                    loading ?(
                        <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '400px',
                                gap: '20px'
                        }}><Spinner /><p>Cargando empleos...</p></div>
                    ) : (
                        <JobListings jobs={jobs} />

                    )
                }
                <JobListings jobs={jobs} />
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </section>
        </main>
    )
}
