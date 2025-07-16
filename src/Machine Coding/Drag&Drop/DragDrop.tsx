import { useCallback, useState } from "react";
import "./index.css";

const initialAvailable = [
  {id:'1',name:'Banana'},
  {id:'2',name:'Mango'},
  {id:'3',name:'Grape'},
  {id:'4',name:'Pinaple'},
  {id:'5',name:'Apple'},

];

export default function DragDrop() {
  const [available, setAvailable] = useState<any>(initialAvailable);
  const [dropped, setDropped] = useState<any>([]);
  const [draggedItem, setDraggedItem] = useState<any>(null);
  const [draggedfrom, setDraggedfrom] = useState(null);

  

  const handleDrop =(to:string,e:any) => {
    e.preventDefault();
    if(to === draggedfrom) {

    } else {
      if(to === 'available') {
        setAvailable([...available,draggedItem])
        setDropped((prev:any) => prev.filter((i:any) => i.id !== draggedItem.id))
      } else {
        setDropped([...dropped,draggedItem])
        setAvailable((prev:any) => prev.filter((i:any) => i.id !== draggedItem.id))
      }
    }
    
    
  }

  const handleDragStart = useCallback((item:any, from:any) => {
      setDraggedItem(item)
      setDraggedfrom(from)
  },[])

  const renderItem = (item:any,from:any) => (
        <div 
          key={item.id} 
          draggable 
          className="item"
          onDragStart={() => handleDragStart(item, from)}
        >{item.name}</div>
    )

const resetLists = () => {

}
   
  
    

      console.log(dropped)
    
  return (
    <div className="main-div">
      <header>
        <h1>Drag & Drop Fruits</h1>
        <button 
        className="reset-btn"
        onClick={resetLists}
        data-testid ="reset-button"
        >
          Reset Lists
        </button>
      </header>
      <div className="container">
          <div
           className="column"
           onDrop={(e) => handleDrop("available",e)}
           onDragOver={(e) => {e.preventDefault();}}
           data-testid ="available-column"
           >
              <h2>Available Fruits</h2>
              {available.length === 0 && <p className="empty">No fruits here</p>}
              {available.map((item:any) => renderItem(item,"available"))}
          </div>
          <div 
            className="column drop-zone"
            onDrop={(e) => handleDrop("dropped",e)}
            onDragOver={(e) => {e.preventDefault();}}
            data-testid ="dropped-column"
          >
              <h2>Dropped Fruits</h2>
              {dropped.length === 0 && <p className="empty">Drop fruits here</p>}
              {dropped.map((item:any) => renderItem(item,"dropped"))}
          </div>
      </div>
    </div>
  );
}
