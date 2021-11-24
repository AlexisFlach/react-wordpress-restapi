### React

#### 1. Setup

Skapa nu ett nytt React-projekt

```
npx create-react-app frontend
```

```
npm install react-router-dom
```

**app.js**

```
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';

    const App = () => (
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}/> 
        </Routes>
      </Router>
    );
    export default App;

```

**Pages/Home.jsx**

```
import React from 'react'

const Home = () => {
    return (
        <div>
          <h1>Hello World</h1>  
        </div>
    )
}

export default Home
```

#### 2. Axios och våra första requests

```
npm install axios
```

**Pages/Home.js**

```
import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('http://localhost:8000/wp-json/wp/v2/pages?slug=hem');
      const { acf } = res.data[0];
      console.log(acf);
      setTitle(acf.rubrik);
      setDescription(acf.beskrivning)
      setImage(acf.bild.url)
      setLink(acf.lank);
    }
    fetchData()
  }, [])

  return (
    <div>
      <img style={{ height: "400px" }} src={image} />
      <h1>{title}</h1>
      <p>{description}</p>
      <a href={link} className="button">Go to page</a>
    </div>
  )
}

export default Home;
```

