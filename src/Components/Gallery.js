import { useState, useEffect } from 'react'
import { Image, Col, Row } from 'react-bootstrap'

const Gallery = ({ id }) => {
  const [images, setImages] = useState([])

  useEffect(() => {
    getImages(id)
  }, [])

  const getImages = async id => {
    const images = await (
      await fetch(`http://localhost:3001/images/${id}`)
    ).json()
    const imageElements = []
    images.forEach((image, index) =>
      imageElements.push(
        <Col xs lg='3'>
          <Image
            src={image}
            alt='restaurant'
            className='imageResult'
            key={index}
          ></Image>
        </Col>
      )
    )
    return setImages(imageElements)
  }

  return images.length === 0 ? (
    ''
  ) : (
    <Row className='justify-content-md-center'>{images}</Row>
  )
}

export default Gallery
