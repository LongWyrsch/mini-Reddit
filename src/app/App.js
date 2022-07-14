import './App.css';
// import ROUTES from './routes';
import {
BrowserRouter as Router,
Routes,
Route
// NavLink,
// useRouteMatch,
} from 'react-router-dom'
import Firstpage  from '../components/Firstpage';
import Secondpage from '../components/Secondpage';
import TwoButtons from '../components/TwoButtons';

function App() {

  return (
    <Router>
      <TwoButtons/>
      <Routes>
        <Route path='/' element={<h1>main page</h1>} />
        <Route path='/firstpage' element={<Firstpage />} />
        <Route path='/secondpage' element={<Secondpage />}/>
      </Routes>
    </Router>
  );
}

export default App;
