import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Footer from './Footer'

const Home = (props) => {
	console.log('props in home', props)
	const navigate = useNavigate()
	const closedEyeImage = '/ccBrandMarkClosed.png'
	const openEyeImage = '/ccBrandMark.png'

	const [image, setImage] = useState(closedEyeImage)

	const handleImageClick = () => {
		setImage(openEyeImage)

		setTimeout(() => {
			navigate('/create-conspiracy')
		}, 2000)
	}

	return (
		<>
			<Container 
				className="d-flex flex-column align-items-center justify-content-center" 
				style={{ marginTop: '5vmin' }}>
				<img
					src={image}
					width="600"
					height="600"
					alt="Conspiracy Corner Logo"
				/>
				<Link 
					style={{ 
						color: '#dc1f52', 
						fontSize: '1.4rem',
						marginTop: '-15vmin',
						marginBottom: '20vmin'
					}} 
					onClick={handleImageClick}>
					TIME TO CONSPIRE
				</Link>
			</Container>
			<Footer />
		</>
	)
}

export default Home
