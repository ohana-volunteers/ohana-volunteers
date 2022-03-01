import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Image, Input, Icon } from 'semantic-ui-react';
import NavBarMessages from './NavBarMessages';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { AdminProfiles } from '../../api/user/admin/AdminProfileCollection';
import { VolunteerProfiles } from '../../api/user/volunteer/VolunteerProfileCollection';
import { Organizations } from '../../api/user/organization/OrgProfileCollection';

/** The NavBar appears at the top of every page.  Access to certain items is dependent on the user role. Rendered by the App Layout component. */
const NavBar = ({ doc, currentUser, ready }) => {
  const menuStyle = { marginBottom: '25px', backgroundColor: '#FFFFFF' };
  const input = { width: '20rem' };
  if (currentUser && ready) {
    console.log(`${currentUser} is logged in.`);
    console.log(`Role: ${doc.role}`);
  } else {
    console.log('No user is logged in.');
  }
  const renderUserSection = () => {
    if (currentUser === '') {
      return (
        [<Menu.Item id={COMPONENT_IDS.NAVBAR_LOGIN_SIGN_UP} as={NavLink} exact to="/signup" key='signup'>Sign Up</Menu.Item>,
          <Menu.Item id={COMPONENT_IDS.NAVBAR_LOGIN_SIGN_IN} as={NavLink} exact to="/signin" key='signin'><Icon name='user'/>Sign In</Menu.Item>]);
    }
    if (currentUser === 'admin@foo.com') {
      return (
        [<Menu.Item key="admin">
          <Dropdown id={COMPONENT_IDS.NAVBAR_CURRENT_USER} text={currentUser} pointing="top right">
            <Dropdown.Menu>
              <Dropdown.Item text="Sign up new organization" as={NavLink} exact to="/org-signup"/>
              <Dropdown.Item id={COMPONENT_IDS.NAVBAR_DROPDOWN_ACCOUNT_SETTINGS} text="Account Settings" as={NavLink} exact to="/notfound"/>
              <Dropdown.Item id={COMPONENT_IDS.NAVBAR_SIGN_OUT} icon="sign out" text="Logout" as={NavLink} exact to="/signout"/>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>,
        <Menu.Item key="messages">
          <NavBarMessages/>
        </Menu.Item>]);
    }
    return (
      [<Menu.Item key="user">
        <Image src="/images/va-logo/VA-logo-circle-v5.svg" avatar/>
        <Dropdown id={COMPONENT_IDS.NAVBAR_CURRENT_USER} text={currentUser} pointing="top right">
          <Dropdown.Menu>
            <Dropdown.Item id={COMPONENT_IDS.NAVBAR_ADD_HOURS} text="Verify More Hours" as={NavLink} exact to="/addhours"/>
            <Dropdown.Item id={COMPONENT_IDS.NAVBAR_LIST_HOURS} text="Tracked Hours" as={NavLink} exact to="/listhours"/>
            <Dropdown.Item id={COMPONENT_IDS.NAVBAR_DROPDOWN_ADD_OPPORTUNITY} text="Add Opportunity" as={NavLink} exact to="/notfound"/>
            <Dropdown.Item id={COMPONENT_IDS.NAVBAR_DROPDOWN_MY_OPPORTUNITY} text="My Opportunity" as={NavLink} exact to="/notfound"/>
            <Dropdown.Item id={COMPONENT_IDS.NAVBAR_DROPDOWN_MY_PROFILE} text="My Profile" as={NavLink} exact to="/my-profile"/>
            <Dropdown.Item id={COMPONENT_IDS.NAVBAR_DROPDOWN_MY_ORGANIZATION_PROFILE} text="My Organization Profile" as={NavLink} exact to="/notfound"/>
            <Dropdown.Item id={COMPONENT_IDS.NAVBAR_DROPDOWN_ACCOUNT_SETTINGS} text="Account Settings" as={NavLink} exact to="/notfound"/>
            <Dropdown.Item id={COMPONENT_IDS.NAVBAR_SIGN_OUT} icon="sign out" text="Logout" as={NavLink} exact to="/signout"/>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>,
      <Menu.Item key="messages">
        <NavBarMessages/>
      </Menu.Item>]);
  };

  return (
    <Menu secondary stackable style={menuStyle} attached="top" borderless>
      <Menu.Item id={COMPONENT_IDS.NAVBAR_LANDING_PAGE} as={NavLink} exact to="/">
        <Image src="/images/va-logo/VA-logo-circle-v5.svg" size="tiny"/>
      </Menu.Item>
      <Menu.Item id={COMPONENT_IDS.NAVBAR_SEARCH}><Input transparent style={input} icon="search" iconPosition="left" size="large" placeholder="Search for an opportunity..."/></Menu.Item>
      <Menu.Item id={COMPONENT_IDS.NAVBAR_HOME} position="right" as={NavLink} exact to="/" key='home'>Home</Menu.Item>
      {(currentUser === 'admin@foo.com') ?
        <Menu.Item id={COMPONENT_IDS.NAVBAR_BROWSE_OPPORTUNITIES} as={NavLink} exact to="/browse-opportunities-admin" key='admin-browse'>Browse Opportunities</Menu.Item>
        :
        <Menu.Item id={COMPONENT_IDS.NAVBAR_BROWSE_OPPORTUNITIES} as={NavLink} exact to="/browse-opportunities" key='browse'>Browse Opportunities</Menu.Item>}
      <Menu.Item id={COMPONENT_IDS.NAVBAR_ORGANIZATION_LIBRARY} as={NavLink} exact to="/organization-library" key='library'>Organization Library</Menu.Item>
      <Menu.Item id={COMPONENT_IDS.NAVBAR_COMMNUITY_EVENT} as={NavLink} activeClassName="active" exact to="/event" key='event' >Community Events</Menu.Item>
      <Menu.Item id={COMPONENT_IDS.NAVBAR_ABOUT_US} as={NavLink} exact to="/about-us" key='aboutUs'>About Us</Menu.Item>
      {renderUserSection()}
    </Menu>
  );
};

// Declare the types of all properties.
NavBar.propTypes =
{
  doc: PropTypes.object,
  currentUser: PropTypes.string,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
const NavBarContainer = withTracker(() => {
  let currentUser = '';
  // Get the current user
  if (Meteor.user()) currentUser = Meteor.user().username;
  const subscriptionAdmin = AdminProfiles.subscribe();
  const subscriptionVolunteer = VolunteerProfiles.subscribe();
  const subscriptionOrg = Organizations.subscribe();
  const ready = subscriptionAdmin.ready() && subscriptionVolunteer.ready() && subscriptionOrg.ready();
  // Get the document
  const doc = (ready) ? AdminProfiles.findOne({ email: currentUser })
    || VolunteerProfiles.findOne({ email: currentUser })
    || Organizations.findOne({ email: currentUser }) : undefined;
  return {
    doc,
    currentUser,
    ready,
  };
})(NavBar);

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(NavBarContainer);
