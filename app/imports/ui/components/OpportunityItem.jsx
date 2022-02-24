import React from 'react';
import { Image, Card, Label, Icon, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { volunteerCategories } from '../../api/utilities/VolunteerCategories';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

const OpportunityItem = ({ opp, user }) => (
  <Card href={opp.url} id={COMPONENT_IDS.OPPORTUNITY_ITEM} color='blue'>
    <Label color='blue' ribbon>
      <p>
        From {opp.date.start.toISOString().slice(0, 10).concat('  ')}
        {opp.date.start.toISOString().slice(11, 16).concat('  ')}
        <br />
        To {opp.date.end.toISOString().slice(0, 10).concat('  ')}
        {opp.date.end.toISOString().slice(11, 16)}
      </p>
    </Label>
    <Card.Content>
      <Image size='tiny' src={opp.img} />
      <Card.Header>{opp.organization}</Card.Header>
      <Card.Meta> <Icon name='map marker alternate'/>{opp.address}</Card.Meta>
      <Card.Description>{opp.event}</Card.Description>
    </Card.Content>
    <Card.Content extra>
      {opp.categories.map((item, index) => <Label key={index} size='tiny' color='blue'>{volunteerCategories[item].name}</Label>)}
    </Card.Content>
    <Card.Content extra >
      <Icon name='sun' />{opp.environment} | <Icon name='male' /> {opp.age}
    </Card.Content>
    {/* Only display the edit button if logged in as admin */}
    {(user === 'admin@foo.com') ?
      <Card.Content extra>
        <Button basic color='blue'>
          <Icon name='edit' />
            Edit
        </Button>
        <Button basic color='red'>
          <Icon name='trash' />
            Delete
        </Button>
      </Card.Content> : ''}
  </Card>
);
OpportunityItem.propTypes = {
  opp: PropTypes.shape({
    url: PropTypes.string,
    date: PropTypes.object,
    img: PropTypes.string,
    organization: PropTypes.string,
    address: PropTypes.string,
    coordinates: PropTypes.object,
    event: PropTypes.string,
    categories: PropTypes.array,
    environment: PropTypes.string,
    age: PropTypes.string,
  }).isRequired,
  user: PropTypes.string,
};

export default withRouter(OpportunityItem);
