import Header from './components/Header';
import Footer from './components/Footer'

import { HomePage } from './pages/Home';
import { SearchPage } from './pages/Search';
import { NotFoundPage } from './pages/404';


function App() {
  const { pathname } = window.location

  return (
    <>
      <Header />
      {pathname === '/' && <HomePage />}
      {pathname === '/search' && <SearchPage />}
      {pathname !== '/' && pathname !== '/search' && <NotFoundPage />}
      <Footer />
    </>
  )
}

export default App
