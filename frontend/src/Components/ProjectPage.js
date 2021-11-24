import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProjectPage = () => {

    const [project, setProject] = useState({})
    const [isLoaded, setIsload] = useState(false);

    const params = useParams();

    useEffect(async () => {
        const res = await axios.get(`http://localhost:8000/wp-json/wp/v2/projects/${params.id}`)
        const data = await res.data;
        setProject(data)
        setIsload(true)
    }, [])

    return (
        <div>
            {
                isLoaded ? <h1>{project.title.rendered}</h1>
                    : <p>Not found</p>
            }
        </div>
    )
}

export default ProjectPage