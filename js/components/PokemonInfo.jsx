
var React = require('react');
var PokemonDescription = require('./PokemonDescription.jsx')

var PokemonInfo = React.createClass({
  render: function() {
    return(
      <div>
        <p>Name: {this.props.pokemon}</p>
        <PokemonDescription descriptionURI={this.props.descriptionURI} />
        <p>Type 1: {this.props.type1}</p>
        <p>Type 2: {this.props.type2}</p>
      </div>
    )
  }
})

module.exports = PokemonInfo;
