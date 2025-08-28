import { useEffect, useState } from "react";



export default function TablePagination() {

    type Products = {
        id:number,
        title:string,
        price:number
    }

    const [products, setProducts] = useState<Products[]>([])
    const [dropDownCount, setDropDownCount] = useState(5)
    const [currentPage, setCurrentPage] = useState(1)


    useEffect(() => {
        fetch('https://dummyjson.com/products?limit=100')
        .then((response) => response.json())
        .then((data) => setProducts(data.products))
    },[])

    const totalPage = Math.ceil(products.length / dropDownCount)
    const startIndex = (currentPage - 1) * dropDownCount
    const EndIndex = startIndex + dropDownCount
    const displayProduct = products.slice(startIndex,EndIndex)

    console.log(dropDownCount)

    return (
        <div style={{margin:'0 auto', width:'50%'}}>
            <table border={1} style={{width:'100%'}}>
                <thead>
                    <tr style={{textAlign:'center'}}>
                        <th>Product ID</th>
                        <th>Product Title</th>
                        <th>Product Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        displayProduct.map((item:Products) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>{item.price}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                <div>
                    <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>Previous</button>
                    <span>{currentPage} of {totalPage}</span>
                    <button disabled={currentPage === totalPage} onClick={() => setCurrentPage(prev => prev + 1)}>Next</button>
                </div>
                <div>
                    <select onChange={(e) => {
                        setDropDownCount(Number(e.target.value))
                        setCurrentPage(1)
                    }}>
                   { [5,10,15,20].map((item,i) => (
                    <option key={i}value={item}>{item}</option>
                   ))}
                    </select>
                </div>
            </div>
        </div>
    )
}