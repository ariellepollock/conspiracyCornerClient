import { Container } from 'react-bootstrap'

const Home = (props) => {
	console.log('props in home', props)

	return (
		<Container>
			<h2>Home Page</h2>
			<p>this will be an intro page</p>
		</Container>
	)
}

export default Home
