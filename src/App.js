import { useState } from 'react';
import './App.css';

import Status from './components/Status';
import Card from './components/Card';

//global vars
const imagePath = 'Cards/';

//global helper functions

//fill array with unshuffled images
const fillImages = () => {
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

//shuffle array of images
const shuffleImages = (images) => {
  for (let i = 0; i < images.length; i++) {
    let rnd = Math.floor(Math.random() * images.length);
    [images[i], images[rnd]] = [images[rnd], images[i]];
  }
  
  console.log(images);
}

//create and fill array with images, then shuffle them
const fillAndShuffleImages = () => {
  let images = fillImages();
  shuffleImages(images);

  return images; //return shuffled array of images
}

//pass in two indexes and an array. Check if the indexes match.
//return true if match, false if not
const isMatch = (firstPick, secondPick, images) => {
  if (images[firstPick].substr(4, 1) == images[secondPick].substr(4, 1))
          return true;
      else
          return false;
}


function App() {
  //state variables
  const [matches, setMatches] = useState(0);
  const [tries, setTries] = useState(0);
  const [picks, setPicks] = useState({first: -1, second: -1});
  const [images, setImages] = useState(fillAndShuffleImages); //why do i not need parenthesis?


    const renderCard = (i) => {
      const image = (images[i] == null) ? 'none' : 
          (picks.first == i || picks.second == i) ? 
          'url(' + imagePath + images[i] + ')' : 
          'url(' + imagePath + 'black_back.jpg)';
      const enabled = (images[i] != null && 
          (i != picks.first && i != picks.second) &&
          (picks.first == -1 || picks.second == -1) &&
          (matches < 10)) ? true : false;
      // let eStr = i +": " + images[i];
      // eStr+= ", first: " + picks.first;
      // eStr+= ", second: " + picks.second;
      // console.log(eStr);
      const eventHandler = (enabled)? handleClick: () => {};
      const cursor = (enabled) ? "pointer" : "none";
      const style = {
        backgroundImage: image,
        cursor: cursor,
      }

      const output = (
        <Card 
          index={i}
          style={style}
          eventHandler={eventHandler}
        />
      );

      return output;
    }

    

    

    const checkCards = (firstPick, secondPick, images, tries, matches) => {
      tries++; //always increment tries

      if (isMatch(firstPick, secondPick, images)) {
          matches++; //increment matches only if matched
          images[firstPick] = null;
          images[secondPick] = null;
      }
      

      //create picks reset object
      let localPicks = {first: -1, second: -1}
      

      //set state
      setImages(images);
      setPicks(localPicks);
      setMatches(matches);
      setTries(tries);
    }

    const handleClick = (event) => {
      const index = parseInt(event.target.id);
      let localPicks = {...picks};
      let localImages = {...images};
      let shouldCheckCards = false;

      if (localPicks.first == -1) {
        localPicks.first = index;
      }
      else {
        localPicks.second = index;
        shouldCheckCards = true;
      }

      console.log(localPicks);
      console.log(picks);
      //update state then timeout if we need to check for match
      setPicks(localPicks);
      console.log(picks)
      if (shouldCheckCards){
        //pass in local copies to ensure that checkCards has values
        //from when timeout was set, since setting state is asyncronous
        setTimeout(checkCards, 2000, localPicks.first, localPicks.second, localImages, tries, matches);
      }
    }

    
    let status = (matches < 10) ?
      'Matches: ' + matches + " Tries: " + tries :
      "Congratulations!  You found all 10 matches in " + tries + " tries!";

    const output = (
      <div className="container" id="board">
          <Status status={status} />
          <div className="row">
            <div className="col-sm-1"></div>
            {renderCard(0)}
            {renderCard(1)}
            {renderCard(2)}
            {renderCard(3)}
            {renderCard(4)}
            <div className="col-1"></div>
          </div>
          <div className="row">
            <div className="col-sm-1"></div>
            {renderCard(5)}
            {renderCard(6)}
            {renderCard(7)}
            {renderCard(8)}
            {renderCard(9)}
            <div className="col-1"></div>
          </div>
          <div className="row">
            <div className="col-sm-1"></div>
            {renderCard(10)}
            {renderCard(11)}
            {renderCard(12)}
            {renderCard(13)}
            {renderCard(14)}
            <div className="col-1"></div>
          </div>
          <div className="row">
            <div className="col-sm-1"></div>
            {renderCard(15)}
            {renderCard(16)}
            {renderCard(17)}
            {renderCard(18)}
            {renderCard(19)}
            <div className="col-1"></div>
          </div>
        </div>
    );
    // document.getElementById("top").innerHTML = output;
    return output;
  }

export default App;
