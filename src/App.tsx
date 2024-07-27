import './App.css'
import { Card } from './components/Card'
import { Navbar } from './components/Navbar'

function App() {

  return (
    <>
     <Navbar />
     <h3 className='font-bold ml-10 mt-7 text-lg'>Home</h3>
     <div className="p-4  min-h-screen">
      <Card
        title="The Avengers"
        releaseDate="2012-04-25"
        rating={7.7}
        imageUrl="https://images5.alphacoders.com/573/573475.jpg"
      />
    </div>
    </>
  )
}

export default App
