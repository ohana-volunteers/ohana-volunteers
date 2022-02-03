import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Image, Input, Icon } from 'semantic-ui-react';
import NavBarMessages from './NavBarMessages';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

/** The NavBars appears at the top of every page where items change depending on role of the user. Rendered by the App Layout component. */
const NavBars = ({ currentUser }) => {
  const menuStyle = { marginBottom: '25px', paddingBottom: '2rem', paddingTop: '2rem', backgroundColor: '#FFFFFF' };
  const input = { width: '30rem' };
  return (
    <Menu secondary stackable style={menuStyle} attached="top" borderless>
      <Menu.Item id={COMPONENT_IDS.NAVBAR_LANDING_PAGE} as={NavLink} activeClassName="" exact to="/">
        <Image src="/images/VA-logo-circle-v5.svg" size="tiny"/>
      </Menu.Item>
      <Menu.Item id={COMPONENT_IDS.NAVBAR_SEARCH}><Input transparent style={input} icon="search" iconPosition="left" size="large" placeholder="Search for an opportunity..."/></Menu.Item>
      <Menu.Item id={COMPONENT_IDS.NAVBAR_HOME} position="right" as={NavLink} activeClassName="" exact to="/" key='home'>Home</Menu.Item>
      <Menu.Item id={COMPONENT_IDS.NAVBAR_BROWSE_OPPORTUNITIES} as={NavLink} activeClassName="" exact to="/notfound" key='browse'>Browse Opportunities</Menu.Item>
      <Menu.Item id={COMPONENT_IDS.NAVBAR_ORGANIZATION_LIBRARY} as={NavLink} activeClassName="" exact to="/notfound" key='library'>Organization Library</Menu.Item>
      <Menu.Item id={COMPONENT_IDS.NAVBAR_ABOUT_US} as={NavLink} activeClassName="" exact to="/about-us" key='aboutUs'>About Us</Menu.Item>
      {currentUser === '' ? (
        [<Menu.Item id={COMPONENT_IDS.NAVBAR_LOGIN_SIGN_UP} as={NavLink} activeClassName="" exact to="/signup" key='signup'>Sign Up</Menu.Item>,
          <Menu.Item id={COMPONENT_IDS.NAVBAR_LOGIN_SIGN_IN} as={NavLink} exact to="/signin" key='signin'><Icon name='user'/>Sign In</Menu.Item>]
      ) : (
        [<Menu.Item key="user">
          <Image src="https://react.semantic-ui.com/images/avatar/large/matthew.png" avatar/>
          <Dropdown id={COMPONENT_IDS.NAVBAR_CURRENT_USER} text={currentUser} pointing="top right">
            <Dropdown.Menu>
              <Dropdown.Item id={COMPONENT_IDS.NAVBAR_DROPDOWN_ADD_OPPORTUNITY} activeClassName="" text="Add Opportunity" as={NavLink} exact to="/notfound"/>
              <Dropdown.Item id={COMPONENT_IDS.NAVBAR_DROPDOWN_MY_OPPORTUNITY} activeClassName="" text="My Opportunity" as={NavLink} exact to="/notfound"/>
              <Dropdown.Item id={COMPONENT_IDS.NAVBAR_DROPDOWN_MY_PROFILE} activeClassName="" text="My Profile" as={NavLink} exact to="/my-profile"/>
              <Dropdown.Item id={COMPONENT_IDS.NAVBAR_DROPDOWN_MY_ORGANIZATION_PROFILE} activeClassName="" text="My Organization Profile" as={NavLink} exact to="/notfound"/>
              <Dropdown.Item id={COMPONENT_IDS.NAVBAR_DROPDOWN_ACCOUNT_SETTINGS} activeClassName="" text="Account Settings" as={NavLink} exact to="/notfound"/>
              <Dropdown.Item activeClassName="" id={COMPONENT_IDS.NAVBAR_SIGN_OUT} icon="sign out" text="Logout" as={NavLink} exact to="/signout" />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>,
        <Menu.Item key="messages" activeClassName="">
          <NavBarMessages/>
        </Menu.Item>]
      )}
    </Menu>
  );
};

// Declare the types of all properties.
NavBars.propTypes =
{
  currentUser: PropTypes.string,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
const NavBarContainer = withTracker(() => {
  const currentUser = Meteor.user() ? Meteor.user().username : '';
  return {
    currentUser,
  };
})(NavBars);

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(NavBarContainer);
