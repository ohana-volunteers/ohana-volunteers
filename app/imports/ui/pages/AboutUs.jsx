import React from 'react';
import { Grid, Header, Card, Divider, Item, Icon, Button, Container } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { PAGE_IDS } from '../utilities/PageIDs';


const textStyle = { color: 'black', marginTop: '50px', fontSize: '55px', fontFamily: 'Copperplate' };
const textStyle2 = { color: 'black', fontSize: '40px', fontFamily: 'Copperplate', fontWeight: 'bold' };

const textStyle3 = { color: 'black', fontSize: '18px', fontFamily: 'Copperplate' };
const bodyStyle = { backgroundColor: 'rgba(0, 255, 255, .1)', marginBottom: '-22px', marginTop: '-25px' };
const fontStyle = {fontFamily: 'Copperplate'};

/** A simple static component to render some text for the About Us page. */
const AboutUs = () => (
  <Container fluid style={bodyStyle}>
    <Grid id={PAGE_IDS.ABOUT_US} container>
      <Grid.Row centered>
        <Header as="h1" size="huge" textAlign="center" style={textStyle}>About VolunteerAlly</Header>
      </Grid.Row>
      <Divider/>
      <Grid.Row>
        <Item>
          <Item.Content>
            <Item.Header as="h1" style={textStyle2}>An Easier Way to Volunteer</Item.Header>
            <Card.Description style={textStyle3}>VolunteerAlly is a non-profit organization designed to help pair volunteers with organizations in need of service.
            On our site you can find numerous organizations and their volunteer opportunities all in one place.
            Once a user, you will have access to sign up for the various volunteer opportunities, from one-time opportunities to flexible/reoccuring opportunities. VolunteerAlly is designed to make volunteering easy.</Card.Description>
          </Item.Content>
        </Item>
      </Grid.Row>
      <Grid.Row>
        <Item>
          <Item.Content>
            <Item.Header as="h1" style={textStyle2}>Why Volunteer Ally?</Item.Header>
            <Item.Description style={textStyle3}>Volunteer opportunities are vitally important to the wellbeing of a community.
            VolunteerAlly makes it easy for volunteers to find organizations in need, and for organizations to find qualified volunteers. </Item.Description>
            <Item.Description style={textStyle3}>VolunteerAlly makes it simple to give back.</Item.Description>
          </Item.Content>
        </Item>
      </Grid.Row>
      <Grid.Row>
        <Header as="h1" style={textStyle2}>VolunteerAlly Team</Header>
        <Card.Group centered>
          <Card>
            <div className="about-us-icon">
              <Icon name="user" size='huge' className="about-us-icon"/>
            </div>
            <Card.Content>
              <Card.Header>Leslie Kobayashi</Card.Header>
              <Card.Meta>Board Chair</Card.Meta>
            </Card.Content>
          </Card>
          <Card>
            <div className="about-us-icon">
              <Icon name="user" size='huge' className="about-us-icon"/>
            </div>
            <Card.Content>
              <Card.Header>Ronald Sakamoto</Card.Header>
              <Card.Meta>Board Vice-Chair</Card.Meta>
            </Card.Content>
          </Card>
          <Card>
            <div className="about-us-icon">
              <Icon name="user" size='huge' className="about-us-icon"/>
            </div>
            <Card.Content>
              <Card.Header>C. Scott Wo</Card.Header>
              <Card.Meta>President</Card.Meta>
            </Card.Content>
          </Card>
          <Card>
            <div className="about-us-icon">
              <Icon name="user" size='huge' className="about-us-icon"/>
            </div>
            <Card.Content>
              <Card.Header>Malindi Brand</Card.Header>
              <Card.Meta>Director</Card.Meta>
            </Card.Content>
          </Card>
          <Card>
            <div className="about-us-icon">
              <Icon name="user" size='huge' className="about-us-icon"/>
            </div>
            <Card.Content>
              <Card.Header>Nancy Wo</Card.Header>
              <Card.Meta>Executive Director</Card.Meta>
            </Card.Content>
          </Card>
          <Card>
            <div className="about-us-icon">
              <Icon name="user" size='huge' className="about-us-icon"/>
            </div>
            <Card.Content>
              <Card.Header>Chase Conching</Card.Header>
              <Card.Meta>Webmaster</Card.Meta>
            </Card.Content>
          </Card>
          <Card>
            <div className="about-us-icon">
              <Icon name="user" size='huge' className="about-us-icon"/>
            </div>
            <Card.Content>
              <Card.Header>Jodi Ching</Card.Header>
              <Card.Meta>Treasurer</Card.Meta>
            </Card.Content>
          </Card>
          <Card>
            <div className="about-us-icon">
              <Icon name="user" size='huge' className="about-us-icon"/>
            </div>
            <Card.Content>
              <Card.Header>Patricia McCarthy</Card.Header>
              <Card.Meta>Secretary</Card.Meta>
            </Card.Content>
          </Card>
        </Card.Group>
      </Grid.Row>
      <Grid.Row textAlign="center">
        <Grid.Column>
          <Header as="h3">Launch Team</Header>
          <Card.Group centered>
            <Card>
              <div className="about-us-icon">
                <Icon name="user" size='huge' className="about-us-icon"/>
              </div>
              <Card.Content>
                <Card.Header>Curren Gaspar</Card.Header>
              </Card.Content>
            </Card>
            <Card>
              <div className="about-us-icon">
                <Icon name="user" size='huge' className="about-us-icon"/>
              </div>
              <Card.Content>
                <Card.Header>Jonathan Turner
                </Card.Header>
              </Card.Content>
            </Card>
          </Card.Group>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Card centered>
        <div className="about-us-icon">
          <Icon name="user" size='huge' className="about-us-icon"/>
        </div>
        <Card.Content>
          <Card.Header>Allyson Wo</Card.Header>
          <Card.Meta>Founder</Card.Meta>
        </Card.Content>
      </Card>
    </Grid.Row>
    <Divider/>
    <Grid.Row centered>
      <Header as='h1' style={fontStyle}>Ready to Get Started?</Header>
    </Grid.Row>
    <Grid.Row centered>
      <p style={fontStyle}>Sign up now as a volunteer!</p>
    </Grid.Row>
    <Grid.Row centered>
      <Button as={NavLink} activeClassName="active" exact to='/signup'>Get Started</Button>
    </Grid.Row>


    </Grid>
  </Container>

);

export default AboutUs;
