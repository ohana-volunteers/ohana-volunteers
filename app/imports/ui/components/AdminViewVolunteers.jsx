import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Grid, Header, Icon, Image, Modal } from 'semantic-ui-react';
import swal from 'sweetalert';
// import { VolunteerProfiles } from '../../api/user/volunteer/VolunteerProfileCollection';
import { decode } from '../utilities/ImageDecode';

/** Renders individual card of volunteer profiles that admin can view. */
const AdminViewVolunteers = ({ doc }) => {

  const [open, closed] = useState(false);
  const alert = () => {
    closed(false);
    setTimeout(() => {
      swal('Document Removed', 'Process completed', 'success');
    }, 10);
    // VolunteerProfiles.removeIt(doc);
  };
  const modal = (
    <Modal
      onClose={() => closed(false)}
      onOpen={() => closed(true)}
      open={open}
      trigger={<Button color='red' size='tiny'><Icon name='trash'/>Delete</Button>}>
      <Header>Confirm Deletion</Header>
      <Modal.Content>
        <Grid container centered verticalAlign='middle' rows={2}>
          <Grid.Row>
            <Icon name='warning circle' size='huge' color='yellow'/>
          </Grid.Row>
          <Grid.Row>
            <Header as='h1'>Are you sure you want to delete this document?</Header>
          </Grid.Row>
        </Grid>
      </Modal.Content>
      <Modal.Actions>
        <Grid relaxed padded centered columns={1}>
          <Grid.Row>
            <Button negative size='huge' content='Cancel'
              onClick={() => closed(false)}/>
            <Button positive size='huge' content='Delete Document'
              onClick={() => alert()}/>
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
          size='tiny'
          as='a'
          href={`#/volunteer-profile/${doc._id}`}>
          <Icon name='eye'/>View</Button>
        <Button color='orange' size='tiny'><Icon name='pencil'/>Edit</Button>
        {modal}
      </Card.Content>
    </Card>
  );
};

AdminViewVolunteers.propTypes = {
  doc: PropTypes.object,
  deleteFunction: PropTypes.func,

};

export default AdminViewVolunteers;
