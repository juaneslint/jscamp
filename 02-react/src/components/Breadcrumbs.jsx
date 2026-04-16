import { useRouter } from '../hooks/useRouter'
import styles from './Breadcrumbs.module.css'

export default function Breadcrumbs() {
    const { currentPath } = useRouter()

    if(currentPath === '/') return null
    
    // Define las rutas y sus etiquetas
    const breadcrumbMap = {
        '/search': 'Búsqueda',
        '/contact': 'Contacto'
    }
    
    const label = breadcrumbMap[currentPath] || 'Página no encontrada'
    
    return (
        <nav className={styles.breadcrumbs}>
            <a href="/">Inicio</a>
                <>
                    <span className={styles.separator}>/</span>
                    <span className={styles.current}>{label}</span>
                </>
        </nav>
    )
}