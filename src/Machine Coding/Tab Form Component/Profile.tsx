

export default function Profile({form,setForm}:any) {


    const HandleChange = (e:any,field:any) => {
        setForm({
            ...form,[field]:e.target.value
        })
    }

    return(
        <>
        <div >
            <label>Name : </label>
            <input type="text" value={form.name} onChange={(e)=>{HandleChange(e,'name')}} />
        </div>
        <div>
            <label>Name : </label>
            <input type="number" value={form.age} onChange={(e)=>{HandleChange(e,'age')}}/>
        </div>
        <div>
            <label>Name : </label>
            <input type="text" value={form.email} onChange={(e)=>{HandleChange(e,'email')}}/>
        </div>
        </>
    )
}