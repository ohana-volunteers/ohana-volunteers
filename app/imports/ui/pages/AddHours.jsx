import React from 'react';
import { Grid, Segment, Header, Input, Button } from 'semantic-ui-react';
import { PAGE_IDS } from '../utilities/PageIDs';

/** Renders the Page for adding a document. */
const AddHours = () => (
  <Grid id={PAGE_IDS.ADD_HOURS} container centered>
    <Grid.Column>
      <Header as="h2" textAlign="center">Hour Tracking Verification Request</Header>
      <Segment padded>
        <Grid columns={2} stackable textAlign='center'>
          <Grid.Column>
            <Grid.Row>
              <Input label='Event ID:' placeholder='Enter Event ID Number' fluid={true}/>
            </Grid.Row>
            <Grid.Row>
              <Input label='Hours:' placeholder='Enter Number of Hours' fluid={true}/>
            </Grid.Row>
          </Grid.Column>
          <Grid.Column verticalAlign='middle'>
            <Button fluid={true}>
              Submit Verification Request
            </Button>
          </Grid.Column>
        </Grid>
      </Segment>
    </Grid.Column>
  </Grid>
);

export default AddHours;
