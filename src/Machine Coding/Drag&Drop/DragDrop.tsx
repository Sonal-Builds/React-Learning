import { useCallback, useState } from "react";
import "./index.css";

const initialAvailable = [
  {id:'1',name:'Banana'},
  {id:'2',name:'Mango'},
  {id:'3',name:'Grape'},
  {id:'4',name:'Pinaple'},
  {id:'5',name:'Apple'},
  {id:'6',name:'Cherry'},
  {id:'7',name:'Kiwi'},

];

export default function DragDrop() {
  const [available, setAvailable] = useState<any>(initialAvailable);
  const [dropped, setDropped] = useState<any>([]);
  const [draggedItem, setDraggedItem] = useState<any>(null);
  const [draggedfrom, setDraggedfrom] = useState(null);

  const recorder = (list:any,dragedIndex:any, dropIndex:any) => {
          const result = [...list];
          const [removed] = result.splice(dragedIndex,1);
          result.splice(dropIndex,0,removed);
          return result
  };

  const handleDrop = useCallback((to:string,e:any) => {
    // e.preventDefault();
    if(draggedfrom === to) {
      const list = to === "available" ? available : dropped;
      const dragedIndex = list.findIndex((x:any) => x.id === draggedItem.id)
      const dropTargetId =  e.target.getAttribute("data-id")
      const dropIndex = list.findIndex((x:any) => x.id === dropTargetId)

     if(dropIndex === -1) {
      return
     }
     if(dragedIndex !== dropIndex) {
      const recordered = recorder(list,dragedIndex, dropIndex)
      if(to === "available")  setAvailable(recordered); else setDropped(recordered)
     }
    

    } else {
      if(to === 'available') {
        setAvailable([...available,draggedItem])
        setDropped((prev:any) => prev.filter((i:any) => i.id !== draggedItem.id))
      } else {
        setDropped([...dropped,draggedItem])
        setAvailable((prev:any) => prev.filter((i:any) => i.id !== draggedItem.id))
      }
    }
    
    
  },[draggedItem,draggedfrom,available,dropped])

  const handleDragStart = useCallback((item:any, from:any) => {
      setDraggedItem(item)
      setDraggedfrom(from)
  },[])

  const renderItem = (item:any,from:any) => (
        <div 
          key={item.id} 
          data-id={item.id}
          draggable 
          className="item"
          onDragStart={() => handleDragStart(item, from)}
        >{item.name}</div>
    )

const resetLists = () => {
  setAvailable(initialAvailable);
  setDropped([])
  setDraggedItem(null)
  setDraggedfrom(null)
}
   
  
    

      // console.log(dropped)
    
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
