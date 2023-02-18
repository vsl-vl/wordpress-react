import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { CONTEXT, url } from "./api"
import Logo from "./logo"
import { NavLink } from "react-router-dom"

export default function Navbar () {

    const [ categories, setCategories ] = useState(false)
    const { pos, setPos } = useContext(CONTEXT)

    useEffect(() => {
        axios.get( url + "wp/v2/categories?per_page=100" )
        .then((response) => {
            setCategories(response.data)
        })
    }, [])

    return(
        <div className="w-full h-[100px] fixed top-0 left-0 right-0 border-b-[1px] border-[rgba(0,0,0,0.3)] bg-primary z-50">
            <div className="max-w-primary mx-auto flex items-center h-full justify-between relative px-5">
                <Logo />
                <div onClick={() => {setPos(!pos)}} className="w-[40px] h-[40px] flex justify-center items-center flex-col gap-1 cursor-pointer">
                    <span className="w-[30px] h-[2px] bg-white"></span>
                    <span className="w-[30px] h-[2px] bg-white"></span>
                </div>
                <div className={`absolute top-[123px] ${pos ? "hidden" : "flex"} flex-col right-5 bg-primary shadow shadow-3xl p-5 rounded-lg items-end max-h-[500px] overflow-scroll nav-edited`}>
                    <h1 className="font-bold text-xl">Kateqoriyalar</h1>
                    {categories == false ? "Yüklənir..." : (
                        categories.map((category) => 
                            <NavLink to={`/category/${category.id}`} key={category.id} onClick={() => {setPos(true)}} className="py-1 text-md font-medium">
                                <span>{category.name}</span>
                            </NavLink>
                        )
                    )}
                </div>
            </div>
        </div>
    )
}