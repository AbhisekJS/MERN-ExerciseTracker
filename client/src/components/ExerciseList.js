import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { FaEdit, FaTrash} from "react-icons/fa";

const Exercise = ({data,deleteExercise}) => (

    <tr>
      <td>{data.username}</td>
      <td>{data.description}</td>
      <td>{data.duration}</td>
      <td>{data.date.substring(0,10)}</td>
      <td>
        <Link to={"/edit/"+data._id}><button className="btn btn-outline-secondary mx-2 "><FaEdit/></button></Link>  
        <button className="btn btn-outline-danger" onClick={() => { deleteExercise(data._id) }}><FaTrash/></button>
      </td>
    </tr>
  )

export default function ExerciseList(){

    const[exercises,setExercises] = useState([])
    const[loading,setLoading]=useState(false);

    useEffect(()=>{
        setLoading(true)
        axios.get(' http://localhost:5000/api/exercises/')
        .then(response => {
            setLoading(false)
            setExercises(response.data)
        })
    },[])

    const deleteExercise=(id)=>{
        axios.delete('http://localhost:5000/api/exercises/'+id)
          .then(response => { console.log(response.data)});
    
        setExercises(
            exercises.filter(data => data._id !== id)
        )
      }
      const ExerciseList =()=> {
        return exercises.map(data=>{
            return <Exercise data={data} deleteExercise={deleteExercise} key={data._id}/>        })
      }

    return(
        <div>
        {loading && <div class="d-flex align-items-center">
         <strong>Loading...</strong>
         <div class="spinner-border ms-auto"></div>
        </div>
        }
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <ExerciseList/>
          </tbody>
        </table>
      </div>
    )


}