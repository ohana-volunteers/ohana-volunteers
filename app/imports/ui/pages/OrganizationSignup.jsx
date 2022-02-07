import React, { useState } from 'react';
// import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { Link, Redirect } from 'react-router-dom';
import { Container, Grid, Header, Message, Segment, Button } from 'semantic-ui-react';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField, BoolField } from 'uniforms-semantic';
import RadioField from '../components/form-fields/RadioField';
import MultiSelectField from '../components/form-fields/MultiSelectField';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { signUpNewOrganizationMethod } from '../../api/user/UserProfileCollection.methods';
import { volunteerCategories } from '../../api/organization/OrgCollection';

const formSchema = new SimpleSchema({
  name: String,
  email: String,
  categories: {
    type: Array,
    label: 'Categories',
    optional: false,
    uniforms: { checkboxes: true },
  },
  'categories.$': {
    type: String,
    allowedValues: Object.keys(volunteerCategories),
    /**
        ['Animal Welfare/Rescue', 'COVID-19 Recovery', 'Education', 'Elderly/Senior Care',
      'Housing', 'Special Needs', 'Child/Family Support', 'Crisis/Disaster Relief', 'Environment', 'Food Banks',
      'Homelessness/Poverty'],
     */
  },
  location: String,
  website: URL, // Organization website
  avatar: String,
  contact: Object, // Organization contact info
  'contact.name': String, // Name of person to contact
  'contact.email': String, // Email of person to contact
  'contact.address': {
    type: String,
    optional: true,
  },
  'contact.phone': {
    type: String,
    optional: true,
  },
  owner: String, // Organization owner user account
  status: {
    type: String,
    allowedValues: ['hidden', 'published'],
    defaultValue: 'hidden',
  },
  password: String,
  acceptTermsOfUse: { type: 'boolean', label: 'I agree to the Terms & Conditions and Privacy Policy.' },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
const OrganizationSignup = ({ location }) => {
  const [redirectToReferer, setRedirectToReferer] = useState(false);
  const submit = (data, formRef) => {
    console.log(data);
    signUpNewOrganizationMethod.callPromise(data)
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
  const { from } = location.state || { from: { pathname: '/signin' } };
  // if correct authentication, redirect to from: page instead of signup screen
  if (redirectToReferer) {
    return <Redirect to={from} />;
  }
  let fRef = null;
  return (
    <Container id={PAGE_IDS.ORG_SIGN_UP}>
      <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
        <Grid.Column>
          <Button.Group size='large' fluid>
            <Button as={Link} to='/signup'>Volunteer Sign Up</Button>
            <Button.Or />
            <Button positive as={Link} to="/org-signup">Organization Sign Up</Button>
          </Button.Group>
          <Header as="h5" textAlign="center">
              Sign up to be an organization
          </Header>

          <AutoForm ref={ref => {
            fRef = ref;
          }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Segment>
              <TextField name='email' id={COMPONENT_IDS.ORG_SIGN_UP_FORM_EMAIL}/>
              <TextField label='Name' name='name' id={COMPONENT_IDS.ORG_SIGN_UP_FORM_NAME}/>
              <MultiSelectField name='categories' id={COMPONENT_IDS.ORG_SIGN_UP_FORM_CATEGORIES}/>
              <TextField label='Location' name='location' id={COMPONENT_IDS.ORG_SIGN_UP_FORM_LOCATION}/>
              <TextField label='Website' name='website' id={COMPONENT_IDS.ORG_SIGN_UP_FORM_WEBSITE} />
              <TextField label='Avatar' name='avatar' id={COMPONENT_IDS.ORG_SIGN_UP_FORM_AVATAR}/>
              <TextField label='Contact Name' name='contact.name' id={COMPONENT_IDS.ORG_SIGN_UP_FORM_CONTACT_NAME}/>
              <TextField label='Contact Email' name='contact.email' id={COMPONENT_IDS.ORG_SIGN_UP_FORM_CONTACT_EMAIL} />
              <TextField label='Contact Address' name='contact.address' id={COMPONENT_IDS.ORG_SIGN_UP_FORM_CONTACT_ADDRESS}/>
              <TextField label='Contact Phone' name='contact.phone' id={COMPONENT_IDS.ORG_SIGN_UP_FORM_CONTACT_PHONE}/>
              <TextField label='Owner' name='owner'id={COMPONENT_IDS.ORG_SIGN_UP_FORM_OWNER}/>
              <RadioField name='status' id={COMPONENT_IDS.ORG_SIGN_UP_FORM_STATUS}/>
              <TextField name='password' type='password' id={COMPONENT_IDS.ORG_SIGN_UP_FORM_PASSWORD}/>
              <BoolField name='acceptTermsOfUse' id={COMPONENT_IDS.ORG_SIGN_UP_FORM_TERM}/>
              <SubmitField value='Sign up' id={COMPONENT_IDS.ORG_SIGN_UP_FORM_SUBMIT} />
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
OrganizationSignup.propTypes = {
  location: PropTypes.object,
};

export default OrganizationSignup;
