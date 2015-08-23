var React = require('react');
var request = require('superagent');
var Pokemon = require('./Pokemon.jsx')


var Pokedex = React.createClass({
  render: function() {
    return(
      <section>
        <h3>Hit next to find your pokemon</h3>
        <Pokemon />
      </section>
    )
  }
})

module.exports = Pokedex;
