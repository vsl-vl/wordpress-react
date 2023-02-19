import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { CONTEXT } from "./Components/api";
import Homepage from "./Components/Home";
import Navbar from "./Components/Nav";
import Post from "./Components/Post";
import List from "./Components/List";
import Search from "./Components/Search";
import TagsPage from "./Components/TagPage";

export default function App () {

  const [ pos, setPos ] = useState(true)

  const parentProp = {
    pos,
    setPos
  }

  return(
    <CONTEXT.Provider value={parentProp}>
      <div className="bg-primary text-white">
        <Navbar />
        <div className="min-h-[50vh] mt-[100px] max-w-primary mx-auto px-5">
          <Search />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/category/:id" element={<List />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/tag/:id" element={<TagsPage />} />
          </Routes>
        </div>
    </div>
    </CONTEXT.Provider>
  )
}