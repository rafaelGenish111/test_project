import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';

export default function Register() {
    const [fname, setFname] = useState(null)
    const [lname, setLname] = useState(null)
    const [phone, setPhone] = useState(null)
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)

    const url = 'https://test-project-z7xy.onrender.com'

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch(`${url}/register`, {
                method: "POST",
                headers: {
                     'Content-Type': 'application/json'
                }, 
                body: JSON.stringify({fname, lname, phone, username, password})
            })
            const data = res.json()
            console.log(data);
            navigate('/login')
        } catch (error) {
            console.error(error)
        }

    }
  return (
      <div>
          <form onSubmit={handleSubmit}>
              <input type="text" onChange={e=>setFname(e.target.value)} placeholder='first name' />
              <input type="text" onChange={e=>setLname(e.target.value)} placeholder='last name' />
              <input type="text" onChange={e=>setPhone(e.target.value)} placeholder='phone' />
              <input type="text" onChange={e=>setUsername(e.target.value)} placeholder='email' />
              <input type="password" onChange={e => setPassword(e.target.value)} placeholder='password' />
              <button type='submit'>submit</button>
          </form>
    </div>
  )
}
