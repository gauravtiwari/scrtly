import React, { Component } from 'react';
import $ from 'jquery';

// Menu Component
class Menu extends Component {
  constructor(props) {
    super(props);
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  componentDidMount() {
    const dropdown = this.refs.dropdown;
    $('body').click((event) => {
      if ($(event.target).is($(dropdown))) return;
      if ($(dropdown).has($(event.target)).length > 0) return;
      if ($(dropdown).hasClass('active')) {
        $(dropdown).removeClass('active');
      }
    });
  }

  toggleDropdown(event) {
    event.preventDefault();
    $(this.refs.dropdown).toggleClass('active');
  }

  render() {
    return (
      <div className="menu">
        <ul className="general-list">
          <li>
            <a href="#" onClick={this.toggleDropdown}>
              Subscribe by Email
            </a>
            <div className="dropdown" ref="dropdown">
              <h1>People share secrets. We curate.</h1>
              <h2>Subscribe to get the best of them.</h2>
              <form className="subscription-form">
                <input type="text" id="mail" name="mail" placeholder="email address" />
                <input type="submit" id="submit" name="submit" value="subscribe" />
              </form>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default Menu;
