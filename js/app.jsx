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

var Pokemon = React.createClass({

  incrementCount: function(pokemon) {
    this.setState({
      index: this.state.index + 1,
    })
    console.log(this.state.index)
  },

  getInitialState: function() {
    return{
      index: 1,
      pokemon:'',
      species:'',
      types:[{name:""},{name:""}]
    }
  },

  componentDidMount:function() {
    request
      .get('http://pokeapi.co/api/v1/pokemon/' + this.state.index)
      .end(function(err, res) {
        this.setState({
          pokemon: res.body.name,
          species: res.body.species,
          types: res.body.types

        })
      }.bind(this))
  },

  render: function() {
    return (
      <div>
        <img src={"http://pokeapi.co/media/img/" + this.state.index + ".png"} />
        <p>Name: {this.state.pokemon}</p>
        <p>Species: {this.state.species}</p>
        <p>Type 1: {this.state.types[0].name}</p>
        <p>Type 2: {this.state.types[1].name}</p>
        <button>prev</button>
        <button onClick={this.incrementCount}>next</button>
      </div>
    )
  }
})

var Pokedex = React.createClass({
  render: function() {
    return(
      <section>
        <p>This is the pokedex</p>
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
