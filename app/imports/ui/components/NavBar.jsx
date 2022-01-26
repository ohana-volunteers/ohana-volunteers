import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Image, Input, Icon, Modal, Button, Grid, Header } from 'semantic-ui-react';
// import { Roles } from 'meteor/alanning:roles';
// import { ROLE } from '../../api/role/Role';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
const NavBar = ({ currentUser }) => {
  const menuStyle = { marginBottom: '25px', paddingBottom: '2rem', paddingTop: '2rem', backgroundColor: '#FFFFFF' };
  const input = { width: '30rem' };
  const [open, setOpen] = React.useState(false);
  return (
    <Menu secondary style={menuStyle} attached="top" borderless>
      <Menu.Item id={COMPONENT_IDS.NAVBAR_LANDING_PAGE} as={NavLink} activeClassName="" exact to="/">
        <Image src='/images/VA-logo-circle-v5.svg' size="tiny"/>
      </Menu.Item>
      <Menu.Item><Input transparent style={input} icon="search" iconPosition="left" size="large" placeholder="Search for an opportunity..."/></Menu.Item>
      <Menu.Item position="right" as={NavLink} activeClassName="" exact to="/" key='home'>Home</Menu.Item>
      <Menu.Item as={NavLink} activeClassName="" exact to="/notfound" key='browse'>Browse Opportunities</Menu.Item>
      <Menu.Item as={NavLink} activeClassName="" exact to="/notfound" key='library'>Organization Library</Menu.Item>
      <Menu.Item as={NavLink} activeClassName="" exact to="/about-us" key='aboutUs'>About Us</Menu.Item>
      {currentUser === '' ? (
        [<Menu.Item id={COMPONENT_IDS.NAVBAR_LOGIN_SIGN_UP} as={NavLink} activeClassName="" exact to="/signup" key='signup'>Sign Up</Menu.Item>,
          <Menu.Item id={COMPONENT_IDS.NAVBAR_LOGIN_SIGN_IN} as={NavLink} exact to="/signin" key='signin'><Icon name='user'/>Sign In</Menu.Item>]
      ) : (
        [<Menu.Item key="user">
          <Image src='/images/VA-logo-circle-v5.svg' avatar/>
          <Dropdown id={COMPONENT_IDS.NAVBAR_CURRENT_USER} text={currentUser} pointing="top right">
            <Dropdown.Menu>
              <Dropdown.Item activeClassName="" text="Add Opportunity" as={NavLink} exact to="/notfound"/>
              <Dropdown.Item activeClassName="" text="My Opportunity" as={NavLink} exact to="/notfound"/>
              <Dropdown.Item activeClassName="" text="My Profile" as={NavLink} exact to="/notfound"/>
              <Dropdown.Item activeClassName="" text="My Organization Profile" as={NavLink} exact to="/notfound"/>
              <Dropdown.Item activeClassName="" text="Account Settings" as={NavLink} exact to="/notfound"/>
              <Dropdown.Item activeClassName="" id={COMPONENT_IDS.NAVBAR_SIGN_OUT} icon="sign out" text="Logout" as={NavLink} exact to="/signout" />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>,
        <Menu.Item key="messages" activeClassName="">
          <Modal
            closeIcon
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button basic circular><Icon name="comments" color="black"/></Button>}
            key='messages'>
            <Modal.Header>Messages</Modal.Header>
            <Grid container doubling centered verticalAlign='middle'>
              <div className="modal-margin">
                <Grid.Column textAlign='center'>
                  <Icon name="inbox" size="big"/>
                  <Header as='h3'>No Messages Available</Header>
                </Grid.Column>
              </div>
            </Grid>
            <Modal.Actions>
              <Button
                content="Compose"
                labelPosition='right'
                color="blue"
                icon="plus"
                onClick={() => setOpen(false)}/>
            </Modal.Actions>
          </Modal>
        </Menu.Item>]
      )}
    </Menu>
  );
};

// Declare the types of all properties.
NavBar.propTypes =
{
  currentUser: PropTypes.string,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
const NavBarContainer = withTracker(() => {
  const currentUser = Meteor.user() ? Meteor.user().username : '';
  return {
    currentUser,
  };
})(NavBar);

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(NavBarContainer);
