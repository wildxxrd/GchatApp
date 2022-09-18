import React from 'react';
import renderer from 'react-test-renderer';
import SignUpScreenMain from './SignUpScreenMain';

test('renders the main screen', () => { 
    const signUpScreen = renderer.create(<SignUpScreenMain />);
    expect(signUpScreen).toBeDefined();
 })

 test('Create SnapShot', () => { 
    const signUpScreen = renderer.create(<SignUpScreenMain />);
    expect(signUpScreen).toMatchSnapshot();
 })