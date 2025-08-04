export default function AccordionList({list,index,handleClick, activeIndex}) {
    console.log(list)
    return (
        <>
        <div key={index} className="accordion-list">
            <button onClick={() => handleClick(index)} className="accordion-title">{list.Name}
                <span>{`<`}</span>
            </button>
        </div>
       {index === activeIndex && <p className="accordion-content">{list.des}</p>}
        </>
       
    )
}