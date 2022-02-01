import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { Link, Redirect } from 'react-router-dom';
import { Checkbox, Container, Form, Grid, Header, Message, Segment, Divider } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { UserProfiles } from '../../api/user/UserProfileCollection.js';
import { defineMethod } from '../../api/base/BaseCollection.methods';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
const Signup = ({ location }) => {
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
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
  const [redirectToReferer, setRedirectToReferer] = useState(false);

  function multipleCheckedItem(checkArray, value) {
    const index = checkArray.indexOf(value);
    if (index >= 0) {
      checkArray.splice(index, 1);
    } else {
      checkArray.push(value);
    }
    return checkArray;
  }

  // Update the form controls each time the user interacts with them.
  const handleChange = (e, { name, value }) => {
    switch (name) {
    case 'email':
      setEmail(value);
      break;
    case 'password':
      setPassword(value);
      break;
    case 'firstname':
      setFirstname(value);
      break;
    case 'lastname':
      setLastname(value);
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

  /* Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  const submit = () => {
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setError('');
        setRedirectToReferer(true);
        const username = email;
        // assignRole();
        Meteor.call('assignRole');
        // UserProfiles.assignRole(username);
        const collectionName = UserProfiles.getCollectionName();
        // console.log(collectionName);
        const definitionData = { username, firstname, lastname, gender, address, city, state, zip, phone,
          interests, skills, environmentalPreference, availability };
        defineMethod.callPromise({ collectionName, definitionData })
        // eslint-disable-next-line no-shadow
          .catch(error => swal('Error', error.message, 'error'))
          .then(() => {
            swal('Success', 'submit successfully', 'success');
          });
      }
    });
  };

  /* Display the signup form. Redirect to add page after successful registration and login. */
  const { from } = location.state || { from: { pathname: '/add' } };
  // if correct authentication, redirect to from: page instead of signup screen
  if (redirectToReferer) {
    return <Redirect to={from} />;
  }
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
          <Form onSubmit={submit}>
            <Segment stacked>
              <Form.Input
                label="First Name"
                id={COMPONENT_IDS.SIGN_UP_FORM_FIRSTNAME}
                name="firstname"
                // type="first name"
                onChange={handleChange}
              />
              <Form.Input
                label="Last Name"
                id={COMPONENT_IDS.SIGN_UP_FORM_LASTNAME}
                name="lastname"
                // type="last name"
                onChange={handleChange}
              />
              <Form.Input
                label="Email"
                id={COMPONENT_IDS.SIGN_UP_FORM_EMAIL}
                icon="user"
                iconPosition="left"
                name="email"
                type="email"
                placeholder="E-mail address"
                onChange={handleChange}
              />
              <Form.Field>
                <Divider hidden/>
                <label>Gender</label>
              </Form.Field>
              <Form.Group widths={2}>
                <Form.Radio
                  label='Female'
                  value='Female'
                  // control='input'
                  // type='radio'
                  name='gender'
                  checked={gender === 'Female'}
                  onChange={handleChange}
                />
                <Form.Radio
                  label='Male'
                  value='Male'
                  // control='input'
                  // type='radio'
                  name='gender'
                  checked={gender === 'Male'}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group widths={2}>
                <Form.Radio
                  label='Other'
                  value='Other'
                  // control='input'
                  // type='radio'
                  name='gender'
                  checked={gender === 'Other'}
                  onChange={handleChange}
                />
                <Form.Radio
                  label='Prefer Not To Say'
                  value='Prefer Not To Say'
                  // control='input'
                  // type='radio'
                  name='gender'
                  checked={gender === 'Prefer Not To Say'}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Input
                label="Primary Address"
                id={COMPONENT_IDS.SIGN_UP_FORM_ADDRESS}
                name="address"
                // type="primary address"
                onChange={handleChange}
              />
              <Form.Input
                label="City"
                id={COMPONENT_IDS.SIGN_UP_FORM_CITY}
                name="city"
                // type="city"
                onChange={handleChange}
              />
              <Form.Input
                label="State"
                id={COMPONENT_IDS.SIGN_UP_FORM_STATE}
                name="state"
                // type="state"
                onChange={handleChange}
              />
              <Form.Input
                label="Zip/Postal Code"
                id={COMPONENT_IDS.SIGN_UP_FORM_ZIP}
                name="zip"
                // type="zip"
                onChange={handleChange}
              />
              <Form.Input
                label="Phone Number"
                id={COMPONENT_IDS.SIGN_UP_FORM_PHONE}
                name="phone"
                // type="phone"
                onChange={handleChange}
              />
              <Form.Input
                label="Password"
                id={COMPONENT_IDS.SIGN_UP_FORM_PASSWORD}
                icon="lock"
                iconPosition="left"
                name="password"
                placeholder="Password"
                type="password"
                onChange={handleChange}
              />

              <Form.Field>
                <Divider hidden/>
                <label>Interests</label>
              </Form.Field>
              <Form.Group grouped>
                <Grid columns={2}>
                  <Grid.Row>
                    <Grid.Column>
                      <Form.Field
                        label='Animal Welfare/Rescue'
                        value='Animal Welfare/Rescue'
                        control={Checkbox}
                        // type='checkbox'
                        name='interests'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Field
                        label='Child/Family Support'
                        value='Child/Family Support'
                        control={Checkbox}
                        // type='checkbox'
                        name='interests'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <Form.Field
                        label='COVID-19 Recovery'
                        value='COVID-19 Recovery'
                        control={Checkbox}
                        // type='checkbox'
                        name='interests'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Field
                        label='Crisis/Disaster Relief'
                        value='Crisis/Disaster Relief'
                        control={Checkbox}
                        // type='checkbox'
                        name='interests'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <Form.Field
                        label='Education'
                        value='Education'
                        control={Checkbox}
                        // type='checkbox'
                        name='interests'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Field
                        label='Environment'
                        value='Environment'
                        control={Checkbox}
                        // type='checkbox'
                        name='interests'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <Form.Field
                        label='Elderly/Senior Care'
                        value='Elderly/Senior Care'
                        control={Checkbox}
                        // type='checkbox'
                        name='interests'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Field
                        label='Food Banks'
                        value='Food Banks'
                        control={Checkbox}
                        // type='checkbox'
                        name='interests'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <Form.Field
                        label='Hosing'
                        value='Hosing'
                        control={Checkbox}
                        // type='checkbox'
                        name='interests'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Field
                        label='Homelessness/Poverty'
                        value='Homelessness/Poverty'
                        control={Checkbox}
                        // type='checkbox'
                        name='interests'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <Form.Field
                        label='Special Needs'
                        value='Special Needs'
                        control={Checkbox}
                        // type='checkbox'
                        name='interests'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Form.Group>

              <Form.Field>
                <Divider hidden/>
                <label>Special Skills (optional)</label>
              </Form.Field>
              <Form.Group grouped>
                <Grid columns={2}>
                  <Grid.Row>
                    <Grid.Column>
                      <Form.Field
                        label='Agriculture'
                        value='Agriculture'
                        control={Checkbox}
                        // type='checkbox'
                        name='skills'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Field
                        label='Construction'
                        value='Construction'
                        control={Checkbox}
                        // type='checkbox'
                        name='skills'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <Form.Field
                        label='Education'
                        value='Education'
                        control={Checkbox}
                        // type='checkbox'
                        name='skills'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Field
                        label='Engineering'
                        value='Engineering'
                        control={Checkbox}
                        // type='checkbox'
                        name='skills'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <Form.Field
                        label='Event Planning'
                        value='Event Planning'
                        control={Checkbox}
                        // type='checkbox'
                        name='skills'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Field
                        label='Sales/Marketing'
                        value='Sales/Marketing'
                        control={Checkbox}
                        // type='checkbox'
                        name='skills'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <Form.Field
                        label='Technology'
                        value='Technology'
                        control={Checkbox}
                        // type='checkbox'
                        name='skills'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Field
                        label='Graphic/Web Design'
                        value='Graphic/Web Design'
                        control={Checkbox}
                        // type='checkbox'
                        name='skills'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <Form.Field
                        label='CPR (Certification Required)'
                        value='CPR (Certification Required)'
                        control={Checkbox}
                        // type='checkbox'
                        name='skills'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Field
                        label='First Aid (Certification Required)'
                        value='First Aid (Certification Required)'
                        control={Checkbox}
                        // type='checkbox'
                        name='skills'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <Form.Field
                        label='Nursing (CNA/RNA Certified)'
                        value='Nursing (CNA/RNA Certified)'
                        control={Checkbox}
                        // type='checkbox'
                        name='skills'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Field
                        label='Other'
                        value='Other'
                        control={Checkbox}
                        // type='checkbox'
                        name='skills'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Form.Group>
              <Form.Field>
                <Divider hidden/>
                <label>Environmental Preference</label>
              </Form.Field>
              <Form.Group widths={2}>
                <Form.Radio
                  label='Indoor'
                  value='Indoor'
                  // control='input'
                  // type='radio'
                  name='environmentalPreference'
                  checked={environmentalPreference === 'Indoor'}
                  onChange={handleChange}
                />
                <Form.Radio
                  label='Outdoor'
                  value='Outdoor'
                  // control='input'
                  // type='radio'
                  name='environmentalPreference'
                  checked={environmentalPreference === 'Outdoor'}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group widths={2}>
                <Form.Radio
                  label='Both'
                  value='Both'
                  // control='input'
                  // type='radio'
                  name='environmentalPreference'
                  checked={environmentalPreference === 'Both'}
                  onChange={handleChange}
                />
                <Form.Radio
                  label='No Preference'
                  value='No Preference'
                  // control='input'
                  // type='radio'
                  name='environmentalPreference'
                  checked={environmentalPreference === 'No Preference'}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Field>
                <Divider hidden/>
                <label>Availability</label>
              </Form.Field>
              <Form.Group>
                <Grid columns={2}>
                  <Grid.Row columns={2}>
                    <Grid.Column>
                      <Form.Field
                        label='One-time'
                        value='One-time'
                        control={Checkbox}
                        // type='checkbox'
                        name='availability'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Field
                        label='Once a month'
                        value='Once a month'
                        control={Checkbox}
                        // type='checkbox'
                        name='availability'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Field
                        label='Once a week'
                        value='Once a week'
                        control={Checkbox}
                        // type='checkbox'
                        name='availability'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Field
                        label='1-3 times a week'
                        value='1-3 times a week'
                        control={Checkbox}
                        // type='checkbox'
                        name='availability'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Field
                        label='More than 3 times a week'
                        value='More than 3 times a week'
                        control={Checkbox}
                        // type='checkbox'
                        name='availability'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Field
                        label='Weekends only'
                        value='Weekends only'
                        control={Checkbox}
                        // type='checkbox'
                        name='availability'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Field
                        label='Weekdays only'
                        value='Weekdays only'
                        control={Checkbox}
                        // type='checkbox'
                        name='availability'
                        onChange={handleChange}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Form.Group>
              <Divider hidden/>
              <Form.Button id={COMPONENT_IDS.SIGN_UP_FORM_SUBMIT} content="Submit" />
            </Segment>
          </Form>
          <Message>
              Already have an account? Login <Link to="/signin">here</Link>
          </Message>
          {error === '' ? (
            ''
          ) : (
            <Message
              error
              header="Registration was not successful"
              content={error}
            />
          )}
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
