function JobCard({ job }) {

    const { titulo, empresa, ubicacion, salary, descripcion, data } = job;
    return (
        <article className="job-card">
            <header className="job-card-header">
                <h3 className="job-title">{titulo}</h3>
                <p className="job-company">{empresa}</p>
            </header>

            <div className="job-card-body">
                <p className="job-location">📍 {ubicacion}</p>
                <p className="job-salary">💰 {salary}</p>
                <p className="job-description">{descripcion}</p>
            </div>

            <footer className="job-card-footer">
                <span className="job-tags">{Array.isArray(data.technology) ? data.technology.join(', ') : data.technology}</span>
                <button className="btn-apply">Aplicar</button>
            </footer>
        </article>
    )
}

export default JobCard