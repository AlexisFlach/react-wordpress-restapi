import React from 'react'
import {Link} from 'react-router-dom';

const ProjectItem = ({project}) => {

    return (
        <div>
            <h2>{project.title.rendered}</h2>
            <div dangerouslySetInnerHTML={{__html: project.excerpt.rendered}}/>
            <Link to={`http://localhost:8000/projects/${project.id}`}>Go to page</Link>
        </div>
    )
}

export default ProjectItem