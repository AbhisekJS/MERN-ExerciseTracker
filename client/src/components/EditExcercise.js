import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useParams, Redirect, useHistory} from 'react-router-dom'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function EditExercise() {

const initialState= {
      username: '',
      description: '',
      duration: 0,
      date: new Date(),
      users: []
}
const [state,setState]=useState(initialState);
const {id}=useParams();
const [loading,setLoading]=useState(true);
const history = useHistory()

  useEffect(()=>{

    axios.get('http://localhost:5000/api/users/')
      .then(response => {
        if (response.data.length > 0) {
          setState({
              ...state,
            users: response.data.map(user => user.username),
          })
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      })  

    axios.get('http://localhost:5000/api/exercises/'+id)
      .then(response => {
        
        setState({
            ...state,
          username: response.data.username,
          description: response.data.description,
          duration: response.data.duration,
          date: new Date(response.data.date)
        })
      })
      .catch (error=> {
        console.log(error);
      })

      

  },[loading])

 function handleChange(e){
    const value= e.target.value;
    setState({
        ...state,
        [e.target.name]:value
    })
 }

  function handleSubmit(e) {
    e.preventDefault();

    const exercise = {
      username: state.username,
      description: state.description,
      duration: state.duration,
      date: state.date
    }

    console.log(exercise);

    axios.post('http://localhost:5000/api/exercises/update/' + id, exercise)
      .then(res => console.log(res.data));
     
    history.push('/')
     
  }
  

  return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select
              required
              className="form-control"
              name="username"
              value={state.username}
              onChange={handleChange}>
              {
                state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              name="description"
              value={state.description}
              onChange={handleChange}
              />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input 
              type="text" 
              className="form-control"
              name="duration"
              value={state.duration}
              onChange={handleChange}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              name="date"
              selected={state.date}
              onChange={date=>setState({
                ...state,
                date:date
              })}
            />
          </div>
        </div>

        <div className="form-group mt-2">
          <input type="submit" value="Update Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
