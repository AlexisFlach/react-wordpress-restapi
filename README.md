### Menu

I **functions.php** lägg till

```
function get_my_menu()
{
    return wp_get_nav_menu_items('primary');
}

add_action('rest_api_init', function () {

    register_rest_route('wp/v2', 'menu', array(
        'methods' => 'GET',
        'callback' => 'get_my_menu',
    ));
});
```

"primary" är baserat på:

```
register_nav_menus(
			array(
				'primary' => esc_html__( 'Primary menu', 'twentytwentyone' ),
				'footer'  => __( 'Secondary menu', 'twentytwentyone' ),
			)
		);
```

Gå till Wordpress Admin och lägg till ett par sidor.

Skapa sedan en ny meny och namnge den "primary".

**postman**

```
GET http://localhost:8000/wp-json/wp/v2/menu
```

I React skapa en fil som heter **Navbar.js**

**Componenent/Navbar.js**

```
import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios'

const Navbar = () => {
    const [menuItem, setMenuItems] = useState([])

    useEffect(() => {
        const fetchData = async() => {
          const response = await axios.get('http://localhost:8000/wp-json/wp/v2/menu')
          const items = await response.data;
          setMenuItems(items)
        }
        fetchData();
      }, []);

      const removeSpaceFromString = str => {
        let cleanStr = str.replace(/\s/g, '');
        return cleanStr;
      }

    return (
        <nav>
           {menuItem.map((item, i) => (
           <li key={i}>
             {item.title === "Hem" ?
            <Link to="/">{item.title}</Link>
            : <Link to={removeSpaceFromString(item.title)}>{item.title}</Link>
             }
           </li>
           ))}
        </nav>
    )
}

export default Navbar
```

**App.js**

```
<Route exact path="/ommig" element={<About/>}/> 
```

**About.js**

```
import React, { useEffect, useState } from 'react'
import axios from 'axios';

const About = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("")
  const [imageId, setImageID] = useState(null);
  const [image, setImage] = useState("");

  useEffect(() => {

    const fetchData = async () => {
        const res = await axios.get(`http://localhost:8000/wp-json/wp/v2/pages?slug=om-mig}`);
        const data = await res.data[0];
        setTitle(data.title.rendered)
        setContent(data.content.rendered)
        setImageID(data.featured_media)
        const img = await axios.get(`http://localhost:8000/wp-json/wp/v2/media/${imageId}`)
        setImage(img.data.guid.rendered)
    }
    fetchData()
  }, [imageId, image])

  return (
    <div>
        <img style={{ height: "400px" }} src={image} />
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{__html:content}}/>
    </div>
  )
}

export default About
```

