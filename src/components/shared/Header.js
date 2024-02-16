import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'


const navbarStyle = {
    backgroundColor: '#171b37',
}

const linkStyle = {
    color: '#dc1f52',
    textDecoration: 'none',
	whiteSpace: 'nowrap',
}

const authenticatedOptions = (
	<>
		<Nav.Link 
			as={Link} 
			to='create-conspiracy' 
			className='m-2'
			style={linkStyle}>
				Create a Conspiracy
		</Nav.Link>
		<Nav.Link 
			as={Link}
			to='conspiracies' 
			className='m-2' 
			style={linkStyle}>
				My Conspiracies
		</Nav.Link>
		<Nav.Link 
			as={Link} 
			to='change-password' 
			className='m-2'
			style={linkStyle}>
				Settings
		</Nav.Link>
		<Nav.Link 
			as={Link} 
			to='sign-out' 
			className='m-2'
			style={linkStyle}>
				Sign Out
		</Nav.Link>
	</>
)

const unauthenticatedOptions = (
	<>
        <Nav.Link 
			as={Link} 
			to='sign-up' 
			className='m-2' 
			style={linkStyle}>
				Sign Up
        </Nav.Link>
        <Nav.Link 
			as={Link} 
			to='sign-in' 
			className='m-2'
			style={linkStyle}>
				Sign In
        </Nav.Link>
	</>
)

const alwaysOptions = (
	<>
		<Nav.Link 
			as={Link} 
			to='/' 
			className='m-2'
			style={linkStyle}>
				Home
		</Nav.Link>
	</>
)

const getUsernameFromEmail = email => {
    // everything before the @
    const username = email.split('@')[0]
    // Capitalize the first letter of the username
    return username.charAt(0).toUpperCase() + username.slice(1)
}

const Header = ({ user }) => {
	const username = user ? getUsernameFromEmail(user.email) : ''

	return (
		<Navbar className='ms-4' style={navbarStyle} variant='dark' expand='md'>
			<Navbar.Brand 
				as={Link} 
				to='/' 
				style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
				<img
					src="/navLogoMarkB.png"
					width="50"
					height="50"
					className="d-inline-block align-top"
					alt="Conspiracy Corner Logo"
					style={{ marginRight: '6px' }}
				/>
				<span style={{
					fontFamily: '"corsario-variable", sans-serif',
					fontVariationSettings: '"opsz" 48, "wght" 900',
					color: '#dc1f52',
					fontSize: '1.4rem'
				}}>
					Conspiracy Corner
				</span>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls='responsive-navbar-nav' className='toggleStyle mx-4' />
			<Navbar.Collapse id='responsive-navbar-nav' className='justify-content-end'>
				<Nav className='ml-auto'>
					{user && (
						<span className='navbar-text m-2'>Welcome, {username}</span>
					)}
					{alwaysOptions}
					{user ? authenticatedOptions : unauthenticatedOptions}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	)
}
export default Header
