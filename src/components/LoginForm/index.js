// Write your JS code here
import {useState} from 'react'
import {useHistory, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
// import {Redirect} from 'react-router-dom'

import './index.css'

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
    showSubmitErr: false,
    errorMsg: '',
  })

  const history = useHistory()

  const onChangeUsername = event => {
    setLoginData({...loginData, username: event.target.value})
    // console.log(username)
    // console.log(event.target.value)
  }

  const onChangePassword = event => {
    setLoginData({...loginData, password: event.target.value})
    // console.log(event.target.value)
  }

  const onSubmitSuccess = JWTToken => {
    Cookies.set('jwt_token', JWTToken, {expires: 1})
    // console.log(history)
    history.replace('/')
  }

  const onSubmitFailure = errorMessage => {
    setLoginData({...loginData, showSubmitErr: true, errorMsg: errorMessage})
  }

  const onFormSubmit = async event => {
    event.preventDefault()
    const {username, password} = loginData
    const userDetails = {username, password}
    // console.log(userDetails)

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    // console.log(response)

    const data = await response.json()
    console.log(data)

    if (response.ok === true) {
      onSubmitSuccess(data.jwt_token)
      console.log(data.jwt_token)
    } else {
      onSubmitFailure(data.error_msg)
    }
  }

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }

  return (
    <div className="login-form-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
        className="login-website-logo-mobile-img"
        alt="website logo"
      />
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
        alt="website login"
        className="login-img"
      />

      <div>
        <form className="form-container" onSubmit={onFormSubmit}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            alt="website logo"
            className="login-website-logo-desktop-img"
          />

          <div className="input-container">
            <label htmlFor="username" className="input-label">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              value={loginData.username}
              className="username-input-field"
              placeholder="Username"
              onChange={onChangeUsername}
            />
          </div>

          <div className="input-container">
            <label htmlFor="password" className="input-label">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              className="password-input-field"
              value={loginData.password}
              placeholder="Password"
              onChange={onChangePassword}
            />
          </div>
          <div className="btn-container">
            <button type="submit" className="login-button">
              Login
            </button>
          </div>
          {loginData.showSubmitErr && (
            <p className="error-message">*{loginData.errorMsg}</p>
          )}
        </form>
      </div>
    </div>
  )
}

export default LoginForm
