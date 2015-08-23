var React = require('react');
var request = require('superagent');
var PokemonInfo = require('./PokemonInfo.jsx')

var Pokemon = React.createClass({

  incrementCount: function(pokemon) {
    request
      .get('http://pokeapi.co/api/v1/pokemon/' + (this.state.index +1))
      .end(function(err, res) {
        if (err) return console.log(err);
        this.setState({
          index: this.state.index + 1,
          pokemon: res.body.name,
          species: res.body.species,
          types: res.body.types,
          descriptionURI: res.body.descriptions[0].resource_uri
        })
      }.bind(this))
  },

  decrementCount: function(pokemon) {
    request
      .get('http://pokeapi.co/api/v1/pokemon/' + (this.state.index -1))
      .end(function(err, res) {
        if (err) return console.log(err);
        this.setState({
          index: this.state.index - 1,
          pokemon: res.body.name,
          species: res.body.species,
          types: res.body.types,
          descriptionURI: res.body.descriptions[0].resource_uri
        })
      }.bind(this))
  },

  getInitialState: function() {
    return{
      index: 1,
      pokemon:'',
      species:'',
      types:[{name:""},{name:""}],
      descriptionURI:''
    }
  },

  componentDidMount:function() {
    request
      .get('http://pokeapi.co/api/v1/pokemon/' + this.state.index)
      .end(function(err, res) {
        if (err) return console.log(err);
        this.setState({
          pokemon: res.body.name,
          species: res.body.species,
          types: res.body.types,
          descriptionURI: res.body.descriptions[0].resource_uri
        })
      }.bind(this))
  },

  render: function() {
    return (
      <div>
        <img src={"http://pokeapi.co/media/img/" + this.state.index + ".png"} />
        <PokemonInfo
          pokemon={this.state.pokemon}
          species={this.state.species}
          type1={this.state.types[0].name}
          type2={this.state.types[1] ? this.state.types[1].name:"None"}
          descriptionURI={this.state.descriptionURI} />
        <button onClick={this.decrementCount}>prev</button>
        <button onClick={this.incrementCount}>next</button>
      </div>
    )
  }
})

module.exports= Pokemon;
