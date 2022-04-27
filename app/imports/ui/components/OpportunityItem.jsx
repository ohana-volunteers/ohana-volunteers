import React from 'react';
import swal from 'sweetalert';
import { Image, Card, Label, Icon, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { volunteerCategories } from '../../api/utilities/VolunteerCategories';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { Opportunities } from '../../api/opportunities/OpportunityCollection';
import { ROLE } from '../../api/role/Role';
import { removeItMethod, updateMethod } from '../../api/base/BaseCollection.methods';
import { decode } from '../utilities/ImageDecode';
import { VolunteerProfiles } from '../../api/user/volunteer/VolunteerProfileCollection';

const OpportunityItem = ({ opp, user, role }) => {
  const toDate = new Date();

  // Remove volunteer's user ID from opportunity
  const oppUnregister = (volunteerDoc) => {
    const collectionName = Opportunities.getCollectionName();
    const doc = Opportunities.findOne({ _id: opp._id });
    const registeredVolunteers = doc.registeredVolunteers.slice();
    registeredVolunteers.splice(registeredVolunteers.indexOf(volunteerDoc.userID), 1);
    const updateData = { id: doc._id, registeredVolunteers, isVerified: true };
    updateMethod.callPromise({ collectionName, updateData });
  };

  // Remove opportunity's ID from volunteer's registered events
  const volunteerProfileUnregister = () => {
    const volunteerDoc = VolunteerProfiles.findOne({ email: user });
    const collectionName = VolunteerProfiles.getCollectionName();
    const registeredEvents = volunteerDoc.registeredEvents.slice();
    swal({
      text: 'Do you want to unregister from this opportunity? You can always register again as long as it is active.',
      icon: 'info',
      buttons: true,
    }).then((confirmUnregistration) => {
      if (confirmUnregistration) {
        registeredEvents.splice(registeredEvents.indexOf(opp._id), 1);
        const updateData = { id: volunteerDoc._id, registeredEvents };
        updateMethod.callPromise({ collectionName, updateData })
          .catch(error => swal('Error', error.message, 'error'))
          .then(() => swal('Success', 'You have unregistered for this event', 'success'));
        oppUnregister(volunteerDoc);
      }
    });
  };
  return (
    <Card href={(user === 'admin@foo.com' || role === ROLE.VOLUNTEER) ? '' : `#/opportunity-page/${opp._id}`} id={COMPONENT_IDS.OPPORTUNITY_ITEM}
      color='blue'>
      <Label color='blue' ribbon>
        <p>
        From {opp.date.start.toISOString().slice(0, 10).concat('  ')}
          {opp.date.start.toISOString().slice(11, 16).concat('  ')}
          <br/>
        To {opp.date.end.toISOString().slice(0, 10).concat('  ')}
          {opp.date.end.toISOString().slice(11, 16)}
        </p>
      </Label>
      <Card.Content>
        <Image size='tiny' src={decode(opp.img)}/>
        <Card.Header>{opp.event}</Card.Header>
        <Card.Meta> <Icon name='map marker alternate'/>{opp.address}</Card.Meta>
        <Card.Description>{opp.organization}</Card.Description>
        {opp.isVerified ?
          <Label size='tiny' color='green'> Verified <Icon name='check'/></Label> : ''}
      </Card.Content>
      <Card.Content extra>
        {opp.categories.map((item, index) => <Label key={index} size='tiny'
          color='blue'>{volunteerCategories[item].name}</Label>)}
      </Card.Content>
      <Card.Content extra>
        <Icon name='sun'/>{opp.environment} | <Icon name='male'/>
        {opp.age.length > 1 ? opp.age[0].concat('...') : opp.age}
      </Card.Content>
      {/* Only display the edit button if logged in as admin */}
      {(user === 'admin@foo.com') ?
        <Card.Content extra>
          <Button basic color='green' size='tiny' href={`#/opportunity-page/${opp._id}`}>
            <Icon name='linkify'/>
            View
          </Button>
          <Button basic color='blue' size='tiny' href={`#/edit/${opp._id}`}>
            <Icon name='edit'/>
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
            <Icon name='trash'/>
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
                      const updateData = {
                        id: doc._id,
                        date: doc.date,
                        img: doc.img,
                        organization: doc.organization,
                        address: doc.address,
                        description: doc.description,
                        coordinates: doc.coordinates,
                        event: doc.event,
                        categories: doc.categories,
                        environment: doc.environment,
                        age: doc.age,
                        registeredVolunteers: doc.registeredVolunteers,
                        isVerified: true,
                      };
                      updateMethod.callPromise({ collectionName, updateData })
                        .catch(error => swal('Error', error.message, 'error'))
                        .then(() => {
                          swal('Success', 'This opportunity has been verified!', 'success');
                        });
                    }
                  });
              }
              }

            > Verify It Now <Icon name='hand point up outline'/></Button>}
        </Card.Content>
        : ''}
      {/* Only display the cancel registration button if logged in as volunteer and if opportunity is active */}
      {(role === ROLE.VOLUNTEER && opp.date.end >= toDate) ?
        <Card.Content extra>
          <Button basic color='green' size='tiny' href={`#/opportunity-page/${opp._id}`}>
            <Icon name='linkify'/> View
          </Button>
          <Button basic color='orange' size='tiny' onClick={volunteerProfileUnregister}>
            <Icon name='close'/>Cancel Registration
          </Button>
        </Card.Content> : '' }
    </Card>
  );
};
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
    age: PropTypes.array,
    registeredVolunteers: PropTypes.array,
    isVerified: PropTypes.bool,
  }).isRequired,
  user: PropTypes.string,
  role: PropTypes.string,
};

export default withRouter(OpportunityItem);
