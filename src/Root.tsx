import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { Basket } from './components/Basket/Basket';
import { Tablets } from './components/Tablets/Tablets';
import { Home } from './components/HomePage/Home';
import { Favourite } from './components/Favourite/Favourite';
import { DetailPage } from './components/DetailPage/DetailPage';
import { PhonesPages } from './components/PhonesPages/PhonesPages';
import { Accessories } from './components/Accessories/Accessoires';
import { GoodsProvider } from './Context/GoodsContext';
import { TabletDetailPage } from
  './components/TabletDetailPage/TabletDetailPage';

export const Root = () => (
  <Router>
    <GoodsProvider>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/:id" element={<DetailPage />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Home/:id" element={<DetailPage />} />
        <Route path="/Phones" element={<PhonesPages />} />
        <Route path="/Tablets" element={<Tablets />} />
        <Route path="/Tablets/:id" element={<TabletDetailPage />} />
        <Route path="/Accessories" element={<Accessories />} />
        <Route path="/Cart" element={<Basket />} />
        <Route path="/Favourite" element={<Favourite />} />
        <Route path="/Favourite/:id" element={<DetailPage />} />
        <Route path="/Phones/:id" element={<DetailPage />} />
        <Route path="/Home/:id" element={<DetailPage />} />
        <Route path="/:id" element={<DetailPage />} />
        <Route path="*" element={<p>НЕДОСТУПНА СТОРІНКА</p>} />
      </Routes>
    </GoodsProvider>
  </Router>
);
