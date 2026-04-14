import { useRouter } from "../hooks/useRouter"
export function Link({ href, children, target, className = '', activeClassName = 'active', exact = true, ...restOfProps }) {
    const { currentPath } = useRouter()
    const { navigateTo } = useRouter()
    const handleClick = (event) => {
        event.preventDefault()
        navigateTo(href)
    }

    const isActive = exact
        ? currentPath === href
        : currentPath.startsWith(href)

    return (
        <a href={href}{...restOfProps} onClick={handleClick}>
            {children}
        </a>
    )
}