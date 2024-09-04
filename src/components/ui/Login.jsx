import { useState } from 'react'
import { Input } from './Input'
import axiosInstance from '../utils/axiosinstance'
import { Link } from 'react-router-dom'

const Login = () => {
  const [error, setError] = useState('')
  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const handleLogin = async e => {
    e.preventDefault()
    const { email, password } = data

    if (!email) {
      setError('Please enter your email address')
      return
    }
    if (!password) {
      setError('Please enter your password')
      return
    }
    setError('')

    try {
      const response = await axiosInstance.post('/login', {
        email: email,
        password: password
      })

      console.log(response);
      

      if (response.data && response.data.error) {
        setError(response.data.error)
        return
      }
      if (response.data && response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken)
        window.location.href = '/'
      }
      setData({
        email: '',
        password: ''
      })
      setError('Login successfully!')
      setTimeout(() => {
        setError('')
      }, 2000)
    } catch (error) {
      setError(error.response.data.error)
      console.log(error.response.data.error)
    }
  }

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <div className='absolute w-full flex items-center justify-center h-dvh '>
        <div className='container rounded'>
          <div className='container w-full max-w-96 bg-white relative pt-10 px-4'>
            <h2 className='bg-teal-500 text-3xl py-4 text-center text-white'>
              Log In
            </h2>
            {error && <p className='text-base text-white bg-red-400 py-2 w-full text-center mt-4'>{error}</p>}
            <Input
              title='Email Address'
              name='email'
              type='email'
              value={data.email}
              placeholder='Enter your email address'
              onChange={e => handleChange(e)}
            />
            <Input
              title='Password'
              name='password'
              type='password'
              value={data.password}
              placeholder='Enter password'
              onChange={e => handleChange(e)}
            />

            <button
              onClick={handleLogin}
              className='bg-teal-500 w-full py-2 rounded text-white active:bg-teal-400 hover:shadow-xl'
            >
              Login
            </button>

            <p className='w-full text-center mt-10 text-lg'>
              Dont have an account?{' '}
              <Link to='/signup'>
                <span className='text-teal-800'>Create an account</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
