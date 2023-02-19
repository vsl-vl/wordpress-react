import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { CONTEXT, url } from "./api"

export default function TagsPage () {

    const [ posts, setPosts ] = useState(false)
    const { pos, setPos } = useContext(CONTEXT)
    const [ page, setPage ] = useState(10) 

    const { id } = useParams();
    const catSlug = id == null ? `wp/v2/posts?per_page=${page}` : `wp/v2/posts?per_page=${page}&tags=${id}`

    useEffect(() => {
        axios.get( url + catSlug )
        .then((response) => {
            setPosts(response.data)
        })
    }, [id, page])

    return(
        <div>
            <h1 className="text-header font-bold my-6">Postlar</h1>
            <div>
                {posts == false ? "Yüklənir..." : (
                    posts.map((post) => 
                        <div key={post.id} onClick={() => {setPos(true)}} className="border-[1px] border-[rgba(0,0,0,0.2)] py-4 px-6 my-2 rounded-md flex flex-col gap-2 shadow-3xl">
                            <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} className="text-mdHeader font-bold mt-3" />
                            <p dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} className="text-smHeader font-md" />
                            <span className="text-smHeader">{ post.date }</span>
                            <Link to={ `/post/${post.id}` } className="text-lg font-bold text-sky-600">Ətraflı Oxu</Link>
                        </div>
                    )
                )}
            </div>

            <div className="flex justify-center my-5">
                <button onClick={() => {setPage(page + 5)}} className="border border-indigo-600 text-indigo-600 px-6 py-3 hover:text-white hover:bg-indigo-600">Daha çox yüklə</button>
            </div>

        </div>
    )
}