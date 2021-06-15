import React from "react"
import Header from "./components/Header"
import MainRoutes from "./routes/main-routes"

function App() {
  return (
    <div className="app"> 
      <Header />
      <MainRoutes /> 
    </div>
  )
}

export default App;