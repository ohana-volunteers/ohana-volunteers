import React from 'react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => {
  const divStyle = { paddingTop: '15px' };
  return (
    <footer>
      <div style={divStyle} className="ui center aligned container">
        <hr/>
        ©2021-2022 VolunteerAlly and&nbsp;
        <a href='https://github.com/ohana-volunteers'>Ohana Volunteers.</a>&nbsp;
        All rights reserved.&nbsp;
        <a href='#/privacy-policy'>Privacy Policy.</a>&nbsp;
        Terms & Conditions.&nbsp;
      </div>
      <br/>
    </footer>
  );
};

export default Footer;
