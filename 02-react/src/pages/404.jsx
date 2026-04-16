
import styles from './404.module.css'

export function NotFoundPage() {
    return (
        <main className={styles.container}>
            <div className={styles.cat}>
                <img src='./public/404cat.png' alt="404" />
            </div>
            <h1 className={styles.title}>404</h1>
            <p className={styles.description}>Lo sentimos, la página que buscas no existe.</p>
            <a href="/" className={styles.link}>Volver al inicio</a>
        </main>
    )

}