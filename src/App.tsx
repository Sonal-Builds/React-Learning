import { createContext, useContext } from 'react'
import './App.css'
import FileExplorer from './components/FileExplorer'
import OtpInput from './components/OtpInput'
import ProgressBar from './components/ProgressBar'
import UseContextHook from './hooks/UseContext'
import UseEffectHook from './hooks/UseEffect'
import UseStateHook from './hooks/UseState'

export const userName = createContext('Sonal')
function App() {


  return (
    <>
       {/* <OtpInput />  */}
       {/* <ProgressBar progress={50} /> */}
       {/* <FileExplorer /> */}
       {/* <UseStateHook /> */}
       {/* <UseEffectHook /> */}
       <userName.Provider value='Amala'>
          <UseContextHook />
       </userName.Provider>
       
    </>
  )
}

export default App
