import { url } from "./api"
import axios from "axios"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const Category = (props) => {

    const [ categories, setCategories ] = useState(false)

    useEffect(() => {
        axios.get( url + `wp/v2/categories/${props.categoryID}` )
        .then((response) => {
            setCategories(response.data)
        })
    }, [props.categoryID])

    return(
        <span className="font-md">{categories == false ? "Yüklənir..." : <Link to={`/category/${categories.id}`} className="border border-[rgba(0,0,0,0.4)] shadow-3xl py-2 px-4">{categories.name}</Link> }</span>
    )
}

const Tag = (props) => {

    const [ tag, setTag ] = useState(false)

    props.tag == null ? "" : useEffect(() => {
        axios.get( url + `wp/v2/tags/${props.tag}` )
        .then((response) => {
            setTag(response.data)
        })
    }, [props.tag])

    return(
        <span>
            <Link to={`/tag/${tag.id}`}>
                #{tag.name}
            </Link>
        </span>
    )
}

export { Category, Tag }