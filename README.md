#### Custom Post Types

Installera **plugin** Custom Post Type UI

Välj **add/edit Post Types**.

```
{"projects":{"name":"projects","label":"Projects","singular_label":"Project","description":"","public":"true","publicly_queryable":"true","show_ui":"true","show_in_nav_menus":"true","delete_with_user":"false","show_in_rest":"true","rest_base":"projects","rest_controller_class":"","has_archive":"true","has_archive_string":"","exclude_from_search":"false","capability_type":"post","hierarchical":"false","rewrite":"true","rewrite_slug":"","rewrite_withfront":"true","query_var":"true","query_var_slug":"","menu_position":"","show_in_menu":"true","show_in_menu_string":"","menu_icon":"","supports":["title","editor","thumbnail","excerpt"],"taxonomies":[],"labels":{"menu_name":"","all_items":"","add_new":"","add_new_item":"","edit_item":"","new_item":"","view_item":"","view_items":"","search_items":"","not_found":"","not_found_in_trash":"","parent_item_colon":"","featured_image":"","set_featured_image":"","remove_featured_image":"","use_featured_image":"","archives":"","insert_into_item":"","uploaded_to_this_item":"","filter_items_list":"","items_list_navigation":"","items_list":"","attributes":"","name_admin_bar":"","item_published":"","item_published_privately":"","item_reverted_to_draft":"","item_scheduled":"","item_updated":""},"custom_supports":""}}
```

**Postman**

```
GET http://localhost:8000/wp-json/wp/v2/projects
```

Gå till Wordpress Admin och gå till menyn. Lägg till anpassade länkar och

```
URL: http://localhost:3000/projects
Länktext: Projects
```

 I react och components. Lägg till följande filer:

**Projects.js**

```
import React, {useState, useEffect} from 'react'
import axios from 'axios';

import ProjectItem from './ProjectItem'

const Projects = () => {

    const  [project, setProject] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    axios.get('http://localhost:8000/wp-json/wp/v2/projects')
    .then(res => {
        
        setProject(res.data)
        setIsLoaded(true)
    })
  }, [])

    return (
        <div>
            {isLoaded && project.map(project => {
                return <ProjectItem key={project.id} project={project} />
            })}
        </div>
    )
}

export default Projects
```

**ProjectItem.js**

```
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
```

**ProjectPage.js**

```
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
```

I **App.js**

```
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Navbar from './Components/Navbar';
import About from './Pages/About'
import Projects from './Components/Projects'
import ProjectPage from './Components/ProjectPage'

    const App = () => (
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Home/>}/> 
          <Route  path="/ommig" element={<About/>}/>
          <Route  path="/projects" element={<Projects/>}/>
          <Route  path="/projects/:id" element={<ProjectPage/>}/>
        </Routes>
      </Router>
    );
    export default App;
```

