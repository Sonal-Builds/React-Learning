import { createContext, useContext } from 'react'
import './App.css'
import FileExplorer from './components/FileExplorer'
import OtpInput from './components/OtpInput'
import ProgressBar from './components/ProgressBar'
import UseContextHook from './hooks/UseContext'
import UseEffectHook from './hooks/UseEffect'
import UseStateHook from './hooks/UseState'
import TabForm from './Machine Coding/Tab Form Component/TabForm'
import Autocomplete from './Machine Coding/Autocomplete Search Bar/AutoComplete'
import ThrottledScroll from './Machine Coding/Autocomplete Search Bar/Test'
import DragDrop from './Machine Coding/Drag&Drop/DragDrop'
import Accordion from './Machine Coding/Accordion'

export const userName = createContext('Sonal')
function App() {


  return (
    <>
       {/* <OtpInput />  */}
       {/* <ProgressBar progress={50} /> */}
       {/* <FileExplorer /> */}
       {/* <UseStateHook /> */}
       {/* <UseEffectHook /> */}
       {/* <userName.Provider value='Amala'>
          <UseContextHook />
       </userName.Provider> */}
       {/* <TabForm /> */}
       {/* <Autocomplete /> */}
       {/* <ThrottledScroll /> */}
       {/* <DragDrop /> */}
       <Accordion />
       
    </>
  )
}

export default App
