import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { url } from "./api"
import { Link } from "react-router-dom"
import { Category, Tag } from "./info"

export default function Post () {

    const [ post, setPost ] = useState(false)
    const [ featuredImage, setFeaturedImage ] = useState(false)
    const [ catPosts, setCatPosts ] = useState(false)
    //Filter Current Post from Array
    const postArray = catPosts == false ? false : catPosts;
    const resultArray = postArray == false ? false : postArray.filter(function({id}){ return id != post.id })
    //Filter Current Post from Array
    const { id } = useParams()

    useEffect(() => {
        axios.get( url + `wp/v2/posts/${id}` )
        .then((response) => {
            setPost(response.data)
        })
    }, [id])

    useEffect(() => {
        post == false ? "" :
        post.featured_media < 1 ? setFeaturedImage(true) : axios.get( url + `wp/v2/media/${post.featured_media}` )
        .then((response) => {
            setFeaturedImage(response.data)
        })
    }, [post])

    useEffect(() => {
        post == false ? "" :
        axios.get( url + `wp/v2/posts?per_page=11&categories=${post.categories[0]}` )
        .then((response) => {
            setCatPosts(response.data)
        })
    }, [post])

    return(
        <div className="flex flex-col md:flex-row w-full gap-6">
            {post == false ? "Yüklənir..." : (
                <div className="flex flex-col gap-5 w-full md:w-[75%]">
                    <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} className="text-medHeader font-bold mt-4" />
                    <Category categoryID = {post.categories} />
                    <div>
                        <span>Taglar:</span>
                        {post.tags.map((tag) => 
                            <span className="border border-[rgba(0,0,0,0.4)] shadow-3xl py-2 px-4 mx-1">
                                <Tag tag={tag} />
                            </span>
                        )}
                    </div>
                    { featuredImage == false ? "Yüklənir..." : featuredImage == true ? "" : <img src={ featuredImage.source_url } className="rounded-md h-[400px] object-cover" /> }
                    <p dangerouslySetInnerHTML={{ __html: post.content.rendered }} className="flex flex-col edited-wp-content" />
                </div>
            )}
            <div className="w-full md:w-[20%]">
                { resultArray == false ? "" : (
                    <>
                    <h1 className="text-medHeader font-bold mt-4 mb-3">Bənzər Postlar</h1>
                    {resultArray.map((catPost) => 
                        <Link to={`/post/${catPost.id}`} key={catPost.id}>
                            <h1 dangerouslySetInnerHTML={{ __html: catPost.title.rendered}} className="truncate my-2 text-sky-600" />
                        </Link>
                    )}
                    </>
                ) }
            </div>
        </div>
    )
}