import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Image, Input, Icon } from 'semantic-ui-react';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { AdminProfiles } from '../../api/user/admin/AdminProfileCollection';
import { VolunteerProfiles } from '../../api/user/volunteer/VolunteerProfileCollection';
import { Organizations } from '../../api/user/organization/OrgProfileCollection';
import { ROLE } from '../../api/role/Role';

/** The NavBar appears at the top of every page.  Access to certain items is dependent on the user role. Rendered by the App Layout component. */
const NavBar = ({ role, currentUser }) => {
  const menuStyle = { marginBottom: '25px', backgroundColor: 'rgba(0, 255, 255, .1)' };
  const input = { width: '20rem' };
  return (
    <Menu secondary stackable style={menuStyle} attached="top" borderless>
      <Menu.Item id={COMPONENT_IDS.NAVBAR_LANDING_PAGE} as={NavLink} exact to="/">
        <Image src="/images/va-logo/VA-logo-circle-v5.svg" size="tiny"/>
      </Menu.Item>
      <Menu.Item id={COMPONENT_IDS.NAVBAR_SEARCH}><Input transparent style={input} icon="search" iconPosition="left" size="large" placeholder="Search for an opportunity..."/></Menu.Item>
      <Menu.Item id={COMPONENT_IDS.NAVBAR_HOME} position="right" as={NavLink} exact to="/" key='home'>Home</Menu.Item>
      {(role !== ROLE.ORGANIZATION) ?
        <Menu.Item id={COMPONENT_IDS.NAVBAR_ORGANIZATION_LIBRARY} as={NavLink} exact to="/organization-library" key='library'>Organizations</Menu.Item> : ''}
      {(role === ROLE.ADMIN) ?
        <React.Fragment>
          <Menu.Item id={COMPONENT_IDS.NAVBAR_BROWSE_OPPORTUNITIES} as={NavLink} exact to="/browse-opportunities" key='browse'>Opportunities</Menu.Item>
          <Menu.Item id={COMPONENT_IDS.NAVBAR_ADMIN_HOME} as={NavLink} exact to="/admin-home" key='admin-home'>Admin Dashboard</Menu.Item>
        </React.Fragment> : ''}
      {(!role || role === ROLE.VOLUNTEER) ?
        <React.Fragment>
          <Menu.Item id={COMPONENT_IDS.NAVBAR_COMMUNITY_EVENT} as={NavLink} activeClassName="active" exact to="/event" key='event' >Calendar</Menu.Item>
          <Menu.Item id={COMPONENT_IDS.NAVBAR_ABOUT_US} as={NavLink} exact to="/about-us" key='aboutUs'>About Us</Menu.Item>
        </React.Fragment> : ''}
      {(role) ?
        <Menu.Item key="user">
          <Image src="/images/va-logo/VA-logo-circle-v5.svg" avatar/>
          <Dropdown id={COMPONENT_IDS.NAVBAR_CURRENT_USER} text={currentUser} pointing="top right">
            <Dropdown.Menu>
              {(role === ROLE.VOLUNTEER) ?
                // Volunteer drop-down options
                <React.Fragment>
                  <Dropdown.Item id={COMPONENT_IDS.NAVBAR_ADD_HOURS} text="Verify More Hours" as={NavLink} exact to="/addhours"/>
                  <Dropdown.Item id={COMPONENT_IDS.NAVBAR_LIST_HOURS} text="Tracked Hours" as={NavLink} exact to="/listhours"/>
                  <Dropdown.Item id={COMPONENT_IDS.NAVBAR_DROPDOWN_MY_PROFILE} text="My Profile" as={NavLink} exact to="/my-profile"/>
                  <Dropdown.Item id={COMPONENT_IDS.NAVBAR_DROPDOWN_ACCOUNT_SETTINGS} text="Account Settings" as={NavLink} exact to="/notfound"/>
                  <Dropdown.Item id={COMPONENT_IDS.NAVBAR_SIGN_OUT} icon="sign out" text="Logout" as={NavLink} exact to="/signout"/>
                </React.Fragment> : ''}
              {(role === ROLE.ADMIN) ?
                // Admin drop-down options
                <React.Fragment>
                  <Dropdown.Item id={COMPONENT_IDS.NAVBAR_ADMIN_DROPDOWN_SIGN_UP_ORGANIZATION} text="Sign up new organization" as={NavLink} exact to="/org-signup"/>
                  <Dropdown.Item id={COMPONENT_IDS.NAVBAR_DROPDOWN_ADD_OPPORTUNITY} text="Add Opportunity" as={NavLink} exact to="/add-opportunity"/>
                  <Dropdown.Item id={COMPONENT_IDS.NAVBAR_DROPDOWN_ACCOUNT_SETTINGS} text="Account Settings" as={NavLink} exact to="/notfound"/>
                  <Dropdown.Item id={COMPONENT_IDS.NAVBAR_SIGN_OUT} icon="sign out" text="Logout" as={NavLink} exact to="/signout"/>
                </React.Fragment> : ''}
              {(role === ROLE.ORGANIZATION) ?
                // Org drop-down options
                <React.Fragment>
                  <Dropdown.Item id={COMPONENT_IDS.NAVBAR_DROPDOWN_MY_PROFILE} text="My Profile" as={NavLink} exact to="/my-profile"/>
                  <Dropdown.Item id={COMPONENT_IDS.NAVBAR_DROPDOWN_ADD_OPPORTUNITY} text="Add Opportunity" as={NavLink} exact to="/add-opportunity"/>
                  <Dropdown.Item id={COMPONENT_IDS.NAVBAR_DROPDOWN_MY_ORGANIZATION_PROFILE} text="My Organization Profile" as={NavLink} exact to="/notfound"/>
                  <Dropdown.Item id={COMPONENT_IDS.NAVBAR_DROPDOWN_ACCOUNT_SETTINGS} text="Account Settings" as={NavLink} exact to="/notfound"/>
                  <Dropdown.Item id={COMPONENT_IDS.NAVBAR_SIGN_OUT} icon="sign out" text="Logout" as={NavLink} exact to="/signout"/>
                </React.Fragment> : ''}
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item> :
        <React.Fragment>
          <Menu.Item id={COMPONENT_IDS.NAVBAR_LOGIN_SIGN_UP} as={NavLink} exact to="/signup" key='signup'>Sign Up</Menu.Item>
          <Menu.Item id={COMPONENT_IDS.NAVBAR_LOGIN_SIGN_IN} as={NavLink} exact to="/signin" key='signin'><Icon name='user'/>Sign In</Menu.Item>
        </React.Fragment>
      }
    </Menu>
  );
};

// Declare the types of all properties.
NavBar.propTypes =
{
  role: PropTypes.string,
  currentUser: PropTypes.string,
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
  const role = (doc) ? doc.role : undefined;
  return {
    role,
    currentUser,
  };
})(NavBar);

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(NavBarContainer);
