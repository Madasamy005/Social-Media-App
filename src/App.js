import React, { useEffect, useState } from 'react'
import { Routes,Route, useNavigate } from 'react-router-dom'
import Header from './Header'
import Nav from './Nav'
import Home from './Home'
import NewPost from './NewPost'
import PostPage from './PostPage'
import About from './About'
import Missing from './Missing'
import Footer from './Footer'
//import  api from "./api/posts"
import UseWindowSize from './hooks/UseWindowSize'
// import useAxiosFetch from './hooks/useAxiosFetch'

import { format } from 'date-fns'

function App(){
  const [posts,SetPosts]=useState([
  
    {
      id:1,
      title:"1st post",
      datetime:"July 1 2002 11:17 AM",
      body:"i am maddy mahesh"
    },
    {
      id:2,
      title:"2nd Post",
      datetime:"july 1 2002 11:17 AM",
      body:" i attended a datascience workshop"
    },
    {
      id:3,
      title:"3rd post",
      datetime:"July 1 2002 11:17 AM",
      body:"i am maddy mahesh"
    },
    {
      id:4,
      title:"4th post",
      datetime:"July 1 2002 11:17 AM",
      body:"i am maddy mahesh"
    },
  ])
   const [search,setSearch]=useState('')
   const[searchResults,setSearchResults]=useState([])
   const[postTitle,setPostTitle]=useState('')
   const[postBody,setPostBody]=useState('')
   const navigate=useNavigate();
   const {width}=UseWindowSize();
  //  const {data,fetchError,isLoading}=useAxiosFetch('http://localhost:3500/posts')


  //  useEffect(()=>{
  //   SetPosts(data);

  //  },[data])
  

   useEffect(()=>{
    const filterdResults=posts.filter((post)=>
    ((post.body).toLowerCase()).includes(search.toLowerCase())
    ||((post.title).toLowerCase()).includes(search.toLowerCase()));

    setSearchResults(filterdResults.reverse());
   },[posts,search])

   const handleSubmit=(e)=>{
    e.preventDefault();
    const id=posts.length ? posts[posts.length-1].id+1 : 1;
    const datetime=format(new Date(),'MMMM  dd, yyyy pp');
    const newPost={id,title:postTitle,datetime,body:postBody};
    const allPosts=[...posts,newPost]
    SetPosts(allPosts);
    setPostTitle('');
    setPostBody('');
    navigate("/")
    }

    const handleDelete =(id) =>{
      const postsList=posts.filter(post => post.id !==id);
      SetPosts(postsList)
      navigate("/")
      
    }
  return(
    <div className="App">
      {/* <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
         
          <li><Link to="/postpage">Postpage</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route  path="/" element={<Home />}/>
        <Route  path="/about" element={<About />}/>
        <Route  path="/newpost" element={<NewPost/>}/>
        <Route path='/postpage'  element={<PostLayout/>}>
        <Route  index element={<PostPage/>}/>
        <Route  path=":id" element={<Post/>}/>
        <Route  path="newpost" element={<NewPost/>}/>
        </Route>
        <Route  path="*" element={<Missing />}/>
      </Routes> */}
      <Header  title="Maddy Social Media" width={width}/>
      <Nav 
        search={search}
        setSearch={setSearch}
      />
      <Routes>
    <Route path='/' element =
    {
    <Home 
    posts={searchResults}
    // fetchError={fetchError}
    // isLoading={isLoading}
    />}/>

      <Route path='post'>
      
        <Route index element={<NewPost
      handleSubmit={handleSubmit}
      postTitle={postTitle}
      setPostTitle={setPostTitle}
      postBody={postBody}
      setPostBody={setPostBody}

      
      />}/>
      <Route path=':id' element={<PostPage posts={posts} handleDelete={handleDelete}/>}/>
      </Route>
    
     <Route path='about' element={ <About />}/>
      <Route path='*' element ={<Missing />}/>
      </Routes>
      <Footer />
    

    </div>
  )
} 
export default App