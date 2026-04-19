import { useState, useEffect } from 'react';

export function usePersistedFilters() {
    const [filters, setFilters] = useState(() => {
        try{
            const saved = localStorage.getItem('jobFilters')
            return saved ? JSON.parse(saved) : {
                technology: '',
                location: '',  
                experienceLevel: '',  
            }
        } catch {
            return {
                technology: '',
                location: '',
                experienceLevel: '',
            }
        }
    })

    const [textToFilter, setTextToFilter] = useState(() => {
        try {
            return localStorage.getItem('jobTextFilter') || ''
        } catch {
            return ''
        }
    })

    useEffect(() => {
        localStorage.setItem('jobFilters', JSON.stringify(filters))
    }, [filters])

    useEffect(() => {
        localStorage.setItem('jobTextFilter', textToFilter)
    }, [textToFilter])

    const clearPersistedData = () => {
        localStorage.removeItem('jobFilters')
        localStorage.removeItem('jobTextFilter')
    }

    return { filters, setFilters, textToFilter, setTextToFilter, clearPersistedData }
}
