import React from 'react';
import {Grid, Header, Card, Divider, Item, Icon, Button, Container, Image, DropdownDivider} from 'semantic-ui-react';

const container1Style = { backgroundColor: 'blue', paddingBottom: '325px', marginTop: '-25px', paddingLeft: '0px'};
const textStyle = { color: 'white', marginTop: '150px'};
/** A simple static component to render some text for the About Us page. */
const Organizations = () => (
    <div>
    <Divider style={container1Style}>
        <Container textAlign='center'>
            <Item.Header as="h1" style={textStyle}> Organization Library </Item.Header>
            <Item.Description style={textStyle}> Browse the organizations we work with </Item.Description>
        </Container>
    </Divider>
        <Grid centered columns={4}>
            <Grid.Column>
                <Image src='org-logos-01.png' />
            </Grid.Column>
            <Grid.Column>
                <Image src='org-logos-02.png' />
            </Grid.Column>
            <Grid.Column>
                <Image src='org-logos-03.png' />
            </Grid.Column>
            <Grid.Column>
                <Image src='org-logos-04.png' />
            </Grid.Column>

            <Grid.Row centered columns={4}>
                <Grid.Column>
                    <Image src='org-logos-05.png' />
                </Grid.Column>
                <Grid.Column>
                    <Image src='org-logos-06.png' />
                </Grid.Column>
                <Grid.Column>
                    <Image src='org-logos-07.png' />
                </Grid.Column>
                <Grid.Column>
                    <Image src='org-logos-08.png' />
                </Grid.Column>
            </Grid.Row>

            <Grid.Row centered columns={4}>
                <Grid.Column>
                    <Image src='org-logos-09.png' />
                </Grid.Column>
                <Grid.Column>
                    <Image src='org-logos-10.png' />
                </Grid.Column>
                <Grid.Column>
                    <Image src='org-logos-11.png' />
                </Grid.Column>
                <Grid.Column>
                    <Image src='org-logos-12.png' />
                </Grid.Column>
            </Grid.Row>

            <Grid.Row centered columns={4}>
                <Grid.Column>
                    <Image src='org-logos-13.png' />
                </Grid.Column>
                <Grid.Column>
                    <Image src='org-logos-14.png' />
                </Grid.Column>
                <Grid.Column>
                    <Image src='org-logos-15.png' />
                </Grid.Column>
                <Grid.Column>
                    <Image src='org-logos-16.png' />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </div>
);

export default Organizations;
