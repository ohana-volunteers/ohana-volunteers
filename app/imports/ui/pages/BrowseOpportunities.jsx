import React, { useState } from 'react';
import { Grid, Header, Divider, Card, Segment, Loader, Tab, Container } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, SelectField, DateField } from 'uniforms-semantic';
import RadioField from '../components/form-fields/RadioField';
import MultiSelectField from '../components/form-fields/MultiSelectField';
import { PAGE_IDS } from '../utilities/PageIDs';
import OpportunityItem from '../components/OpportunityItem';
import { Opportunities } from '../../api/opportunities/OpportunityCollection';
import { volunteerCategories } from '../../api/utilities/VolunteerCategories';
import CategoryItem from '../components/CategoryItem';
import { searchForm } from '../../api/utilities/FilterScheme';
import MapView from '../components/MapView';

const bridge = new SimpleSchema2Bridge(searchForm);
const segmentStyle = { overflow: 'auto', maxHeight: 580 };
const buttonStyle = { color: 'white', backgroundColor: '#2185D0' };
const textStyle = { color: 'black', marginTop: '50px', marginBottom: '10px', fontSize: '55px', fontFamily: 'Copperplate' };
const bodyStyle = { backgroundColor: 'rgba(0, 255, 255, .1)', marginBottom: '-22px', marginTop: '-25px' };

const BrowseOpportunities = ({ opps, ready }) => {

  const [datas, setDatas] = useState('');
  const submit = (data, formRef) => {
    setDatas(data);
    formRef.reset();
  };
  const { time } = datas;
  const order = datas.orderBy === 'Latest' ? { sort: { date: -1 } } : { sort: { organization: 1 } };
  const age = datas.age ? { age: { $in: datas.age } } : {};
  const envir = datas.environmentalPreference ? { environment: datas.environmentalPreference } : {};
  const cate = datas.categories ? { categories: { $in: datas.categories } } : {};
  const sortOpps = Opportunities.find({
    $and: [
      // { $text: { $search: 'hawaii' } },
      cate,
      envir,
      age,
      { 'date.start': { $gte: time } },
    ],
  }, order);
  const count = sortOpps.count();
  const panes = [
    // eslint-disable-next-line react/display-name
    { menuItem: 'Showing Categories', render: () => <Tab.Pane>
      <Card.Group centered color='blue'>
        {Object.keys(volunteerCategories).map((item) => {
          const cat = volunteerCategories[item];
          const quantity = Opportunities.find({ categories: { $regex: item } }).count();
          return <CategoryItem key={cat.name} cat={cat} quantity={quantity} />;
        })}
      </Card.Group>
    </Tab.Pane> },
    // eslint-disable-next-line react/display-name
    { menuItem: 'Map', render: () => <Tab.Pane>
      <MapView opps={sortOpps} />
    </Tab.Pane> },
  ];
  let fRef = null;
  return (ready) ? (
    <Container fluid style={bodyStyle}>
      <Grid id={PAGE_IDS.BROWSE_OPPORTUNITIES} textAlign='center' container>
        <Grid.Row centered>
          <Header as="h1" size="huge" style={textStyle}>Browse Opportunities</Header>
        </Grid.Row>
        <Divider/>
        <Grid.Row centered columns={3}>
          <Grid.Column >
            <Header as='h2' icon='filter' content='Volunteer Opportunities' className='special-header' />
            <Segment style={{ overflow: 'auto', maxHeight: 500 }} padded >
              <AutoForm ref={ref => {
                fRef = ref;
              }} schema={bridge} onSubmit={data => submit(data, fRef)}>
                <MultiSelectField id='categories' name='categories' showInlineError={true} placeholder={'Education'}/>
                <SelectField id='orderBy' name='orderBy' showInlineError={true} placeholder={'Order By...'}/>
                <DateField id='time' name='time' showInlineError={true} />
                <SelectField checkboxes id='age' name='age' showInlineError={true} />
                <RadioField id='environment' name='environmentalPreference' showInlineError={true}/>
                <SubmitField id='submit' value='Filter' style={buttonStyle}/>
                <ErrorsField />
              </AutoForm>
            </Segment>
          </Grid.Column>

          <Grid.Column textAlign="center">
            <Segment style={segmentStyle} padded >
              {(datas === '') ?
                <Header as='h4' >Showing all results</Header> :
                <Header as='h4' >Showing {count} results</Header> }
              <Card.Group centered>
                {(datas === '') ?
                  opps.map((opp) => <OpportunityItem key={opp._id} opp={opp} user={''} role={''} />) :
                  sortOpps.map((opp) => <OpportunityItem key={opp._id} opp={opp} user={''} role={''}/>)}
              </Card.Group>
            </Segment>
          </Grid.Column>

          <Grid.Column textAlign="center">
            <Segment style={segmentStyle} padded>
              <Tab panes={panes} />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  ) : <Loader active>Getting data</Loader>;
};

// Require an array of Opportunity documents in the props.
BrowseOpportunities.propTypes = {
  opps: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Opportunity documents.
  const subscription = Opportunities.subscribeOpportunity();
  // Determine if the subscription is ready
  const ready = subscription.ready();
  const opps = Opportunities.find({ isVerified: true }, { sort: { organization: 1 } }).fetch();
  return {
    opps,
    ready,
  };
})(BrowseOpportunities);
