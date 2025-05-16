import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import routes from './routes';
function App() {
  const showMain = (routes) => {
    let result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route key={index} path={route.path} exact={route.exact} element={<route.main />} />
        );
      });
    }
    return result;
  };

  return (
    <Router>
      <ToastContainer />
      <Routes>
        {showMain(routes)}
      </Routes>
    </Router>
  );
}

export default App;