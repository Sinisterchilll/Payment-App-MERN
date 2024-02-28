import { BrowserRouter , Routes , Route } from "react-router-dom"
function App() {

  return (
    <div>
        <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/signin" element={<Signin />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/send" element={<Sendmoney />} />
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
