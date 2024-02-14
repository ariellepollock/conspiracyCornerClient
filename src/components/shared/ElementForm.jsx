import React from 'react'
import { Form } from 'react-bootstrap'

const ElementForm = ({ placeholder, value, onChange }) => {
    // const handleChange = (e) => {
    //     onChange(placeholder, e)
    // }

    return (
        <Form.Group className='mb-3'>
            <Form.Label>{placeholder}</Form.Label>
            <Form.Control
                type='text'
                name={placeholder}
                value={value}
                onChange={(e) => onChange(e)}
            />
        </Form.Group>
    )
}

export default ElementForm