import { useState } from "react";
import AccordionList from "./AccordionList";
import "./style.css"

const list = [
    {Name:'Node.js',des:"It's a backend of JavaScript"},
    {Name:'React.js',des:"It's a Frontend of JavaScript"},
    {Name:'Redux.js',des:"It's a State Management of JavaScript"},
    {Name:'TypeScript',des:"It's a backend of JavaScript"},
    {Name:'React Native',des:"It's a Mobile Development of JavaScript"},
];

export default function Accordion() {
    const [accordionList, setAccordionList] = useState(list);
    const [activeIndex, setActiveIndex] = useState(null)

    const handleClick = (index) => {
        if(activeIndex === index) {
            setActiveIndex(null)
        } else {
            setActiveIndex(index)
        }
    }
    return (
         accordionList.map((item,index) => {
        return (
            <div className="accordion">
                <AccordionList list={item} index={index} handleClick={handleClick} activeIndex={activeIndex} />
            </div>
        )
    })
    )
   
    
}