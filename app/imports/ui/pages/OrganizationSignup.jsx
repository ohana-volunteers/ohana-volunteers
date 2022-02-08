
import React, { useState }  from 'react';
import { Button, Container, Grid, Header, Message } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { PAGE_IDS } from '../utilities/PageIDs';

/**
 * Organization sign up page
 * Page id={PAGE_IDS.ORG_SIGN_UP}
 * link is to{/org-signup}
 */
const OrganizationSignup = ({ location }) => {
  const [redirectToReferer, setRedirectToReferer] = useState(false);
  const submit = (data, formRef) => {
    console.log(data);
    // signUpNewVolunteerMethod.callPromise(data)
    //   .catch(error => {
    //     swal('Error', error.message, 'error');
    //     console.error(error);
    //   })
    //   .then(() => {
    //     formRef.reset();
    //     swal({
    //       title: 'Signed Up',
    //       text: 'You now have an account. Next you need to login.',
    //       icon: 'success',
    //       timer: 1500,
    //     });
    //     setRedirectToReferer(true);
    //   });
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
