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
