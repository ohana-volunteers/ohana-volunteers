import React, { useState } from 'react';
import { Button, Container, Grid, Header, Message, Form, Segment, Checkbox } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField, BoolField } from 'uniforms-semantic';
import { Link, Redirect } from 'react-router-dom';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { PAGE_IDS } from '../utilities/PageIDs';
import { signUpNewOrganizationMethod } from '../../api/organization/OrgCollection.methods';
import { Organizations } from '../../api/organization/OrgCollection';
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
  let agreedTerms = false;
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
            <Segment>
              <TextField label='Organization Name' name='name'/>
              <Form.Field>
                <Checkbox label='I agree to the Terms and Conditions' />
              </Form.Field>
              <SubmitField value='Sign up' disabled/>
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
