import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CoinsTable from './Components/CoinsTable';
import CartPage from './Components/CartPage';
import CoinModal from './Components/CoinModal';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<CoinsTable />} />
          <Route path="/" element={<CoinModal />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;