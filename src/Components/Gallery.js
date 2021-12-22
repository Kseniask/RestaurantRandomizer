import { useState, useEffect } from 'react'
import { Image, Col, Row } from 'react-bootstrap'

const Gallery = ({ id }) => {
  const [images, setImages] = useState([])

  useEffect(() => {
    async function getImagesAsync () {
      await getImages(id)
    }
    getImagesAsync()
  }, [])

  const getImages = async id => {
    const images = await (
      await fetch(`https://whats-for-lunch-backend.herokuapp.com/images/${id}`)
    ).json()
    const imageElements = []
    images.forEach((image, index) =>
      imageElements.push(
        <Col xs lg='3' key={index}>
          <Image src={image} alt='restaurant' className='imageResult'></Image>
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
