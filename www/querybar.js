var items = [
  {name:"foo",version:"0.0.0"},
  {name:"foo2",version:"0.0.0"}
];


var QueryBar = React.createClass({
  getInitialState: function() {
    return {
      items: [],
      query: ''
    };
  },
  handleQueryChange: function(e) {
    this.setState({query: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var query = this.state.query.trim();
    if (!query) {return;}
    this.queryResult();
    this.setState({query:''});
  },
  queryResult() {
    $.ajax({
      url: this.props.url+'?q='+this.state.query,
      //url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({items:data.items});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function() {
    this.queryResult();
  },
  render: function() {
    return (
      <div className="queryArea">
      <div className="queryBar">
        <form className="queryForm" onSubmit={this.handleSubmit}>
          <input type="text" className="queryTerm" value={this.state.query} onChange={this.handleQueryChange}/>
          <input type="submit" className="querySubmit" value="find Node.js modules" />
        </form>
      </div>
        <QueryResults items={this.state.items}/>
      </div>
    );
  }
});


var QueryResults = React.createClass({
  render: function() {
    var resultNodes = this.props.items.map(function(item, i) {
      return (
        <QueryResult name={item.name} version={item.version} key={i} />
      );
    });
    return (
      <div className="queryResults">
      {resultNodes}
      </div>
    );
  }
});

var QueryResult = React.createClass({
   render: function() {
     return (
      <div className="queryResult">
        <div className="rank"></div>
        <div className="details">
          <div className="topline">
            <a className="topline site" target="_blank">{this.props.name+' '+this.props.version} </a>
            <a className="topline info" target="_blank">[info]</a>
            <a className="topline npm" target="_blank"><img src="img/npm-small.png" /></a>
            <a className="topline git" target="_blank"><img src="img/github-small.png" /></a>
          </div>
        </div>
      </div>
     );
  }
});


ReactDOM.render(
  <QueryBar url="/api/query" />,
  document.getElementById('reactroot')
);

