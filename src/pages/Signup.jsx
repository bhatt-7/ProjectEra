import React from 'react'
import SignupForm from '../components/Auth/SignupForm'

const Signup = () => {
  return (
    <div className='h-[60vh] flex items-center justify-center'>
      <div className='border-2 p-7 rounded-xl shadow-xl'>
      <SignupForm/>
      </div>
    </div>
  )
}

export default Signup