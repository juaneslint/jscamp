import { useState, useEffect } from "react"
export function useContactForm() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    // 1. Usar un objeto para manejar errores específicos (Ej: errors.name, errors.email)
    const [errors, setErrors] = useState({})

    // 2. Te faltaba destructurar los setters de tus estados
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const handleChange = (event) => {
        const { name, value } = event.target
        if (name === 'name') {
            const regexLetrasyEspacios = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/
            if (regexLetrasyEspacios.test(value)) {
                setName(value)
            }
            else {
                return
            }
        }
        if (name === 'email') {
            setEmail(value)
        }
        if (name === 'message') {
            setMessage(value)
        }
        // Limpiamos solo el error del campo dinámicamente cuando el usuario escribe
        setErrors(prev => ({ ...prev, [name]: '' }))
    }

    const validateForm = () => {
        // Objeto temporal para ir guardando los errores que encontremos
        const newErrors = {}

        if (!name.trim()) newErrors.name = 'El nombre es requerido'
        if (!email.trim() || !email.includes('@')) newErrors.email = 'Debe ser un email válido'
        if (!message.trim()) newErrors.message = 'El mensaje no puede estar vacío'

        // Guardamos los errores encontrados en el estado
        setErrors(newErrors)

        // Si el objeto no tiene llaves, no hay errores y retorna true
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        // 3. Revisar validación
        if (!validateForm()) return

        console.log("Datos a enviar:", { name, email, message })

        // 4. Usar las funciones setter en lugar de asignar a variables
        setIsSubmitting(true)

        // Simulamos envío al servidor
        setTimeout(() => {
            setIsSubmitting(false)
            setIsSuccess(true)

            // Limpia los campos cuando el envío es exitoso
            setName('')
            setEmail('')
            setMessage('')
        }, 2000)
    }

    // 5. El efecto es útil para reestablecer "isSuccess" automáticamente sin afectar otros flujos
    useEffect(() => {
        if (isSuccess) {
            const timer = setTimeout(() => {
                setIsSuccess(false)
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [isSuccess]) // Se ejecuta sólo cuando isSuccess cambia

    const isFormValid = name.trim() && email.includes('@') && message.trim()

    // 6. ¡Faltaba retornar los datos! El componente solo puede usar lo que el hook retorna
    return {
        name,
        email,
        message,
        errors,
        isSubmitting,
        isSuccess,
        isFormValid,
        handleChange,
        handleSubmit
    }
}