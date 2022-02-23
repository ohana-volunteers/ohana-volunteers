// import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import React, { useState } from 'react';
import { Container, Grid, Header, Message, Form, Segment, Checkbox, Divider } from 'semantic-ui-react';
import { AutoForm, SubmitField, TextField, RadioField } from 'uniforms-semantic';
import { Link, Redirect } from 'react-router-dom';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { PAGE_IDS } from '../utilities/PageIDs';
import { signUpNewOrganizationMethod } from '../../api/organization/OrgCollection.methods';
import MultiSelect from '../components/form-fields/MultiSelectField';
import { getVolunteerCategoryNames } from '../../api/utilities/VolunteerCategories';
import { userSchema, organizationProfileSchema } from '../../api/utilities/SchemaDefinitions';

// Create a bridge schema from the organization profile schema
const bridge = new SimpleSchema2Bridge(new SimpleSchema({
  userInfo: userSchema,
  orgInfo: organizationProfileSchema,
}));

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
          <Header as="h4" textAlign="center">
            Sign up a new organization
          </Header>
          <Divider/>
          <AutoForm ref={ref => {
            fRef = ref;
          }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Header as="h5" textAlign="center">
              Create new user account
            </Header>
            <Segment>
              <TextField label='User Email' name='userInfo.username'/>
              <TextField type='password' name='userInfo.password'/>
            </Segment>
            <Header as="h5" textAlign="center">
              Create organization profile
            </Header>
            <Segment>
              <TextField label='Organization Name' name='orgInfo.name'/>
              <MultiSelect placeholder='Select one or more categories' label='Categories' name='orgInfo.categories' allowedValues={getVolunteerCategoryNames()}/>
              <TextField label='Organization Address' name='orgInfo.location'/>
              <TextField label='Mailing Address' name='orgInfo.mailing_address'/>
              <TextField label='Website URL' name='orgInfo.website'/>
              <TextField label='Logo URL' name='orgInfo.logo'/>
              <TextField label='Avatar URL' name='orgInfo.logo_mini'/>

              <Segment>
                <Header as="h5" textAlign="center">
                  Contact info
                </Header>
                <TextField name='orgInfo.contact.name'/>
                <TextField name='orgInfo.contact.email'/>
                <TextField name='orgInfo.contact.address'/>
                <TextField name='orgInfo.contact.phone'/>
              </Segment>

              <RadioField label='Publish Organization Profile?' name='orgInfo.status' >
              </RadioField>

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
