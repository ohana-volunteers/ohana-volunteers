import React from 'react';
import { Grid, Divider, Item, Icon, Container, Image, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Organizations } from '../../api/user/organization/OrgProfileCollection';
import { PAGE_IDS } from '../utilities/PageIDs';

const container1Style = { backgroundColor: 'teal', paddingBottom: '325px', marginTop: '-25px', paddingLeft: '0px' };
const bodyStyle = { backgroundColor: 'rgba(0, 255, 255, .1)', marginBottom: '-50px' };
const textStyle = { color: 'white', marginTop: '120px', fontSize: '55px', fontFamily: 'Papyrus' };
const textStyle2 = { color: 'teal', textAlign: 'center', marginTop: '40px', fontSize: '40px', fontFamily: 'Copperplate' };
const textStyle3 = { color: 'teal', textAlign: 'center', paddingTop: '50px', marginTop: '20px', fontSize: '20px', fontFamily: 'Copperplate' };
const textStyle4 = { color: 'teal', textAlign: 'center', paddingTop: '50px', marginTop: '0px', fontSize: '20px', fontFamily: 'Copperplate' };
const textStyle5 = { color: 'white', fontSize: '15px' };
const textStyle7 = { color: 'black', fontSize: '55px', fontFamily: 'Papyrus', marginBottom: '-50px' };
const iconStyle = { paddingLeft: '115px' };
const iconTextStyle = { paddingLeft: '80px', fontsize: '30px', fontFamily: 'Copperplate', color: 'teal' };
const gridStyle = { marginTop: '100px' };
const gridStyle3 = { marginTop: '50px' };
const gridStyle4 = { marginTop: '50px', marginBottom: '50px' };
const marginTop = { marginTop: '100px' };

/** A simple static component to render some text for the About Us page. */

const OrganizationLibrary = ({ orgs, ready }) => (

  <Container fluid style={bodyStyle} id={PAGE_IDS.ORGANIZATION_LIBRARY}>
    <Divider style={container1Style}>
      <Container textAlign='center'>
        <Item.Header as="h1" style={textStyle}> Organization Library </Item.Header>
        <Item.Description style={textStyle5}> Browse the organizations we work with </Item.Description>
      </Container>
    </Divider>

    {(ready) ? (
      <Grid centered columns={4}>
        {orgs.map((org) => (
          <Image
            key={org._id} as='a'
            href={`#/organization-profile/${org._id}`}
            src={org.logo_mini}
          />))
        }
      </Grid>
    ) : <Loader active>Fetching Organizations...</Loader>}

    <Image centered src='/images/elissa-garcia-MV1l4f_f1os-unsplash-2048x1365.jpg' size='massive' style={marginTop}/>

    <Grid centered columns={16} style={gridStyle3}>
      <Grid.Column>
        <Icon name='ellipsis horizontal' size='huge'/>
      </Grid.Column>
    </Grid>

    <Item.Header as="h1" style={textStyle2}> Join over 20 organizations already finding the help they need with Volunteer Ally. </Item.Header>

    <Grid centered columns={16} style={gridStyle3}>
      <Grid.Column>
        <Icon name='ellipsis horizontal' size='huge'/>
      </Grid.Column>
    </Grid>

    <Item.Description style={textStyle3}> There are thousands of active volunteers waiting for opportunities to work with qualified organizations.
        Make sure your organization is volunteer-ready with Volunteer Ally. Our system allows you to easily post your volunteer opportunities and have them easily found by qualified volunteers – all for free! </Item.Description>

    <Grid centered columns={16} style={gridStyle3}>
      <Grid.Column>
        <Icon name='ellipsis horizontal' size='huge'/>
      </Grid.Column>
    </Grid>

    <Item.Description style={textStyle4}> Here are some of the great features you’ll find with Volunteer Ally: </Item.Description>

    <Grid style={gridStyle}>
        <Grid.Column></Grid.Column>
      <Grid.Column>
        <Icon name='check' size='big'/>
      </Grid.Column>
      <Grid.Column width={10}>
        <Item.Description style={iconTextStyle}> Access to hundreds of volunteers with a wide range of skills and availability </Item.Description>
      </Grid.Column>
    </Grid>

    <Grid>
        <Grid.Column></Grid.Column>
      <Grid.Column>
        <Icon name='check' size='big'/>
      </Grid.Column>
      <Grid.Column width={10}>
        <Item.Description style={iconTextStyle}> Direct opportunity RSVPs to your inbox </Item.Description>
      </Grid.Column>
    </Grid>

    <Grid>
        <Grid.Column></Grid.Column>
      <Grid.Column>
        <Icon name='check' size='big'/>
      </Grid.Column>
      <Grid.Column width={10}>
        <Item.Description style={iconTextStyle}> Database of volunteers and opportunities </Item.Description>
      </Grid.Column>
    </Grid>

    <Grid>
        <Grid.Column></Grid.Column>
      <Grid.Column>
        <Icon name='check' size='big'/>
      </Grid.Column>
      <Grid.Column width={10}>
        <Item.Description style={iconTextStyle}> Integration-ready </Item.Description>
      </Grid.Column>
    </Grid>
    <Container textAlign='center'>
      <Link to={'/signup'}><Item.Header as="h1" style={textStyle7}> Sign Up Today! </Item.Header></Link>
    </Container>
    <Grid centered columns={16} style={gridStyle4}>
      <Grid.Column>
        <Link to={'/signup'}> <Icon name='handshake outline' size='huge'/></Link>
      </Grid.Column>
    </Grid>
  </Container>
);

// Require an array of documents in the props.
OrganizationLibrary.propTypes = {
  orgs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to documents.
  const subscription = Organizations.subscribe();
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the documents and sort them by name.
  const orgs = Organizations.find({}, { sort: { name: 1 } }).fetch();
  return {
    orgs,
    ready,
  };
})(OrganizationLibrary);
