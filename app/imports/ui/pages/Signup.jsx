import React, { useState } from 'react';
// import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { Link, Redirect } from 'react-router-dom';
import { Container, Grid, Header, Message, Segment, Form, Button } from 'semantic-ui-react';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField, BoolField } from 'uniforms-semantic';
import RadioField from '../components/form-fields/RadioField';
import MultiSelectField from '../components/form-fields/MultiSelectField';
// import { Checkbox, Container, Form, Grid, Header, Message, Segment, Divider } from 'semantic-ui-react';
// import { Accounts } from 'meteor/accounts-base';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
// import { UserProfiles } from '../../api/user/UserProfileCollection.js';
// import { defineMethod } from '../../api/base/BaseCollection.methods';
import { signUpNewUserMethod } from '../../api/user/UserProfileCollection.methods';

const formSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  email: String,
  gender: {
    label: 'Gender',
    type: String,
    allowedValues: ['Female', 'Male', 'Other', 'Prefer Not To Say'],
    uniforms: { checkboxes: true },
  },
  address: String,
  city: String,
  state: String,
  zip: String,
  phone: String,
  password: String,
  // interests: String,
  interests: {
    type: Array,
    label: 'Interests',
    optional: false,
    uniforms: { checkboxes: true },
  },
  'interests.$': {
    type: String,
    allowedValues: ['Animal Welfare/Rescue', 'COVID-19 Recovery', 'Education', 'Elderly/Senior Care',
      'Housing', 'Special Needs', 'Child/Family Support', 'Crisis/Disaster Relief', 'Environment', 'Food Banks',
      'Homelessness/Poverty'],
  },
  skills: {
    type: Array,
    label: 'Special Skills(optional)',
    optional: true,
    uniforms: { checkboxes: true },
  },
  'skills.$': {
    type: String,
    allowedValues: ['Agriculture', 'education', 'Event Planning', 'Technology',
      'CPR (Certification Required)', 'Nursing (CNA/RNA Certified)', 'Construction', 'Engineering', 'Sales/Marketing',
      'Graphic/Web Design', 'First Aid (Certification Required)', 'Other'],
  },
  environmentalPreference: {
    label: 'Environmental Preference',
    type: String,
    allowedValues: ['Indoor', 'Outdoor', 'Both', 'Not Preference'],
    uniforms: { checkboxes: true },
  },
  availability: {
    type: Array,
    label: 'Availability',
    optional: false,
    uniforms: { checkboxes: true },
  },
  'availability.$': {
    type: String,
    allowedValues: ['One-time', 'once a week', 'EMore than 3 times a week', 'Weekdays only',
      'Once a month', '1-3 times a week', 'Weekends only'],
  },
  acceptTermsOfUse: { type: 'boolean', label: 'I agree to the Terms & Conditions and Privacy Policy.', },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
const Signup = ({ location }) => {
  const [redirectToReferer, setRedirectToReferer] = useState(false);
  const submit = (data, formRef) => {
    console.log(data);
    signUpNewUserMethod.callPromise(data)
      .catch(error => {
        swal('Error', error.message, 'error');
        console.error(error);
      })
      .then(() => {
        formRef.reset();
        swal({
          title: 'Signed Up',
          text: 'You now have an account. Next you need to login.',
          icon: 'success',
          timer: 1500,
        });
        setRedirectToReferer(true);
      });
  };

  /* Display the signup form. Redirect to add page after successful registration and login. */
  const { from } = location.state || { from: { pathname: '/' } };
  // if correct authentication, redirect to from: page instead of signup screen
  if (redirectToReferer) {
    return <Redirect to={from} />;
  }
  let fRef = null;
  return (
    <Container id={PAGE_IDS.SIGN_UP}>
      <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
        <Grid.Column>
          <Button.Group size='large' fluid>
            <Button positive ><Link to="/signup">Volunteer Sign Up</Link></Button>
            <Button.Or />
            <Button><Link to="/signin">Organization Sign Up</Link></Button>
          </Button.Group>
          <Header as="h5" textAlign="center">
              Sign up to be a volunteer
          </Header>

          <AutoForm ref={ref => {
            fRef = ref;
          }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Segment>
              <Form.Group widths={'equal'}>
                <TextField label='First Name' name='firstName' id={COMPONENT_IDS.SIGN_UP_FORM_FIRST_NAME}/>
                <TextField label='Last Name' name='lastName' id={COMPONENT_IDS.SIGN_UP_FORM_LAST_NAME}/>
              </Form.Group>
              <TextField name='email' id={COMPONENT_IDS.SIGN_UP_FORM_EMAIL}/>
              <RadioField name='gender' id={COMPONENT_IDS.SIGN_UP_FORM_GENDER}/>
              <TextField label='Primary Address' name='address' id={COMPONENT_IDS.SIGN_UP_FORM_ADDRESS}/>
              <TextField label='City' name='city' id={COMPONENT_IDS.SIGN_UP_FORM_CITY}/>
              <TextField label='State' name='state' id={COMPONENT_IDS.SIGN_UP_FORM_STATE}/>
              <TextField label='Zip/Postal Code' name='zip' id={COMPONENT_IDS.SIGN_UP_FORM_ZIP}/>
              <TextField label='Phone Number' name='phone' id={COMPONENT_IDS.SIGN_UP_FORM_PHONE}/>
              <TextField name='password' type='password' id={COMPONENT_IDS.SIGN_UP_FORM_PASSWORD}/>
              <MultiSelectField name='interests' id={COMPONENT_IDS.SIGN_UP_FORM_INTERESTS}/>
              <MultiSelectField name='skills' id={COMPONENT_IDS.SIGN_UP_FORM_SKILLS}/>
              <RadioField name='environmentalPreference' id={COMPONENT_IDS.SIGN_UP_FORM_ENVIRONMENT}/>
              <MultiSelectField label='Availability' name='availability' id={COMPONENT_IDS.SIGN_UP_FORM_AVAILABILITY}/>
              <BoolField name='acceptTermsOfUse' id={COMPONENT_IDS.SIGN_UP_FORM_TERM}/>
              <SubmitField value='Sign up' id={COMPONENT_IDS.SIGN_UP_FORM_SUBMIT}/>
              <ErrorsField />
            </Segment>
          </AutoForm>
          <Message>
              Already have an account? Login <Link to="/signin">here</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

/* Ensure that the React Router location object is available in case we need to redirect. */
Signup.propTypes = {
  location: PropTypes.object,
};

export default Signup;
