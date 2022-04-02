import React, { useState } from 'react';
import { Container, Grid, Header, Segment, Divider } from 'semantic-ui-react';
import { AutoForm, SubmitField, TextField, RadioField, ErrorsField, HiddenField } from 'uniforms-semantic';
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { PAGE_IDS } from '../utilities/PageIDs';
import { signUpNewOrganizationMethod } from '../../api/user/organization/OrgProfileCollection.methods';
import MultiSelect from '../components/form-fields/MultiSelectField';
import { getVolunteerCategoryNames } from '../../api/utilities/VolunteerCategories';
import { userSchema, organizationProfileSchema } from '../../api/utilities/SchemaDefinitions';
import { ROLE } from '../../api/role/Role';

// Create a bridge schema from the organization profile schema
const bridge = new SimpleSchema2Bridge(new SimpleSchema({
  user: userSchema,
  profile: organizationProfileSchema,
}));

/**
 * Organization sign up page
 * Page id={PAGE_IDS.ORG_SIGN_UP}
 * link is to{/org-signup}
 */
const OrganizationSignup = ({ location }) => {
  const [redirectToReferer, setRedirectToReferer] = useState(false);
  const submit = (data, formRef) => {
    const user = data.user;
    const profile = data.profile;
    signUpNewOrganizationMethod.callPromise({ user, profile })
      .catch(error => {
        swal('Error', error.message, 'error');
        // eslint-disable-next-line no-console
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
              <TextField type='email' label='Email' name='user.email'/>
              <HiddenField name='profile.owner' value='admin@foo.com' />
              <TextField type='password' label='Password' name='user.password'/>
            </Segment>
            <Header as="h5" textAlign="center">
              Create organization profile
            </Header>
            <Segment>
              <TextField label='Organization Name' name='profile.name'/>
              <MultiSelect placeholder='Select one or more categories' label='Categories' name='profile.categories' allowedValues={getVolunteerCategoryNames()}/>
              <TextField label='Organization Address' name='profile.location'/>
              <TextField label='Mailing Address' name='profile.mailing_address'/>
              <TextField label='Website URL' name='profile.website'/>
              <TextField label='Logo URL' name='profile.logo'/>
              <TextField label='Avatar URL' name='profile.logo_mini'/>

              <Segment>
                <Header as="h5" textAlign="center">
                  Contact info
                </Header>
                <TextField name='profile.contact.name'/>
                <TextField name='profile.contact.email'/>
                <TextField name='profile.contact.address'/>
                <TextField name='profile.contact.phone'/>
              </Segment>

              <RadioField label='Publish Organization Profile? (profile can be edited and published later)' name='profile.status' >
              </RadioField>
              <HiddenField name='user.role' value={ROLE.ORGANIZATION} />
              <SubmitField value='Sign up'/>
              <ErrorsField />
            </Segment>
          </AutoForm>
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
