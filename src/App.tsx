import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styles from './App.module.css';

const Gramophone = lazy(() => import('./components/Gramophone'));
const Home = lazy(() => import('./pages/Home'));
const TheEmergence = lazy(() => import('./pages/TheEmergence'));
const IntelligenceSingularity = lazy(() => import('./pages/IntelligenceSingularity'));
const CollapseOfCapitalism = lazy(() => import('./pages/CollapseOfCapitalism'));

function App() {
  return (
    <Router basename="/">
      <div className={styles.appWrapper}>
        <Suspense fallback={null}>
          <Gramophone />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/the-emergence" element={<TheEmergence />} />
            <Route path="/intelligence-singularity" element={<IntelligenceSingularity />} />
            <Route path="/collapse-of-capitalism" element={<CollapseOfCapitalism />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
