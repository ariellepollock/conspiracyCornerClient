import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import ElementForm from './ElementForm';
import apiUrl from '../../apiConfig';
import { updateConspiracy } from '../../api/conspiracy'; // Adjust based on your actual API file structure

const ConspiracyForm = ({ user, storyId: propStoryId, msgAlert }) => {
    const { conspiracyId } = useParams();
    const navigate = useNavigate();
    const [story, setStory] = useState(null);
    const [inputs, setInputs] = useState({});
    const [error, setError] = useState('');
    const isEditMode = Boolean(conspiracyId);

    useEffect(() => {
        if (isEditMode) {
            // Fetch conspiracy for editing, which includes the story
            axios.get(`${apiUrl}/conspiracies/${conspiracyId}`)
                .then(res => {
                    const { story, elements } = res.data.conspiracy;
                    setStory(story); // This now contains the story ID and details
                    const initialInputs = elements.reduce((acc, element) => {
                        acc[element.placeholder] = element.content;
                        return acc;
                    }, {});
                    setInputs(initialInputs);
                })
                .catch(err => setError('Failed to fetch conspiracy details.'));
        } else if (propStoryId) {
            // Only fetch story details if in creation mode and a storyId is provided
            axios.get(`${apiUrl}/stories/${propStoryId}`)
                .then(res => {
                    setStory(res.data.story);
                    const initialInputs = extractPlaceholders(res.data.story.template).reduce((acc, placeholder) => {
                        acc[placeholder] = '';
                        return acc;
                    }, {});
                    setInputs(initialInputs);
                })
                .catch(err => setError('Failed to fetch story details.'));
        }
    }, [conspiracyId, propStoryId, isEditMode]);

    // Function to extract placeholders remains unchanged
    function extractPlaceholders(template) {
        const regex = /{([^}]+)}/g;
        let placeholders = [];
        let match;
        while ((match = regex.exec(template)) !== null) {
            placeholders.push(match[1]);
        }
        return placeholders;
    }

    const handleChange = (placeholder, e) => {
        const { value } = e.target
        setInputs(inputs => ({ ...inputs, [placeholder]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const conspiracyData = {
            story: story._id,
            elements: Object.entries(inputs).map(([placeholder, content]) => ({ placeholder, content }))
        };

        if (isEditMode) {
            updateConspiracy(user, { _id: conspiracyId, ...conspiracyData })
                .then(res => {
                    navigate(`/conspiracies/${res.data.conspiracy._id}`);
                    msgAlert({
                        heading: 'Success',
                        message: 'Conspiracy Updated',
                        variant: 'success',
                    });
                })
                .catch(() => {
                    setError('Failed to update conspiracy.');
                    msgAlert({
                        heading: 'Error',
                        message: 'Failed to update conspiracy',
                        variant: 'danger',
                    });
                });
        } else {
            axios.post(`${apiUrl}/conspiracies`, { conspiracy: conspiracyData }, {
                headers: {
                    Authorization: `Token token=${user.token}`
                }
            })
            .then(res => navigate(`/conspiracies/${res.data.conspiracy._id}`))
            .catch(() => setError('Failed to submit conspiracy.'));
        }
    };

    return (
        <Container className='justify-content-center'>
            <h2>{story?.title || 'Loading story...'}</h2>
            <Form onSubmit={handleSubmit}>
                {story && Object.keys(inputs).map((placeholder, index) => (
                    <ElementForm
                        key={`element-${placeholder}-${index}`}
                        placeholder={placeholder}
                        value={inputs[placeholder]}
                        onChange={e => handleChange(placeholder, e)}
                    />
                ))}
                {error && <p>{error}</p>}
                <Button type="submit" variant="primary" className='mt-2'>
                    {isEditMode ? 'Update Conspiracy' : 'Create Conspiracy'}
                </Button>
            </Form>
        </Container>
    );
};

export default ConspiracyForm;