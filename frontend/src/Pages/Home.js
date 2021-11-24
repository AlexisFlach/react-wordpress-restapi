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

export default Home
