import React from 'react';
import PropTypes from 'prop-types';
import { Card, Grid, Icon, List, Header, Divider, Button, Tab } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { volunteerInterests } from '../../api/utilities/VolunteerCategories';
import OpportunityItem from './OpportunityItem';

/** The main section of the volunteer profile page that presents the main information of the user. */
const VolunteerProfileDetails = ({ doc, activeOpps, expiredOpps }) => {
  const panes = [
    // eslint-disable-next-line react/display-name
    { menuItem: 'Active', render: () => <Tab.Pane>
      {(activeOpps.length === 0) ?
        <React.Fragment>
          <Header as="h1" textAlign="center">No Opportunities Registered!</Header>
          <Header as="h2" textAlign="center">Go out and register for an opportunity!</Header>
          <Button as={NavLink} exact to='/browse-opportunities' primary>Browse Opportunities</Button>
        </React.Fragment> :
        <Card.Group centered>
          {activeOpps.map((opp) => <OpportunityItem key={opp._id} opp={opp} user={''}/>)}
        </Card.Group> }
    </Tab.Pane> },
    // eslint-disable-next-line react/display-name
    { menuItem: 'Finished', render: () => <Tab.Pane>
      {(expiredOpps.length === 0) ?
        <React.Fragment>
          <Header as="h1" textAlign="center">No Opportunities Finished!</Header>
          <Header as="h2" textAlign="center">Any finished opportunities will appear here!</Header>
        </React.Fragment> :
        <Card.Group centered>
          {expiredOpps.map((opp) => <OpportunityItem key={opp._id} opp={opp} user={''}/>)}
        </Card.Group> }
    </Tab.Pane> },
  ];
  return (
    <Grid stackable container>
      <Grid.Column width={5}>
        <Card>
          <Card.Content>
            <Card.Header>Interests <Icon name="handshake outline"/></Card.Header>
          </Card.Content>
          <Card.Content>
            <List/>
            {doc.interests.map((item, index) => <List.Item key={index}>
              <List.Content>
                <Icon circular size="large" name={volunteerInterests[item].icon}/> {item}
              </List.Content>
            </List.Item>)}
          </Card.Content>
        </Card>
        <Card>
          <Card.Content>
            <Card.Header>Special Skills <Icon name="heart outline"/></Card.Header>
          </Card.Content>
          <Card.Content>
            <List bulleted size="big" items={doc.skills}/>
          </Card.Content>
        </Card>
      </Grid.Column>
      <Grid.Column width={1}>
        <Divider vertical/>
      </Grid.Column>
      <Grid.Column width={10}>
        <Grid.Row>
          <Header as="h3" textAlign="center">Registered Opportunities</Header>
          <Divider/>
          <Grid.Row textAlign="center">
            <Tab menu={{ secondary: true }} panes={panes}/>
          </Grid.Row>
        </Grid.Row>
      </Grid.Column>
    </Grid>
  );
};

VolunteerProfileDetails.propTypes = {
  doc: PropTypes.object,
  activeOpps: PropTypes.array,
  expiredOpps: PropTypes.array,

};

export default VolunteerProfileDetails;
