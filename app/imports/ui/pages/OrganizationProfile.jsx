import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Header, List, Image, Divider, Button, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Organizations } from '../../api/organization/OrgCollection';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

/** Organization Profile page that displays info from the Organizations Collection. */
const OrganizationProfile = ({ doc, currentUser, ready }) => ((ready) ? (
  <Grid id={PAGE_IDS.ORGANIZATION_PROFILE} textAlign='center' divided container>
    <Grid.Row>
      <Header as='h1'>{doc.name}</Header>
    </Grid.Row>
    <Divider/>
    <Grid.Row>
      <Grid.Column verticalAlign='middle' textAlign='right' width={10}>
        <Image centered src={doc.logo}/>
      </Grid.Column>
      <Grid.Column width={6} textAlign='left'>
        <List>
          <List.Item icon='marker' content={doc.location}/>
          {(doc.mailing_address) ?
            <List.Item icon='mail outline' content={doc.mailing_address}/> : ''}
          {(doc.website) ?
            <List.Item
              icon='linkify'
              content={<a href={doc.website}>{doc.website}</a>}
            /> : ''}
          <List.Item icon='tag' content={doc.categories.join(', ')}/>
        </List>
        <Header as='h3'>Contact info:</Header>
        <List>
          {(doc.contact.name) ?
            <List.Item icon='user' content={doc.contact.name}/> : ''}
          <List.Item
            icon='mail'
            content={<a href={`mailto:${doc.contact.email}`}>{doc.contact.email}</a>}
          />
          {(doc.contact.address) ?
            <List.Item icon='marker' content={doc.contact.address}/> : ''}
          {(doc.contact.phone) ?
            <List.Item icon='phone' content={doc.contact.phone}/> : ''}
        </List>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      {/* Only display the edit button if logged in as owner */}
      {(doc.owner === currentUser) ?
        <Button id={COMPONENT_IDS.ORGANIZATION_PROFILE_EDIT} href={`#/edit-organization-profile/${doc._id}`}>Edit Profile</Button> : ''}
      <br/>
    </Grid.Row>
  </Grid>
) : <Loader active>Getting data</Loader>);

OrganizationProfile.propTypes = {
  doc: PropTypes.object,
  currentUser: PropTypes.string,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  const documentId = _id;
  const subscription = Organizations.subscribe();
  const ready = subscription.ready();
  // Get the document
  const doc = (ready) ? Organizations.findDoc(documentId) : undefined;
  // Get the current user
  const currentUser = Meteor.user() ? Meteor.user().username : '';
  return {
    doc,
    currentUser,
    ready,
  };
})(OrganizationProfile);
