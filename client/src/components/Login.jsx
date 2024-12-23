import React, { use, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [username, setUsername] = useState(null)
    const [password, setpassword] = useState(null)

    const url = 'http://localhost:1000'

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch(`${url}/ligin`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })
            const data = res.json()
            console.log(data);
            navigate('/home')
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={e => setUsername(e.target.value)} placeholder='username' />
                <input type="password" onChange={e => setpassword(e.target.value)} placeholder='password' />
                <button type='submit'>submit</button>
            </form>
        </div>
    )
}
