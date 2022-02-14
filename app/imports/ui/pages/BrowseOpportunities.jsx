import React, { useState } from 'react';
import { Grid, Header, Divider, Card, Segment, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { AutoForm, ErrorsField, SubmitField, SelectField } from 'uniforms-semantic';
import RadioField from '../components/form-fields/RadioField';
import { PAGE_IDS } from '../utilities/PageIDs';
import OpportunityItem from '../components/OpportunityItem';
import { Opportunities } from '../../api/opportunities/OpportunityCollection';

const searchForm = new SimpleSchema({
  orderBy: {
    type: String,
    allowedValues: ['Latest', 'A-Z'],
    defaultValue: 'A-Z',
  },
  age: {
    label: 'Age Group',
    type: String,
    allowedValues: ['Adults', 'Family-Friendly', 'Teens', 'Seniors', 'All'],
    uniforms: { checkboxes: true },
  },
  environmentalPreference: {
    label: 'Environment',
    type: String,
    allowedValues: ['Indoor', 'Outdoor', 'Both', 'No Preference'],
    uniforms: { checkboxes: true },
  },
});

const bridge = new SimpleSchema2Bridge(searchForm);

/** A simple static component to render some text for the landing page. */
const BrowseOpportunities = ({ opps, ready }) => {
  const [datas, setDatas] = useState('');
  const submit = (data, formRef) => {
    setDatas(data);
    formRef.assign();
    // formRef.reset();
  };
  const { age, environmentalPreference } = datas;
  const order = datas.orderBy === 'Latest' ? { sort: { date: 1 } } : { sort: { organization: 1 } };
  const sortOpps = Opportunities.find({
    $and: [
      { environment: environmentalPreference },
      { age: age },
    ],
  }, order);
  console.log(sortOpps);
  const count = sortOpps.count();
  let fRef = null;
  return (
    <Grid id={PAGE_IDS.BROWSE_OPPORTUNITIES} textAlign='center' container>
      <Grid.Row centered>
        <Header as="h1" size="huge">Browse Opportunities</Header>
      </Grid.Row>
      <Divider/>

      <Grid.Row>
        <Header as='h1'>Search Results</Header>
      </Grid.Row>

      <Grid.Row centered columns={3}>
        <Grid.Column>
          <AutoForm ref={ref => {
            fRef = ref;
          }} schema={bridge} onSubmit={data => submit(data, fRef)} >
            <Segment>
              <Header as="h2" textAlign="center">Volunteer Opportunities</Header>
              <SelectField id='orderBy' name='orderBy' showInlineError={true} placeholder={'Order By...'}/>
              <RadioField id='age' name='age' showInlineError={true} />
              <RadioField id='environment' name='environmentalPreference' showInlineError={true}/>
              <SubmitField id='submit' value='Submit' label='Search'/>
              <ErrorsField />
            </Segment>
          </AutoForm>
        </Grid.Column>

        <Grid.Column textAlign="center">
          <Segment>
            <Grid.Row>
              <Header as='h2' >Showing results</Header>
              {(datas === '') ?
                <Header as='h4' >Showing all results</Header> :
                <Header as='h4' >Showing {count} results</Header> }
              <Card.Group centered>
                {(datas === '') ?
                  opps.map((opp) => <OpportunityItem key={opp._id} opp={opp} />) :
                  sortOpps.map((opp) => <OpportunityItem key={opp._id} opp={opp} />)}
              </Card.Group>
            </Grid.Row>
          </Segment>
        </Grid.Column>

        <Grid.Column>
          <Segment>Hello this is the map</Segment>
        </Grid.Column>
      </Grid.Row>

    </Grid>
  );
};

// Require an array of Stuff documents in the props.
BrowseOpportunities.propTypes = {
  opps: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Opportunities.subscribeOpportunity();
  // Determine if the subscription is ready
  const ready = subscription.ready();
  const opps = Opportunities.find({}, { sort: { organization: 1 } }).fetch();
  return {
    opps,
    ready,
  };
})(BrowseOpportunities);
