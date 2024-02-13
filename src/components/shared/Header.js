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
		<Nav.Link className='m-2'>
			<Link to='create-conspiracy' style={linkStyle}>
				Create a Conspiracy
			</Link>
		</Nav.Link>
		<Nav.Link className='m-2'>
			<Link to='conspiracies' style={linkStyle}>
				My Conspiracies
			</Link>
		</Nav.Link>
		<Nav.Link className='m-2'>
			<Link to='change-password' style={linkStyle}>
				Change Password
			</Link>
		</Nav.Link>
		<Nav.Link className='m-2'>
			<Link to='sign-out' style={linkStyle}>
				Sign Out
			</Link>
		</Nav.Link>
	</>
)

const unauthenticatedOptions = (
	<>
        <Nav.Link className='m-2'>
			<Link to='sign-up' style={linkStyle}>Sign Up</Link>
        </Nav.Link>
        <Nav.Link className='m-2'>
			<Link to='sign-in' style={linkStyle}>Sign In</Link>
        </Nav.Link>
	</>
)

const alwaysOptions = (
	<>
		<Nav.Link className='m-2'>
			<Link to='/' style={linkStyle}>
				Home
			</Link>
		</Nav.Link>
	</>
)

const Header = ({ user }) => (
	<Navbar bg='primary' variant='dark' expand='md'>
		<Navbar.Brand className='m-2'>
            <Link to='/' style={linkStyle}>
                Conspiracy Corner
            </Link>
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
