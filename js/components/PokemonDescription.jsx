var React = require('react');
var request = require('superagent');

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

  render: function() {
    return(
      <div>
        <p>{this.state.description}</p>
      </div>
    )
  }
})

module.exports = PokemonDescription;
