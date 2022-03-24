import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Grid, Header, Icon, Image, Modal } from 'semantic-ui-react';
import swal from 'sweetalert';
import { removeVolunteerMethod } from '../../api/user/volunteer/VolunteerProfileCollection.methods';
import { decode } from '../utilities/ImageDecode';

/** Renders individual card of volunteer profiles that admin can view. */
const AdminViewVolunteers = ({ doc }) => {

  const [open, closed] = useState(false);
  const removeVolunteer = () => {
    const docID = doc._id;
    removeVolunteerMethod.callPromise(docID)
      .catch(error => swal('Deletion unsuccessful', error.message, 'error'))
      .then(() => swal('Deletion successful', 'Document has been removed', 'success'));
    closed(false);
  };
  const modalVolunteer = (
    <Modal
      onClose={() => closed(false)}
      onOpen={() => closed(true)}
      open={open}
      trigger={<Button color='red' size='small'><Icon name='trash'/>Delete</Button>}>
      <Header>Confirm Deletion</Header>
      <Modal.Content>
        <Grid container centered verticalAlign='middle' rows={2}>
          <Grid.Row>
            <Icon name='warning circle' size='huge' color='yellow'/>
          </Grid.Row>
          <Grid.Row>
            <Header as='h1'>Are you sure you want to delete this volunteer from the system?</Header>
          </Grid.Row>
        </Grid>
      </Modal.Content>
      <Modal.Actions>
        <Grid relaxed padded centered columns={1}>
          <Grid.Row>
            <Button negative size='huge' content='Cancel'
              onClick={() => closed(false)}/>
            <Button positive size='huge' content='Delete Document'
              onClick={() => removeVolunteer()}/>
          </Grid.Row>
        </Grid>
      </Modal.Actions>
    </Modal>
  );
  return (
    <Card>
      <Card.Content>
        <Image
          floated='right'
          size='tiny'
          src={decode(doc.profilePicture)}/>
        <Card.Header>{doc.firstName} {doc.lastName}</Card.Header>
        <Card.Meta>{doc.email}</Card.Meta>
        <Card.Description><u>Total Hours:</u> {doc.totalHours}</Card.Description>
        <Card.Description><u>Events Participated:</u> {doc.eventsParticipated}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button
          color='grey'
          size='small'
          as='a'
          href={`#/volunteer-profile/${doc._id}`}>
          <Icon name='eye'/>View</Button>
        {modalVolunteer}
      </Card.Content>
    </Card>
  );
};

AdminViewVolunteers.propTypes = {
  doc: PropTypes.object,
  deleteFunction: PropTypes.func,

};

export default AdminViewVolunteers;
