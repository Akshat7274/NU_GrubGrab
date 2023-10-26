import React from 'react'
import { GoogleLogin } from 'react-google-login'

const Login = () => {
  return (
    <div id="signInButton">
        <GoogleLogin 
            clientId=''
        />
    </div>
  )
}

export default Login