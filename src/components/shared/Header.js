import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'

const linkStyle = {
    color: 'white',
    textDecoration: 'none'
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
				Change Password
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

const Header = ({ user }) => (
	<Navbar bg='primary' variant='dark' expand='md'>
		<Navbar.Brand 
			as={Link} 
			to='/' 
			className='m-2'
			style={linkStyle}>
                Conspiracy Corner
        </Navbar.Brand>
		<Navbar.Toggle aria-controls='basic-navbar-nav' />
		<Navbar.Collapse id='basic-navbar-nav'>
			<Nav className='ml-auto'>
				{user && (
					<span className='navbar-text m-2'>Welcome, {user.email}</span>
				)}
				{alwaysOptions}
				{user ? authenticatedOptions : unauthenticatedOptions}
			</Nav>
		</Navbar.Collapse>
	</Navbar>
)

export default Header
