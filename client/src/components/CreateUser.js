import React,{useState} from 'react'
import axios from 'axios'

export default function CreateUser(){
    const [username,setUsername]= useState('');

    const handleSubmit=(e)=>{
        e.preventDefault();

        const user={
            username,
        }

        axios.post('/api/users/add',user)
        setUsername('')
    }


    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <input  type="text"
                required
                className="form-control"
                value={username}
                onChange={e=>setUsername(e.target.value)}
                />
          </div>
          <div className="form-group mt-2">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
}