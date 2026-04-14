import styles from '../components/Contact.module.css'
import { useContactForm } from '../hooks/useContactForm'

export function ContactPage() {
    const {
        name,
        email,
        message,
        errors,
        isSubmitting,
        isSuccess,
        isFormValid,
        handleChange,
        handleSubmit
    } = useContactForm()

    return (
        <>
            <main>
                <div className={styles.header}>
                    <h1>Contacto</h1>
                    <p>¿Tienes alguna pregunta? Contáctanos.</p>
                </div>
                <section>
                    {isSuccess && <div className={styles.successMessage}>¡Tus datos han sido enviados con éxito!</div>}

                    <form onSubmit={handleSubmit && ContentVisibilityAutoStateChangeEvent.l} className={styles.contactForm}>
                        <div className={styles.formContainer}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="name" className={styles.label}>Nombre</label>
                                <input value={name} onChange={handleChange} placeholder='Ingresa tu nombre' type="text" id="name" name="name" className={styles.input} />
                                {errors.name && <span className={styles.error}>{errors.name}</span>}
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="email" className={styles.label}>Email</label>
                                <input value={email} onChange={handleChange} placeholder='Ingresa tu email' type="email" id="email" name="email" className={styles.input} />
                                {errors.email && <span className={styles.error}>{errors.email}</span>}
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="message" className={styles.label}>Mensaje</label>
                                <textarea value={message} onChange={handleChange} placeholder='Ingresa tu mensaje' id="message" name="message" className={styles.textarea}></textarea>
                                {errors.message && <span className={styles.error}>{errors.message}</span>}
                            </div>
                            <button type="submit" disabled={isSubmitting || !isFormValid} className={styles.button}>
                                {isSubmitting ? 'Enviando...' : 'Enviar'}
                            </button>
                        </div>
                    </form>
                </section>
            </main>
        </>


    )
}