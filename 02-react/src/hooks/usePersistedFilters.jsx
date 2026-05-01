import { useState, useEffect } from 'react';

export function usePersistedFilters() {
    const [filters, setFilters] = useState(() => {
        try{
            const params = new URLSearchParams(window.location.search)
            if (params.has('technology') || params.has('type') || params.has('level')) {
                return {
                    technology: params.get('technology') || '',
                    location: params.get('type') || '',  
                    experienceLevel: params.get('level') || '',  
                }
            }

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
            const params = new URLSearchParams(window.location.search)
            if (params.has('text')) {
                return params.get('text')
            }

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
