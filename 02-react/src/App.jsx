import JobCard from './components/JobCard';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {

  return (
    <>
      <Header />
      <main>
        <section className="jobs-search">
          <h1>Encuentra tu próximo trabajo</h1>
          <p>Explora miles de oportunidades en el sector tecnológico.</p>

          <form role="search">
            <div className="search-bar">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-search">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                <path d="M21 21l-6 -6" />
              </svg>

              <input required type="text" placeholder="Buscar trabajos, empresas o habilidades" />
            </div>

            <div className="search-filters">
              <select name="technology" id="filter-technology">
                <option value="">Tecnología</option>
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="react">React</option>
                <option value="nodejs">Node.js</option>
              </select>

              <select name="location" id="location">
                <option value="">Ubicación</option>
                <option value="remoto">Remoto</option>
                <option value="cdmx">Ciudad de México</option>
                <option value="guadalajara">Guadalajara</option>
                <option value="monterrey">Monterrey</option>
                <option value="barcelona">Barcelona</option>
              </select>

              <select name="experience-level" id="experience-level">
                <option value="">Nivel de experiencia</option>
                <option value="junior">Junior</option>
                <option value="mid">Mid-level</option>
                <option value="senior">Senior</option>
                <option value="lead">Lead</option>
              </select>
            </div>
          </form>
        </section>

        <section>
          <h2>Resultados de búsqueda</h2>

          <div className="jobs-listings">
            <JobCard
              job={{
                id: 1,
                title: "Ingeniero de Software",
                company: "Tech Solutions Inc.",
                location: "Remoto",
                salary: "$100,000 - $120,000",
                description: "Buscamos un ingeniero de software con experiencia en desarrollo web y conocimientos en JavaScript, React y Node.js. El candidato ideal debe ser capaz de trabajar en equipo y tener buenas habilidades de comunicación.",
                tags: ["JavaScript", "React", "Node.js"],
              }}
            />
            <JobCard
              job={{
                id: 2,
                title: "Ingeniero QA Automation",
                company: "Global Logic",
                location: "Remoto",
                salary: "$1500 - $2000",
                description: "Buscamos un ingeniero QA Automation con experiencia en desarrollo web y conocimientos en JavaScript, Playwright y Cypress. El candidato ideal debe ser capaz de trabajar en equipo y tener buenas habilidades de comunicación.",
                tags: ["JavaScript", "Playwright", "Cypress"],
              }}
            />
            <JobCard
              job={{
                id: 3,
                title: "Ingeniero Backend",
                company: "Enterprise Solutions",
                location: "Presencial",
                salary: "$2500 - $3000",
                description: "Buscamos un ingeniero backend con experiencia en desarrollo web y conocimientos en Python, Django y Flask. El candidato ideal debe ser capaz de trabajar en equipo y tener buenas habilidades de comunicación.",
                tags: ["Python", "Django", "Flask"],
              }}
            />
            <JobCard
              job={{
                id: 4,
                title: "Ingeniero Frontend",
                company: "Enterprise Solutions",
                location: "Presencial",
                salary: "$2500 - $3000",
                description: "Buscamos un ingeniero frontend con experiencia en desarrollo web y conocimientos en JavaScript, React y Node.js. El candidato ideal debe ser capaz de trabajar en equipo y tener buenas habilidades de comunicación.",
                tags: ["JavaScript", "React", "Node.js"],
              }}
            />


          </div>

          <nav className="pagination">
            <a href="#"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M15 6l-6 6l6 6" />
            </svg></a>
            <a className="is-active" href="#">1</a>
            <a href="#">2</a>
            <a href="#">3</a>
            <a href="#">4</a>
            <a href="#">5</a>
            <a href="#"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M9 6l6 6l-6 6" />
            </svg></a>
          </nav>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default App
