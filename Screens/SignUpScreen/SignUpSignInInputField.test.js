import React from 'react';
import renderer from 'react-test-renderer';
import SignUpInputField from './SignUpSignInInputField'

test('renders an input field', () => {
    const signUpField = renderer.create(<SignUpInputField />)
    expect(signUpField).toBeDefined();
 })
 