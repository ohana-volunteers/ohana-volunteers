import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Checkbox, Container, Form, Grid, Header, Message, Segment, Divider } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
const Signup = ({ location }) => {
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [phone, setPhone] = useState('');
  const [nickname, setNickname] = useState('');
  const [interests, setInterests] = useState('');
  const [skills, setSkills] = useState('');
  const [environmentalPreference, setEnvironmentalPreference] = useState('');
  const [availability, setAvailability] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToReferer] = useState(false);

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
    case 'nickname':
      setNickname(value);
      break;
    case 'interests':
      setInterests(value);
      break;
    case 'skills':
      setSkills(value);
      break;
    case 'environmentalPreference':
      setEnvironmentalPreference(value);
      break;
    case 'availability':
      setAvailability(value);
      break;
    default:
        // do nothing.
    }
  };

  /* Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  const submit = () => {
    Accounts.createUser({ email, username: email, password, firstname, lastname, address, city, state, zip, phone,
      nickname, interests, skills, environmentalPreference, availability }, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setError('');
        setRedirectToReferer(true);
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
                // id={COMPONENT_IDS.SIGN_UP_FORM_FIRSTNAME}
                name="first name"
                type="first name"
                onChange={handleChange}
              />
              <Form.Input
                label="Last Name"
                // id={COMPONENT_IDS.SIGN_UP_FORM_FIRSTNAME}
                name="last name"
                type="last name"
                onChange={handleChange}
              />
              <Form.Input
                label="Email"
                // id={COMPONENT_IDS.SIGN_UP_FORM_EMAIL}
                icon="user"
                iconPosition="left"
                name="email"
                type="email"
                placeholder="E-mail address"
                onChange={handleChange}
              />
              <Form.Field>
                <label>Gender</label>
              </Form.Field>
              <Form.Group widths={2}>
                <Form.Field
                  label='Female'
                  control='input'
                  type='radio'
                  name='genderRadios'
                />
                <Form.Field
                  label='Male'
                  control='input'
                  type='radio'
                  name='genderRadios'
                />
              </Form.Group>
              <Form.Group widths={2}>
                <Form.Field
                  label='Other'
                  control='input'
                  type='radio'
                  name='genderRadios'
                />
                <Form.Field
                  label='Prefer Not To Say'
                  control='input'
                  type='radio'
                  name='genderRadios'
                />
              </Form.Group>
              <Form.Input
                label="Primary Address"
                // id={COMPONENT_IDS.SIGN_UP_FORM_ADDRESS}
                name="primary address"
                type="primary address"
                onChange={handleChange}
              />
              <Form.Input
                label="City"
                // id={COMPONENT_IDS.SIGN_UP_FORM_CITY}
                name="city"
                type="city"
                onChange={handleChange}
              />
              <Form.Input
                label="State"
                // id={COMPONENT_IDS.SIGN_UP_FORM_STATE}
                name="state"
                type="state"
                onChange={handleChange}
              />
              <Form.Input
                label="Zip/Postal Code"
                // id={COMPONENT_IDS.SIGN_UP_FORM_ZIP}
                name="zip"
                type="zip"
                onChange={handleChange}
              />
              <Form.Input
                label="Phone Number"
                // id={COMPONENT_IDS.SIGN_UP_FORM_PHONE}
                name="phone"
                type="phone"
                onChange={handleChange}
              />
              <Form.Input
                label="Nickname"
                // id={COMPONENT_IDS.SIGN_UP_FORM_USERNAME}
                name="nickname"
                type="nickname"
                onChange={handleChange}
              />
              <Form.Input
                label="Password"
                // id={COMPONENT_IDS.SIGN_UP_FORM_PASSWORD}
                icon="lock"
                iconPosition="left"
                name="password"
                placeholder="Password"
                type="password"
                onChange={handleChange}
              />
              <Grid columns='equal'>
                <Form.Field>
                  <Divider hidden/>
                  <label>Interests</label>
                </Form.Field>
                <Grid.Row>
                  <Grid.Column><Checkbox label='Animal Welfare/Rescue'/></Grid.Column>
                  <Grid.Column><Checkbox label='Child/Family Support'/></Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column><Checkbox label='COVID-19 Recovery'/></Grid.Column>
                  <Grid.Column><Checkbox label='Crisis/Disaster Relief'/></Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column><Checkbox label='Education'/></Grid.Column>
                  <Grid.Column><Checkbox label='Environment'/></Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column><Checkbox label='Elderly/Senior Care'/></Grid.Column>
                  <Grid.Column><Checkbox label='Food Banks'/></Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column><Checkbox label='Hosing'/></Grid.Column>
                  <Grid.Column><Checkbox label='Homelessness/Poverty'/></Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column><Checkbox label='Special Needs'/></Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid columns='equal'>
                <Form.Field>
                  <Divider hidden/>
                  <label>Special Skills (optional)</label>
                </Form.Field>
                <Grid.Row>
                  <Grid.Column><Checkbox label='Agriculture'/></Grid.Column>
                  <Grid.Column><Checkbox label='Construction'/></Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column><Checkbox label='Education'/></Grid.Column>
                  <Grid.Column><Checkbox label='Engineering'/></Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column><Checkbox label='Event Planning'/></Grid.Column>
                  <Grid.Column><Checkbox label='Sales/Marketing'/></Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column><Checkbox label='Technology'/></Grid.Column>
                  <Grid.Column><Checkbox label='Graphic/Web Design'/></Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column><Checkbox label='CPR (Certification Required)'/></Grid.Column>
                  <Grid.Column><Checkbox label='First Aid (Certification Required)'/></Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column><Checkbox label='Nursing (CNA/RNA Certified)'/></Grid.Column>
                  <Grid.Column><Checkbox label='Other'/></Grid.Column>
                </Grid.Row>
              </Grid>
              <Form.Field>
                <Divider hidden/>
                <label>Environmental Preference</label>
              </Form.Field>
              <Form.Group widths={2}>
                <Form.Field
                  label='Indoor'
                  control='input'
                  type='radio'
                  name='envirRadios'
                />
                <Form.Field
                  label='Outdoor'
                  control='input'
                  type='radio'
                  name='envirRadios'
                />
              </Form.Group>
              <Form.Group widths={2}>
                <Form.Field
                  label='Both'
                  control='input'
                  type='radio'
                  name='envirRadios'
                />
                <Form.Field
                  label='No Preference'
                  control='input'
                  type='radio'
                  name='envirRadios'
                />
              </Form.Group>
              <Grid columns='equal'>
                <Form.Field>
                  <Divider hidden/>
                  <label>Availability</label>
                </Form.Field>
                <Grid.Row columns='equal'>
                  <Grid.Column><Checkbox label='One-time'/></Grid.Column>
                  <Grid.Column><Checkbox label='Once a month'/></Grid.Column>
                </Grid.Row>
                <Grid.Row columns='equal'>
                  <Grid.Column><Checkbox label='Once a week'/></Grid.Column>
                  <Grid.Column><Checkbox label='1-3 times a week'/></Grid.Column>
                </Grid.Row>
                <Grid.Row columns='equal'>
                  <Grid.Column><Checkbox label='More than 3 times a week'/></Grid.Column>
                  <Grid.Column><Checkbox label='Weekends only'/></Grid.Column>
                </Grid.Row>
                <Grid.Row columns='equal'>
                  <Grid.Column><Checkbox label='Weekdays only'/></Grid.Column>
                </Grid.Row>
              </Grid>
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
