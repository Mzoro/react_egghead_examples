import React from 'react';
import ReactDOM from 'react-dom'
class App extends React.Component {
  constructor(){
    super();
    this.state = { 
      val: 0,
      red: 0,
      green: 0,
      blue: 0 
    }
    this.update = this.update.bind(this)
  }
  update(e){
    this.setState({
      val: this.state.val + 1,
      red: ReactDOM.findDOMNode(this.refs.red.refs.inp).value,
      green: ReactDOM.findDOMNode(this.refs.green.refs.inp).value,
      blue: ReactDOM.findDOMNode(this.refs.blue.refs.inp).value
    })
  }
  componentWillMount() {
    this.setState({ m: 2})
  }
  render(){
    console.log('rendering')
    return (
      <div>
        <Slider ref="red" update={this.update} />
        {this.state.red}
        <br />
        <Slider ref="green" update={this.update} />
        {this.state.green}
        <br />
        <Slider ref="blue" update={this.update} />
        {this.state.blue}
        <br />
        <Button>I <Heart /> React</Button>
        <button onClick={this.update}>{this.state.val * this.state.m}</button>
      </div>
    );
  }
  componentDidMount() {
    this.inc = setInterval(this.update, 500)
    console.log('mounted')     
  }
  componentWillUnmount() {
    clearInterval(this.inc)
    console.log('bye')  
  }
}
class Wrapper extends React.Component {
  constructor(){
    super();
    this.mount = this.mount.bind(this)
  }
  mount(){
    ReactDOM.render(<App />, document.getElementById('a'))
  }
  unmount(){
    ReactDOM.unmountComponentAtNode(document.getElementById('a'))
  }

  render(){
    return (
      <div>
        <button onClick={this.mount}>Mount</button>
        <button onClick={this.unmount.bind(this)}>Unmount</button>
        <div id="a"></div>
      </div>
    )
  }
}
export default Wrapper

class Button extends React.Component {
  render(){
    return <button>{this.props.children}</button>
  }
}
class Slider extends React.Component {
  render(){
    return (
    <div>
      <input ref="inp" type="range"
        min="0"
        max="255"
        onChange={this.props.update} />
    </div>  
    );  
  }
}

const Heart =() => <span className="glyphicon glyphicon-heart"></span>

const Widget = (props) => {
  return (
      <div>
        <input type="text"
          onChange={props.update} />
        <h1>{props.txt}</h1>
      </div>
    );
}

// export default App

App.propTypes = {
  txt: React.PropTypes.string
}

