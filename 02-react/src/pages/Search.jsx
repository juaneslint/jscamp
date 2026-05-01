import { useEffect, useState } from 'react';
import { usePersistedFilters } from '../hooks/usePersistedFilters';
import { useRouter } from '../hooks/useRouter';

import Pagination from '../components/Pagination';
import SearchFormSection from '../components/SearchFormSection';
import JobListings from '../components/JobListings';
import Spinner from '../components/Spinner';

const RESULTS_PER_PAGE = 5

const useFilters = (filters, setFilters, textToFilter, setTextToFilter) => {
    const [currentPage, setCurrentPage] = useState(() => {
        const params = new URLSearchParams(window.location.search)
        const page = params.get('page')
        return Number.isNaN(page) ? (page) : 1
    });

    const [jobs, setJobs] = useState([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(true)

    const { navigateTo } = useRouter()

    const isFiltering = () => {
        return !!(filters.technology || filters.location || filters.experienceLevel || textToFilter)
    }

    const handleClearFilters = (clearPersistedData) => {
        setFilters({ // limpia los filtros 
            technology: '',
            location: '',
            experienceLevel: '',
        })
        setTextToFilter('') // limpia el filtro de texto
        setCurrentPage(1) // vuelve a la primera página
        clearPersistedData() // limpia los filtros persistidos en localStorage
    }

    useEffect(() => {
        async function fetchJobs() {
            try {
                setLoading(true)

                const params = new URLSearchParams()
                if (textToFilter) params.append('text', textToFilter)
                if (filters.technology) params.append('technology', filters.technology)
                if (filters.location) params.append('type', filters.location)
                if (filters.experienceLevel) params.append('level', filters.experienceLevel)

                const offset = (currentPage - 1) * RESULTS_PER_PAGE
                params.append('limit', RESULTS_PER_PAGE)
                params.append('offset', offset)

                const queryParams = params.toString()

                const response = await fetch(`https://jscamp-api.vercel.app/api/jobs?${queryParams}`)
                const json = await response.json()

                setJobs(json.data)
                setTotal(json.total)
            } catch (error) {
                console.error('Error fetching jobs:', error)
            }
            finally {
                setLoading(false)
            }
        }
        fetchJobs()
    }, [filters, textToFilter, currentPage])

    useEffect(() => {
        const params = new URLSearchParams()

        if (textToFilter) params.append('text', textToFilter)
        if (filters.technology) params.append('technology', filters.technology)
        if (filters.location) params.append('type', filters.location)
        if (filters.experienceLevel) params.append('level', filters.experienceLevel)

        if (currentPage > 1) params.append('page', currentPage) // si la página es mayor a 1, la agrego a los parámetros

        const newUrl = params.toString()
            ? `${window.location.pathname}?${params.toString()}`
            : window.location.pathname

        navigateTo(newUrl)

    }, [filters, currentPage, textToFilter, navigateTo])

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
        handleClearFilters
    }
}

export function SearchPage() {
    const { filters, setFilters, textToFilter, setTextToFilter, clearPersistedData } = usePersistedFilters() // hook personalizado para persistir filtros en localStorage

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
        handleClearFilters
    }
        = useFilters(filters, setFilters, textToFilter, setTextToFilter)


    const handleClearFiltersWithPersistence = () => {
        handleClearFilters(clearPersistedData)
    }

    const title = loading
        ? 'Cargando... - DevJobs'
        : `Resultados: ${total}, Página ${currentPage} - DevJobs`;

    return (
        <main>
            <title>{title}</title>
            <meta name='description' content='Explora miles de oportunidades laborales en el sector tecnológico. Encuentra tu próxima empleo en DevJobs.' />
            <SearchFormSection onSearch={handleSearch} onTextFilter={handleTextFilter} showClearButton={isFiltering()} handleClearFilters={handleClearFiltersWithPersistence} filters={filters} textToFilter={textToFilter} />
            <section>
                <h2 style={{ textAlign: 'center' }}>Resultados de búsqueda</h2>
                {
                    loading ? (
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
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </section>
        </main>
    )
}
