import { useRouter } from "../hooks/useRouter";

const validRoutes = ['/', '/search', '/contact']

export function Route({ path, component: Component }) {
    const { currentPath } = useRouter()

    // Si el path es "*", solo renderiza si la ruta no es válida (404)
    if (path === '*') {
        return !validRoutes.includes(currentPath) ? <Component /> : null
    }

    // Si el currentPath no coincide, no renderiza nada
    if (currentPath !== path) return null

    return <Component />
}