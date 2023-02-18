import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { CONTEXT, url } from "./api"
import { Link } from "react-router-dom"

export default function Logo () {

    const [ logo, setLogo ] = useState(false)
    const { pos, setPos } = useContext(CONTEXT)

    useEffect(() => {
        axios.get( url )
        .then((response) => {
            setLogo(response.data.name)
        })
    }, [])

    return(
        <div onClick={() => { setPos(true) }}>
            <Link to="/">
                <h1 className="font-medium text-lg uppercase">{ logo == false ? "" : logo }</h1>
            </Link>
        </div>
    )
}