import JobCard from './JobCard';

export default function JobListings({ jobs }) {
    return (
        <>
            <h2 style={{ textAlign: 'center' }}>Resultados de búsqueda</h2>
            <div className="jobs-listings">
                {jobs.map(job => (
                    <JobCard key={job.id} job={job} />
                ))}
            </div>
        </>
    )
}