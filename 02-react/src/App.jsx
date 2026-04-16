import Header from './components/Header';
import Breadcrumbs from './components/Breadcrumbs';
import Footer from './components/Footer'

import { HomePage } from './pages/Home';
import { SearchPage } from './pages/Search';
import { NotFoundPage } from './pages/404';
import { Route } from './components/Route';
import { ContactPage } from './pages/Contact';


function App() {
  return (
    <>
      <Header />
      <Breadcrumbs />
      <Route path="/" component={HomePage} />
      <Route path="/search" component={SearchPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="*" component={NotFoundPage} />
      <Footer />
    </>
  )
}

export default App
