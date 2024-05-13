import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const PostLayout = () => {
  return (
    <>
    <li><Link to="/postpage/1">Post 1</Link></li>
    <br />
    <li><Link to="/postpage/2">Post 2</Link></li>
    <br />
    <li><Link to="/postpage/3">Post 3</Link></li>
    <br />
    <li><Link to="/postpage/newpost">Newpost</Link></li>
    <Outlet />
    </>
  )
}

export default PostLayout