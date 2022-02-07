import React, { useState } from 'react';
// import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { Link, Redirect } from 'react-router-dom';
import { Container, Grid, Header, Message, Segment } from 'semantic-ui-react';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-semantic';
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
  address: String,
  city: String,
  state: String,
  zip: String,
  phone: String,
  password: String,
  // interests: String,
  interests: {
    type: String,
    allowedValues: ['Animal Welfare/Rescue', 'COVID-19 Recovery', 'Education', 'Elderly/Senior Care',
      'Housing', 'Special Needs', 'Child/Family Support', 'Crisis/Disaster Relief', 'Environment', 'Food Banks',
      'Homelessness/Poverty'],
    uniforms: { checkboxes: true },
  },
  skills: {
    type: String,
    allowedValues: ['Agriculture', 'education', 'Event Planning', 'Technology',
      'CPR (Certification Required)', 'Nursing (CNA/RNA Certified)', 'Construction', 'Engineering', 'Sales/Marketing',
      'Graphic/Web Design', 'First Aid (Certification Required)', 'Other'],
    uniforms: { checkboxes: true },
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
const Signup = ({ location }) => {
  /**
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [phone, setPhone] = useState('');
  // const [nickname, setNickname] = useState('');
  const [interests, setInterests] = useState([]);
  const [skills, setSkills] = useState([]);
  const [environmentalPreference, setEnvironmentalPreference] = useState('');
  const [availability, setAvailability] = useState([]);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
   */
  const [redirectToReferer, setRedirectToReferer] = useState(false);
  /**
  function multipleCheckedItem(checkArray, value) {
    const index = checkArray.indexOf(value);
    if (index >= 0) {
      checkArray.splice(index, 1);
    } else {
      checkArray.push(value);
    }
    return checkArray;
  }
 */

  /**
  // Update the form controls each time the user interacts with them.
  const handleChange = (e, { name, value }) => {
    switch (name) {
    case 'email':
      setEmail(value);
      break;
    case 'password':
      setPassword(value);
      break;
    case 'firstName':
      setFirstName(value);
      break;
    case 'lastName':
      setLastName(value);
      break;
    case 'gender':
      setGender(value);
      break;
    case 'address':
      setAddress(value);
      break;
    case 'state':
      setState(value);
      break;
    case 'city':
      setCity(value);
      break;
    case 'zip':
      setZip(value);
      break;
    case 'phone':
      setPhone(value);
      break;
    // case 'nickname':
      //  setNickname(value);
    //  break;
    case 'interests':
      setInterests(multipleCheckedItem(interests, value));
      break;
    case 'skills':
      setSkills(multipleCheckedItem(skills, value));
      break;
    case 'environmentalPreference':
      setEnvironmentalPreference(value);
      break;
    case 'availability':
      setAvailability(multipleCheckedItem(availability, value));
      break;
    default:
        // do nothing.
    }
  };

  */
  const submit = (data, formRef) => {
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
  /**

  const submit = () => {
    const username = email;
    // assignRole();
    // Meteor.call('assignRole');
    // UserProfiles.assignRole(username);
    const collectionName = UserProfiles.getCollectionName();
    console.log(collectionName);
    const definitionData = { username, firstName, lastName, gender, address, city, state, zip, phone, password,
      interests, skills, environmentalPreference, availability };
    console.log(definitionData);
    defineMethod.callPromise({ collectionName, definitionData })
    // eslint-disable-next-line no-shadow
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'submit successfully', 'success');
        setError('');
        setRedirectToReferer(true);
      });
  };
  */

  /* Display the signup form. Redirect to add page after successful registration and login. */
  const { from } = location.state || { from: { pathname: '/add' } };
  // if correct authentication, redirect to from: page instead of signup screen
  if (redirectToReferer) {
    return <Redirect to={from} />;
  }
  let fRef = null;
  return (
    <Container id={PAGE_IDS.SIGN_UP}>
      <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
        <Grid.Column>
          <Header as="h2" textAlign="center">
              Volunteer Sign Up
          </Header>
          <Header as="h5" textAlign="center">
              Sign up to be a volunteer
          </Header>

          <AutoForm ref={ref => {
            fRef = ref;
          }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Segment>
              <TextField label='First Name' name='firstName' id={COMPONENT_IDS.SIGN_UP_FORM_FIRST_NAME}/>
              <TextField label='Last Name' name='lastName' id={COMPONENT_IDS.SIGN_UP_FORM_LAST_NAME}/>
              <TextField name='email' id={COMPONENT_IDS.SIGN_UP_FORM_EMAIL}/>
              <TextField label='Primary Address' name='address' id={COMPONENT_IDS.SIGN_UP_FORM_ADDRESS}/>
              <TextField label='City' name='city' id={COMPONENT_IDS.SIGN_UP_FORM_CITY}/>
              <TextField label='State' name='state' id={COMPONENT_IDS.SIGN_UP_FORM_STATE}/>
              <TextField label='Zip/Postal Code' name='zip' id={COMPONENT_IDS.SIGN_UP_FORM_ZIP}/>
              <TextField label='Phone Number' name='phone' id={COMPONENT_IDS.SIGN_UP_FORM_PHONE}/>
              <TextField name='password' type='password' id={COMPONENT_IDS.SIGN_UP_FORM_PASSWORD}/>
              <MultiSelectField name='interests' id={COMPONENT_IDS.SIGN_UP_FORM_INTERESTS}/>
              <MultiSelectField name='skills' id={COMPONENT_IDS.SIGN_UP_FORM_SKILLS}/>
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
