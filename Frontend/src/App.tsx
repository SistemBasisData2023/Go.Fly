
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FlightsPage from './pages/FlightsPage';
// import NotFound from './pages/NotFound';
// import HomePage from './pages/HomePage';
// import TellerPage from './pages/TellerPage';
// import DeskChoosePage from './pages/DeskChoosePage';
// import DashboardPage from './pages/Dashboard';
// import TransactionFormPage from './pages/TransactionFormPage';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/flights" element={<FlightsPage />} />
        {/* <Route path="/" element={<HomePage />} />
        <Route path="/DeskChoose" element={<DeskChoosePage />} />
        <Route path="/Teller" element={<TellerPage />} />
        <Route path="/transaction" element={<TransactionFormPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  )
}

export default App
