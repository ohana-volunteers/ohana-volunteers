import React from 'react';
import { Grid, Header, Card, Button, Image, Loader, Container, Statistic, Divider, Icon } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { VolunteerProfiles } from '../../api/user/volunteer/VolunteerProfileCollection';
import { Opportunities } from '../../api/opportunities/OpportunityCollection';
import VolunteerProfileDetails from '../components/VolunteerProfileDetails';
import { decode } from '../utilities/ImageDecode';
import { ROLE } from '../../api/role/Role';

/** A simple component to render some text for the Volunteer Profile page. */

const toDate = new Date();

const MyVolunteerProfile = ({ doc, currentUser, activeOpps, expiredOpps, role, ready }) => ((ready) ? (
  <div className="volunteer-profile-background">
    <Container id={PAGE_IDS.MY_VOLUNTEER_PROFILE}>
      <Card fluid>
        <Image className="volunteer-bg-banner" src={decode(doc.bannerPicture)}/>
        <Card.Content>
          <Grid container row={1}>
            <Grid.Row columns={4}>
              <Grid.Column width={2}>
                <Image rounded size="small" src={decode(doc.profilePicture)}/>
              </Grid.Column>
              <Grid.Column width={8}>
                <Card.Header as="h1">
                  {doc.firstName} {doc.lastName}
                  {(doc.email === currentUser) ?
                    <Button primary compact size="large" className="volunteer-edit-button" id={COMPONENT_IDS.VOLUNTEER_PROFILE_EDIT} as={NavLink} exact to="/edit-my-profile">Edit</Button> : ''}
                </Card.Header>
                <Card.Description><b>Bio: </b>{doc.description}</Card.Description>
                <Card.Description><Icon name="mail"/><b>Email: </b>{doc.email} |  <Icon name="tree"/><b>Environmental Preference: </b>{doc.environmentalPreference}</Card.Description>
                <Card.Description><Icon name="phone"/><b>Phone: </b>{doc.phone} | <Icon name="calendar"/><b>Availability: </b>{doc.availability}</Card.Description>
              </Grid.Column>
              <Grid.Column row={2} verticalAlign="middle" width={6}>
                <Grid.Row centered>
                  <Header as="h2" textAlign="center">Stats</Header>
                  <Divider/>
                </Grid.Row>
                <Grid.Row centered>
                  <Statistic size='small' className="volunteer-stats-right">
                    <Statistic.Value>{expiredOpps.length}</Statistic.Value>
                    <Statistic.Label>Events Completed</Statistic.Label>
                  </Statistic>
                </Grid.Row>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Card.Content>
        <Card.Content>
          <VolunteerProfileDetails doc={ doc } activeOpps={ activeOpps } expiredOpps={ expiredOpps } currentUser={currentUser} role={ role }/>
        </Card.Content>
      </Card>
    </Container>
  </div>
) : <Loader active>Getting data</Loader>);
MyVolunteerProfile.propTypes = {
  currentUser: PropTypes.string,
  doc: PropTypes.object,
  activeOpps: PropTypes.array,
  expiredOpps: PropTypes.array,
  role: PropTypes.string,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const currentUser = Meteor.user() ? Meteor.user().username : '';
  const subscriptionVolunteer = VolunteerProfiles.subscribe();
  const subscriptionOpportunity = Opportunities.subscribeOpportunity();
  const ready = subscriptionVolunteer.ready() && subscriptionOpportunity.ready();
  const doc = (ready) ? VolunteerProfiles.findDoc({ email: currentUser }) : undefined;
  const opps = (ready) ? doc.registeredEvents.map((oppID) => Opportunities.findOne({ _id: oppID })) : undefined;
  const filteredOpps = ready ? opps.filter(opp => opp !== undefined) : undefined;
  const activeOpps = (ready) ? filteredOpps.slice().filter(opp => opp.date.end >= toDate) : undefined;
  const expiredOpps = (ready) ? filteredOpps.slice().filter(opp => opp.date.end < toDate) : undefined;
  const role = (VolunteerProfiles.findOne({ email: currentUser })) ? ROLE.VOLUNTEER : '';
  return {
    currentUser,
    doc,
    activeOpps,
    expiredOpps,
    role,
    ready,
  };
})(MyVolunteerProfile);
