import { useState } from 'react'
import '../tabForm.css'
import Profile from './Profile'
import Interests from './Interests'
import Settings from './Settings'

export default function TabForm() {
    const [section,setSection] = useState(0)
    const [form, setForm] = useState({
        name:'sonal',
        age:'',
        email:'',
        hobbies:'',
        fruit:''
    })

    const Tab = [
        {
            name:"profile",
            component: Profile
        },
        {
            name:"Interests",
            component: Interests
        },
        {
            name:"Settings",
            component: Settings
        }
    ]

    const SelectedTab = Tab[section].component

     const HandleOnchange = (e:any,field:any) => {
            setForm({
                ...form,[field]:e.target.value
            })
    }
    console.log(form)

    return(
        <div className="main-tab">
            <div className="main-head">
                {
                    Tab.map((t,index) => (
                        <div key={index} onClick={() => {setSection(index)}} className='section'>{t.name}</div>
                    ))
                }
            </div>
            <div className='section-tab'>
                <SelectedTab form={form} setForm={setForm} HandleOnchange={HandleOnchange}/>
            </div>

            
        </div>

    )
}