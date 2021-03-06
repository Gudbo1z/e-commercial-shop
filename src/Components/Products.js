import Product from "./Product";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { actionCategory } from "../store/categorySlice";
import { Route, Routes, useSearchParams } from "react-router-dom";
import Page from "./Page";
import Aside from "../Components/Aside";
import { useEffect } from "react";
import ProductRender from "./ProductRender";

function Products(){
    const data = useSelector(state => state.dataProduct.newValue)
    const dispatch = useDispatch()
    const [firstProduct, setFirstProduct] = useSearchParams(1)
    const productAmout = 6
    const firstValue = ()=>{
        if(firstProduct.get('page')) return ((firstProduct.get('page'))-1)*productAmout
        else return 0
    }
    const pageNumber = Math.ceil(data.length/productAmout)
    const dataPerPage = data.slice(firstValue(), productAmout+firstValue())
    const isChoose = useSelector(state => state.categorySlice.isChoose)
    const pageNumberRender = ()=>{
        let number = []
        for(let i=0; i<pageNumber; i++){
            number = [...number, i]
        }
        return number
    }

    function changepage(event){
        window.scroll(0,0)
        setFirstProduct({page: parseInt(event.target.id)+1})
    }

    const dataProductRender = dataPerPage.map((product, index) => {
        const {id, name, price, img, status, category} = product
        return (
            <Product
                key = {index}
                id = {id}
                name = {name}
                img = {img}
                price = {price}
                status = {status}
                category = {category}
            />
        )
    })

    return(
        <>
        <Aside/>
        <div className="products">
            <div className="products-main">
                <div className="products-main-child">
                    <Routes>
                        <Route path="/" element={dataProductRender}></Route>
                    </Routes>
                </div>
                <div className="pages-number">
                    <div className="pages-number-main">
                        {pageNumberRender().map((item, index) => (
                            !firstProduct.get('page')? 
                            index == 0?<p onClick={changepage} id={index} key={index} style={{backgroundColor:'black', color:'white'}} >{item+1}</p>: <p onClick={changepage} id={index} key={index} style={{backgroundColor:'white', color:'black'}} >{item+1}</p>
                            :<p onClick={changepage} id={index} key={index} style={firstProduct.get('page') == index+1?{backgroundColor:'black', color:'white'}: {backgroundColor:'white', color:'black'}} >{item+1}</p>
                        ))}
                    </div>
                </div>
            </div>
        </div></>
    )
}
export default Products;