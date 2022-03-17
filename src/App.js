import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Container from './components/layout/Container';
import Company from './components/pages/Company';
import Contact from './components/pages/Contact';
import Home from './components/pages/Home';
import NewProject from './components/pages/NewProject';

function App() {
  return (
    <Router>
      <div>
        <Link to="/">Home</Link>
        <Link to="/company">Company</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/newproject">New Project</Link>
      </div>

      {/* Elementos filhos que são o children no arquivo Container.js */}
      <Container customClass="minHeight">
        <Routes>
          {/* pra acessar a home sempre que a rota tiver somente / */}
          <Route exact path="/" element={<Home />} />
          <Route exact path="/company" element={<Company />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/newproject" element={<NewProject />} />
        </Routes>
      </Container>

      <p>Footer</p>
    </Router>
  );
}

export default App;
