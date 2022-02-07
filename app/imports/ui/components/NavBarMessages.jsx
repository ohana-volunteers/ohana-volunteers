import React from 'react';
import { Button, Grid, Header, Icon, Modal } from 'semantic-ui-react';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

const NavBarMessages = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <Modal
      closeIcon
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button basic circular id={COMPONENT_IDS.NAVBAR_MESSAGES}><Icon name="comments" color="black"/></Button>}
      key='messages'>
      <Modal.Header>Messages</Modal.Header>
      <Grid container doubling centered verticalAlign='middle'>
        <div className="modal-margin">
          <Grid.Column textAlign='center'>
            <Icon name="inbox" size="big"/>
            <Header as='h3'>No Messages Available</Header>
          </Grid.Column>
        </div>
      </Grid>
      <Modal.Actions>
        <Button
          id={COMPONENT_IDS.NAVBAR_MESSAGES_COMPOSE}
          content="Compose"
          labelPosition='right'
          color="blue"
          icon="plus"
          onClick={() => setOpen(false)}/>
      </Modal.Actions>
    </Modal>
  );
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default NavBarMessages;
