var React = require('react');
var request = require('superagent');

var Header = React.createClass({
  render: function() {
    return(
      <section>
        <h1>Pokedex</h1>
      </section>
    )
  }
})

var PokemonDescription = React.createClass({
  getInitialState: function() {
    return{
      descriptionURI: '/api/v1/description/4',
      description: ''
    }
  },

  componentWillMount: function () {
    this.prepareComponentState(this.props);
  },

  componentWillReceiveProps: function (nextProps) {
    this.prepareComponentState(nextProps);
  },

  prepareComponentState: function (props) {
    //set data on state/template
    var descriptionURI = props.descriptionURI;
    request
      .get('http://pokeapi.co' + descriptionURI)
      .end(function(err, res) {
        if (err) return console.log(err);
        console.log(res);
        this.setState({
          descriptionURI: descriptionURI,
          description: res.body.description
        })
      }.bind(this));
  },

  componentDidMount: function() {
    request
      .get('http://pokeapi.co' + this.state.descriptionURI)
      .end(function(err, res) {
        if (err) return console.log(err);
        console.log(res);
        this.setState({
          description: res.body.description
        })
      }.bind(this));
  },

  render: function() {
    return(
      <div>
        <p>{this.state.description}</p>
      </div>
    )
  }
})

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

var Pokedex = React.createClass({
  render: function() {
    return(
      <section>
        <Pokemon />
      </section>
    )
  }
})

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
