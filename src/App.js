import { Component } from 'react';
import './App.css';

class App extends Component {
  constructor (props) {
    super(props); //call to constructor of Component class

    this.imagePath = 'Cards/';
    this.images = this.fillImages();
    this.shuffleImages(this.images);

    this.state = {
      images: this.images,
      firstPick: -1,
      secondPick: -1,
      matches: 0,
      tries: 0,
    }

    this.handleClick = this.handleClick.bind(this);
    this.checkCards = this.checkCards.bind(this);
    this.isMatch = this.isMatch.bind(this);
  }

  fillImages() {
    let images = Array(20).fill(null);
    let values = ['a', 'k', 'q', 'j', 't', '9', '8', '7', '6', '5'];
    let suits = ['h', 's'];
    let index = 0;
    for (let value = 0; value < values.length; value++){
        for (let suit = 0; suit < suits.length; suit ++) {
            images[index] = "card" + values[value] + suits[suit] + ".jpg";
            index++;
        }
    }

    // console.log(images);
    return images;
  }

  shuffleImages(images) {
    for (let i = 0; i < images.length; i++) {
      let rnd = Math.floor(Math.random() * images.length);
      [images[i], images[rnd]] = [images[rnd], images[i]];
    }
    
    console.log(images);
  }

  renderCard(i) {
    const image = (this.state.images[i] == null) ? 'none' : 
        ( this.state.firstPick == i || this.state.secondPick == i) ? 
        'url(' + this.imagePath + this.images[i] + ')' : 
        'url(' + this.imagePath + 'black_back.jpg)';
    const enabled = (this.state.images[i] != null && 
        (i != this.state.firstPick && i != this.state.secondPick) &&
        (this.state.firstPick == -1 || this.state.secondPick == -1) &&
        (this.state.matches < 10)) ? true : false;
    const eventHandler = (enabled)? this.handleClick: () => {};
    const cursor = (enabled) ? "pointer" : "none";
    const style = {
      backgroundImage: image,
      cursor: cursor,
    }
    const output = 
        <div id={i} key={i} 
            name="card" 
            className="col-sm-2 card"
            style={style} 
            onClick= {eventHandler}
            >&nbsp;
        </div>
    ;

    return output;
  }

  render() {
    let status = (this.state.matches < 10) ?
      'Matches: ' + this.state.matches + " Tries: " + this.state.tries :
      "Congratulations!  You found all 10 matches in " + this.state.tries + " tries!";

    const output = (
      <div className="container" id="board">
          <div className="pb-2" id="status">{status}</div>
          <div className="row">
            <div className="col-sm-1"></div>
            {this.renderCard(0)}
            {this.renderCard(1)}
            {this.renderCard(2)}
            {this.renderCard(3)}
            {this.renderCard(4)}
            <div className="col-1"></div>
          </div>
          <div className="row">
            <div className="col-sm-1"></div>
            {this.renderCard(5)}
            {this.renderCard(6)}
            {this.renderCard(7)}
            {this.renderCard(8)}
            {this.renderCard(9)}
            <div className="col-1"></div>
          </div>
          <div className="row">
            <div className="col-sm-1"></div>
            {this.renderCard(10)}
            {this.renderCard(11)}
            {this.renderCard(12)}
            {this.renderCard(13)}
            {this.renderCard(14)}
            <div className="col-1"></div>
          </div>
          <div className="row">
            <div className="col-sm-1"></div>
            {this.renderCard(15)}
            {this.renderCard(16)}
            {this.renderCard(17)}
            {this.renderCard(18)}
            {this.renderCard(19)}
            <div className="col-1"></div>
          </div>
        </div>
    );
    // document.getElementById("top").innerHTML = output;
    return output;
  }

  isMatch() {
    if (this.state.images[this.state.firstPick].substr(4, 1) == this.state.images[this.state.secondPick].substr(4, 1))
            return true;
        else
            return false;
  }

  checkCards() {
    const result = {...this.state};

    if (this.isMatch()) {
        result.matches ++;
        result.images[result.firstPick] = null;
        result.images[result.secondPick] = null;
    }
    result.firstPick = -1;
    result.secondPick = -1;

    this.setState({
      images: result.images,
      firstPick: result.firstPick,
      secondPick: result.secondPick,
      matches: result.matches,
      tries: result.tries
    });
  }

  handleClick(event) {
    const index = parseInt(event.target.id);

    if (this.state.firstPick == -1) {
      this.setState({firstPick: index})
    }
    else {
      this.setState({secondPick: index})
      
      setTimeout(this.checkCards, 2000);
    }
  }

  
}

export default App;
