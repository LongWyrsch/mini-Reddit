import './App.css';
// import ROUTES from './routes';
import {
BrowserRouter as Router,
Routes,
Route,
// NavLink,
// useRouteMatch,
useParams
} from 'react-router-dom'
import { Filters } from '../components/Filters';
import { Posts } from '../features/posts/Posts';
import {TopBanner} from '../components/TopBanner'
import {PostDetails} from '../features/posts/PostDetails'
import { useDispatch, useSelector } from 'react-redux';
import {getPosts} from '../features/posts/postsSlice'
import { selectPosts} from '../features/posts/postsSlice'
import {useEffect} from 'react'

function App() {
  
  console.log('Component App rendered')

  return (
    <div className='app'>
      <Router>
        <TopBanner />
        <Filters />
        <Routes>
          <Route index element={<Posts/>} />
          <Route path='/:firstFilter' element={<Posts/>}/>
          <Route path='/:firstFilter/:permalink' element={<PostDetails/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

      // <Routes>
      //   <Route path='/' element={<h1>main page</h1>} />
      //   <Route path='/firstpage' element={<Firstpage />} />
      //   <Route path='/secondpage' element={<Secondpage />}/>
      // </Routes>