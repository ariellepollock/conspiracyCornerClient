import { useNavigate } from 'react-router-dom'

import {Button, ButtonGroup} from 'react-bootstrap'

import { signOut } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

const SignOut = (props) => {
	const { msgAlert, clearUser, user } = props
    console.log(props)

    const navigate = useNavigate()

    const onSignOut = () => {
		signOut(user)
			.finally(() =>
				msgAlert({
					heading: 'Signed Out Successfully',
					message: messages.signOutSuccess,
					variant: 'success',
				})
			)
			.finally(() => navigate('/'))
			.finally(() => clearUser())
    }

    const onCancel = () => {
        navigate('/')
    }

	return (
		<>
            <div className='d-flex justify-content-center align-items-center mt-5'>
                <div>
                    <h2 className='text-center'>Are you sure you want to sign out?</h2>
                    <div className='d-flex justify-content-center'>
                        <ButtonGroup>
                            <Button className='mt-2' onClick={onSignOut}>
                                Sign Out
                            </Button>
                            <Button className='mt-2 purp' onClick={onCancel}>
                                Cancel
                            </Button>
                        </ButtonGroup>
                    </div>
                </div>
            </div>
		</>
	)
}

export default SignOut
