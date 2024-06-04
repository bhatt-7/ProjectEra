import React, { useEffect, useState } from 'react'
import { getAllProjects } from '../services/operations/projectAPI'

const Projects = () => {

    const [projects,setProjects] = useState([]);

    useEffect(()=>{
        const fetchProjects = async()=>{
            const result = await getAllProjects();
            if(result){
                setProjects(result);
            }
        }
        fetchProjects();
    },[])
    console.log(projects)
  return (
    <div className='text-black'>
        <p>Projects</p>

        {
            projects.map((items)=(
                <p>{items.name}</p>
            ))
        }
    </div>
  )
}

export default Projects