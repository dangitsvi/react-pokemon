var React = require('react');
var request = require('superagent');
var Header = require('./components/Header.jsx');
var Pokedex = require('./components/Pokedex.jsx');

var App = React.createClass({
  render: function() {
    return(
      <main>
        <Header />
        <Pokedex />
      </main>
    )
  }
})

React.render(<App />, document.body)
