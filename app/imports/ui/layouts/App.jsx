import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import AddHours from '../pages/AddHours';
import ListHours from '../pages/ListHours';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import organizations from '../pages/OrganizationLibrary';
import BrowseOpportunities from '../pages/BrowseOpportunities';
import BrowseOpportunitiesAdmin from '../pages/BrowseOpportunitiesAdmin';
import AddOpportunity from '../pages/AddOpportunity';
import EditOpportunity from '../pages/EditOpportunity';
import Signup from '../pages/Signup';
import OrganizationSignup from '../pages/OrganizationSignup';
import Signout from '../pages/Signout';
import ManageDatabase from '../pages/ManageDatabase';
import AdminHome from '../pages/AdminHome';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import VolunteerProfile from '../pages/VolunteerProfile';
import MyVolunteerProfile from '../pages/MyVolunteerProfile';
import EditVolunteerProfile from '../pages/EditVolunteerProfile';
import AboutUs from '../pages/AboutUs';
import OrganizationProfile from '../pages/OrganizationProfile';
import { ROLE } from '../../api/role/Role';
import CommunityEvent from '../pages/CommunityEvent';
import TermsAndConditions from '../pages/TermsAndConditions';
import OpportunityDetails from '../pages/OpportunityDetails';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar/>
          <Switch>
            <Route exact path="/" component={Landing}/>
            <Route path="/privacy-policy" component={PrivacyPolicy}/>
            <Route path="/about-us" component={AboutUs}/>
            <Route path="/signin" component={Signin}/>
            <Route path="/signup" component={Signup}/>
            <AdminProtectedRoute path="/org-signup" component={OrganizationSignup}/>
            <Route path="/signout" component={Signout}/>
            <Route path="/organization-profile/:_id" component={OrganizationProfile}/>
            <ProtectedRoute path="/my-organization-profile/" component={OrganizationProfile}/>
            <ProtectedRoute path="/volunteer-profile/:_id" component={VolunteerProfile}/>
            <ProtectedRoute path="/my-profile" component={MyVolunteerProfile}/>
            <ProtectedRoute path="/edit-my-profile" component={EditVolunteerProfile}/>
            <ProtectedRoute path="/addHours" component={AddHours}/>
            <ProtectedRoute path="/listHours" component={ListHours}/>
            <AdminProtectedRoute path="/manage-database" component={ManageDatabase}/>
            <AdminProtectedRoute path="/admin-home" component={AdminHome}/>
            <Route path="/organization-library" component={organizations}/>
            <Route path="/browse-opportunities" component={BrowseOpportunities}/>
            <Route path="/TermsAndConditions" component={TermsAndConditions}/>
            <ProtectedRoute path="/browse-opportunities-admin" component={BrowseOpportunitiesAdmin}/>
            <ProtectedRoute path="/add-opportunity" component={AddOpportunity}/>
            <ProtectedRoute path="/edit/:_id" component={EditOpportunity}/>
            <ProtectedRoute path="/opportunity-page/:_id" component={OpportunityDetails}/>
            <Route path="/event" component={CommunityEvent}/>
            <Route path="/notfound" component={NotFound}/>
          </Switch>
          <Footer/>
        </div>
      </Router>
    );
  }
}

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      return isLogged ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      const isAdmin = Roles.userIsInRole(Meteor.userId(), ROLE.ADMIN);
      return (isLogged && isAdmin) ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

export default App;
