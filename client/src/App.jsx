import Navbar from "./components/layout/Navbar"
import Landing from "./components/layout/Landing"
import { BrowserRouter as Router , Routes,Route,Link} from "react-router-dom"
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App
