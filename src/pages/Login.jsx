import React from 'react'
import LoginForm from '../components/Auth/LoginForm'
function Login() {
  return (
    <div className='h-[60vh] flex items-center justify-center'>
      <div className='border-2 p-7 rounded-xl shadow-xl'> 
          <LoginForm/>
      </div>
    </div>
  )
}

export default Login