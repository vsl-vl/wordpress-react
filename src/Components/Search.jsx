import axios from "axios";
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom";
import { url } from "./api";

export default function Search () {

    const [ inputData, setInputData ] = useState([])
    const [ searchResult, setSearchResult ] = useState(false);
    const [ focus, setFocus ] = useState(false)

    useEffect(() => {
        axios.get( url + `wp/v2/search/?search=${inputData}` )
        .then((response) => {
            setSearchResult(response.data)
        })
    }, [inputData]) 

    return(
        <div className="">
            <input onBlur={() => {inputData.length > 0 ? "" : setFocus(false)}} onFocus={() => {setFocus(true)}} placeholder="Axtar..." type={"search"} value={inputData} onChange={(e) => { setInputData(e.target.value) }} className={`bg-primary border border-[rgba(0,0,0,0.2)] outline-0 p-4 w-full my-2 rounded-md focus:shadow focus:shadow-3xl`} />
            <div className={`${focus ? "relative" : "hidden"} transition-500 w-full border border-[rgba(0,0,0,0.2)] rounded-md shadow shadow-3xl p-4`}>
                {inputData.length < 1 ? "Axtarış Nəticələri..."
                    :
                searchResult == false ? "" : (
                    searchResult.map((result) => 
                        <Link key={result.id} to={`/post/${result.id}`} onClick={() => {setFocus(false)}}>
                            <h1 dangerouslySetInnerHTML={{ __html: result.title }} className="text-sky-600 py-1 underline" />
                        </Link>
                    )
                )
                }
            </div>
        </div>
    )
}