import React from 'react';
import renderer from 'react-test-renderer';
import SignUpButton from './SignUpButton';

test('renders a sign up button', () => {
    const button = renderer.create(<SignUpButton />);
    expect(button).toBeDefined();
 })