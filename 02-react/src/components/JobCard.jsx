import { useState } from "react";

function JobCard({ job }) {
    const [isApplied, setIsApplied] = useState(false);
    const { titulo, empresa, ubicacion, salary, descripcion, data } = job;
    const handleApplyClick = () => {
        setIsApplied(true);
    }

    const buttonClasses = isApplied ? 'button-apply-job is-applied' : 'button-apply-job';
    const buttonText = isApplied ? 'Aplicado' : 'Aplicar';

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
                <button className={buttonClasses} onClick={handleApplyClick}>{buttonText}</button>
            </footer>
        </article>
    )
}

export default JobCard