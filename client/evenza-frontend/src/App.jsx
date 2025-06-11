// import intro from '../components/intro'
import "./App.css";

function App() {
  return (
    <>
      <div className='text-white w-screen h-full bg-black m-0 p-0 flex flex-row items-center justify-between gap-[20px]'>
        <div className='text-xl font-md p-6 ml-4'>EVENZA</div>
        <ul className="flex flex-row gap-[20px] p-6 mr-4">
          <li>Home</li>
          <li>Services</li>
          <li>Work</li>
          <li>About Us</li>
        </ul>
      </div>
    </>
  )
}

export default App;
