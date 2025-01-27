import React from 'react'
import './Home.css'
import UserForm from '../UserForm/UserForm'


const HomePage = () => {
  return (
    <>
    <div className="home-container">
    <h1 className="main-heading">User Managment Application</h1>
        <UserForm/>
    </div>
    </>
  )
}

export default HomePage