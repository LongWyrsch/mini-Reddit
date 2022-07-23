import './App.css';
import {
BrowserRouter as Router,
Routes,
Route
} from 'react-router-dom'
import { Filters } from '../components/Filters';
import { Posts } from '../features/posts/Posts';
import {TopBanner} from '../components/TopBanner'
import {PostDetails} from '../features/posts/PostDetails'
import { NoMatch } from '../components/NoMatch'

function App() {
  
  // console.log('Component App rendered')

  return (
    <div className='app'>
      <Router>
        <TopBanner />
        <Filters />
        <Routes>
          <Route index element={<Posts/>} />
          <Route path='/hot' element={<Posts/>}/>
          <Route path='/new' element={<Posts/>}/>
          <Route path='/top' element={<Posts/>}/>
          <Route path='/rising' element={<Posts/>}/>
          <Route path='/search' element={<Posts/>}/>
          <Route path='/:firstFilter/*' element={<PostDetails/>} />
          <Route path='*' element={<NoMatch/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
