import React from 'react';
import swal from 'sweetalert';
import { Image, Card, Label, Icon, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { volunteerCategories } from '../../api/utilities/VolunteerCategories';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { Opportunities } from '../../api/opportunities/OpportunityCollection';
import { removeItMethod, updateMethod } from '../../api/base/BaseCollection.methods';
import { decode } from '../utilities/ImageDecode';

const OpportunityItem = ({ opp, user }) => (
  <Card href={(user === 'admin@foo.com') ? '' : `#/opportunity-page/${opp._id}`} id={COMPONENT_IDS.OPPORTUNITY_ITEM} color='blue'>
    <Label color='blue' ribbon >
      <p>
        From {opp.date.start.toISOString().slice(0, 10).concat('  ')}
        {opp.date.start.toISOString().slice(11, 16).concat('  ')}
        <br />
        To {opp.date.end.toISOString().slice(0, 10).concat('  ')}
        {opp.date.end.toISOString().slice(11, 16)}
      </p>
    </Label>
    <Card.Content>
      <Image size='tiny' src={decode(opp.img)} />
      <Card.Header>{opp.organization}</Card.Header>
      <Card.Meta> <Icon name='map marker alternate'/>{opp.address}</Card.Meta>
      <Card.Description>{opp.event}</Card.Description>
      {opp.isVerified ?
        <Label size='tiny'color='green'> Verified <Icon name='check' /></Label> : ''}
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
        <Button basic color='green' size='tiny' href={`#/opportunity-page/${opp._id}`}>
          <Icon name='linkify' />
          View
        </Button>
        <Button basic color='blue' size='tiny' href={`#/edit/${opp._id}`}>
          <Icon name='edit' />
            Edit
        </Button>
        <Button basic color='red' size='tiny' onClick={() => {
          swal({
            text: 'Are you sure you want to delete this opportunity?',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
          })
            .then((willDelete) => {
              if (willDelete) {
                const collectionName = Opportunities.getCollectionName();
                const instance = opp._id;
                removeItMethod.callPromise({ collectionName, instance })
                  .catch(error => swal('Error', error.message, 'error'))
                  .then(() => {
                    swal('Success', 'This opportunity has been deleted!', 'success');
                  });
              }
            });
        }
        }>
          <Icon name='trash' />
            Delete
        </Button>
        {opp.isVerified ? '' :
          <Button style={{ marginTop: '10px' }} fluid size='big' color='red'
            onClick={() => {
              swal({
                text: 'Do you want to verify this opportunity?',
                icon: 'info',
                buttons: true,
                dangerMode: true,
              })
                .then((willVerify) => {
                  if (willVerify) {
                    const collectionName = Opportunities.getCollectionName();
                    const doc = Opportunities.findOne({ _id: opp._id });
                    const updateData = { id: doc._id, date: doc.date, img: doc.img, organization: doc.organization, address: doc.address,
                      description: doc.description, coordinates: doc.coordinates,
                      event: doc.event, categories: doc.categories, environment: doc.environment, age: doc.age, isVerified: true };
                    updateMethod.callPromise({ collectionName, updateData })
                      .catch(error => swal('Error', error.message, 'error'))
                      .then(() => {
                        swal('Success', 'This opportunity has been verified!', 'success');
                      });
                  }
                });
            }
            }

          > Verify It Now <Icon name='hand point up outline' /></Button>}
      </Card.Content>
      : ''}
  </Card>
);
OpportunityItem.propTypes = {
  opp: PropTypes.shape({
    _id: PropTypes.string,
    date: PropTypes.object,
    img: PropTypes.string,
    organization: PropTypes.string,
    address: PropTypes.string,
    description: PropTypes.string,
    coordinates: PropTypes.object,
    event: PropTypes.string,
    categories: PropTypes.array,
    environment: PropTypes.string,
    age: PropTypes.string,
    isVerified: PropTypes.bool,
  }).isRequired,
  user: PropTypes.string,
};

export default withRouter(OpportunityItem);
