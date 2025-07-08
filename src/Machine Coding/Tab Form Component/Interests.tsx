

export default function Interests({form,setForm,HandleOnchange}:any) {


   

    return(
        <div >
         <div>
            <label>Hobbies : </label>
            <select value={form.hobbies} onChange={(e)=> {HandleOnchange(e,'hobbies')}}>
                <option disabled value="">Select one</option>
                <option>Cricket</option>
                <option>Badminton</option>
                <option>Swimming</option>
                <option>Footbal</option>
            </select>
         </div>
         <div>
            <label >Fruit : </label>
            <select id="fruit"  value={form.fruit} onChange={(e)=> {HandleOnchange(e,'fruit')}}>
                <option disabled value="">Select one</option>
                <option value="apple">Apple</option>
                <option value="banana">Banana</option>
                <option value="mango">Mango</option>
            </select>
         </div>
        </div>
    )
}