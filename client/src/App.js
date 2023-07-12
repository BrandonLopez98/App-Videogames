import { Route,useLocation } from 'react-router-dom'
import LandingPage from './componets/Landing/Landing'
import Nav from './componets/Nav/Nav'
import About from './componets/About/About'
import Form from './componets/Form/Form'
import Home from './componets/Home/Home'
import Detail from './componets/Detail/Detail'




function App() {
  const location = useLocation()
  return (
    <div className="App">
        {location.pathname === '/' ? <LandingPage /> : <Nav/>}
        <Route path='/home' component={Home} />
        <Route path='/about' component={About} />
        <Route path='/create' component={Form} />
        <Route path='/detail/:id' component={Detail} />
    </div>
  );
}

export default App;


