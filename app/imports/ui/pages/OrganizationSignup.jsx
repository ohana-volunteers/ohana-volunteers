import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { Button, Container, Grid, Header, Message, Form, Segment, Checkbox } from 'semantic-ui-react';
import { AutoForm, SubmitField, TextField } from 'uniforms-semantic';
import { Link, Redirect } from 'react-router-dom';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { PAGE_IDS } from '../utilities/PageIDs';
import { signUpNewOrganizationMethod } from '../../api/organization/OrgCollection.methods';
import { Organizations } from '../../api/organization/OrgCollection';
import MultiSelect from '../components/form-fields/MultiSelectField';
import { getVolunteerCategoryNames } from '../../api/utilities/VolunteerCategories';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

// Create a bridge schema from the organization profile schema
const bridge = new SimpleSchema2Bridge(Organizations.getSchema());

/**
 * Organization sign up page
 * Page id={PAGE_IDS.ORG_SIGN_UP}
 * link is to{/org-signup}
 */
const OrganizationSignup = ({ location }) => {
  const [redirectToReferer, setRedirectToReferer] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);

  const onAgreedTerms = () => {
    setAgreedTerms(!agreedTerms);
    console.log(`agreed to terms: ${agreedTerms}`);
  };

  const submit = (data, formRef) => {
    console.log(data);
    const newData = data;
    newData.owner = Meteor.getUserID();
    signUpNewOrganizationMethod.callPromise(newData)
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
            Sign up as an organization
          </Header>
          <AutoForm ref={ref => {
            fRef = ref;
          }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Header as="h5" textAlign="center">
              Create new user account
            </Header>
            <Segment>
              <Form.Group widths={'equal'}>
                <TextField label='First Name'/>
                <TextField label='Last Name'/>
              </Form.Group>
            </Segment>
            <Header as="h5" textAlign="center">
              Create organization profile
            </Header>
            <Segment>
              <TextField label='Organization Name' name='name'/>
              <MultiSelect placeholder='Select one or more categories' label='Categories' name='categories' allowedValues={getVolunteerCategoryNames()}/>
              <TextField label='Organization Address' name='location'/>
              <TextField label='Mailing Address' name='mailing_address' optional/>
              <TextField label='Website URL' name='website' optional/>
              <TextField label='Logo URL' name='logo' optional/>
              <TextField label='Avatar URL' name='logo_mini' optional/>

              <Form.Field>
                <Checkbox onChange={onAgreedTerms} label='I agree to the Terms and Conditions' />
              </Form.Field>
              {(agreedTerms) ?
                <SubmitField value='Sign up'/> :
                <SubmitField value='Sign up' disabled/>}
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
