import React from 'react';
//import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        squares: Array(9).fill(null),
        count: 0, 
        oVictory: 0,
        xVictory: 0,
        playResultText: "",
        firstPlayer: "X",
        firstBtnDisabled: false,
        isGameOver: false,
      };
    this.field = document.querySelector('.tic-tac-toe');
    this.timoutName = '';  
    this.clearFieldTimeout = 8000;
    
    this.winnerLine = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    this.firstCurrentPlayer = "";
    this.secondCurrentPlayer = "";
  }

  clearField = () => {
      this.setState({ squares: Array(9).fill(null)});
      this.setState({count: 0});
      this.setState({playResultText: ""});
      this.setState({firstBtnDisabled: false});
      this.setState({isGameOver: false});
    }

  autoClearField = () => {
    let timerId = setTimeout(() => {
      this.clearField();
    }, this.clearFieldTimeout)
    this.timoutName = timerId; 
  }

  checkFirstPlayer = () => {
    return (
      this.firstCurrentPlayer = this.state.firstPlayer,
      this.secondCurrentPlayer  = (this.state.firstPlayer === 'X') ? 'O' : 'X'
    ) 
  }

    isWinner =(count)=> {
      this.checkFirstPlayer();
      let s = (this.state.count % 2 === 0) ? this.firstCurrentPlayer : this.secondCurrentPlayer;
      for (let i= 0; i < 8; i++) {
        let line = this.winnerLine[i];
        if (this.state.squares[line[0]] === s
          && this.state.squares[line[1]] === s
          && this.state.squares[line[2]] === s) {
            this.setState({playResultText: s + ' wins!'})
            if (s === 'X') {
              this.setState({xVictory: this.state.xVictory + 1});
            } else {
              this.setState({oVictory: this.state.oVictory + 1});
            }
            this.setState({isGameOver: true});
            
            this.autoClearField();
          } else {
            if (count === 8) {
              this.setState({playResultText: 'Draw!!'})
              this.autoClearField();
            }
          }
      }
    }

    clickHandler = event => {
      if (!this.state.isGameOver) {
        this.setState({firstBtnDisabled: true});
      if (this.timoutName != null) {
        clearTimeout(this.timoutName);
        this.timoutName = null;
       }
      
      this.checkFirstPlayer();

      let data = event.target.getAttribute('data');
      let currentSquares = this.state.squares;
      if(currentSquares[data] === null) {
        this.setState({playResultText:''})

        currentSquares[data] = (this.state.count % 2 === 0)? this.firstCurrentPlayer : this.secondCurrentPlayer;
      this.setState({count: this.state.count + 1});
      this.setState({squares: currentSquares});
      } else {
        this.setState({playResultText:'Impossible action! Choose an other cell'})
      }
      this.isWinner(this.state.count);
      } else {
        this.setState({playResultText:'Game is over! Start new game.'});
      }
      
    }

    clearBtnHandler = () => {
      this.clearField();
    }

    firstBtnHandler = () => {
      (this.state.firstPlayer === 'X') ? this.setState({firstPlayer: 'O'}) : this.setState({firstPlayer: 'X'});
      
    }

      render(){
          return(
            <div>
              <h1>TIC-TAC-TOE</h1>
              <div>
                <h2>Total score</h2>
                <div className="total-score">
                  <div className="total-score-player">O</div>
                  <div className="total-score-block">{this.state.oVictory}</div>
                  <div className="total-score-block">{this.state.xVictory}</div>
                  <div className="total-score-player">X</div>
                </div>
              </div>
              <p className="result-text">{this.state.playResultText}</p>

              <div className="tic-tac-toe">
                <div className="ttt-grid" onClick={this.clickHandler} data="0">{this.state.squares[0]}</div>
                <div className="ttt-grid" onClick={this.clickHandler} data="1">{this.state.squares[1]}</div>
                <div className="ttt-grid" onClick={this.clickHandler} data="2">{this.state.squares[2]}</div>
                <div className="ttt-grid" onClick={this.clickHandler} data="3">{this.state.squares[3]}</div>
                <div className="ttt-grid" onClick={this.clickHandler} data="4">{this.state.squares[4]}</div>
                <div className="ttt-grid" onClick={this.clickHandler} data="5">{this.state.squares[5]}</div>
                <div className="ttt-grid" onClick={this.clickHandler} data="6">{this.state.squares[6]}</div>
                <div className="ttt-grid" onClick={this.clickHandler} data="7">{this.state.squares[7]}</div>
                <div className="ttt-grid" onClick={this.clickHandler} data="8">{this.state.squares[8]}</div>     
              </div>
          
              <button className="clear-btn" type="button" onClick = {this.firstBtnHandler} disabled={this.state.firstBtnDisabled}>{this.state.firstPlayer} walks first</button>  
              <p className="btn-description">Click to change first player</p>
              <button className="clear-btn" type="button" onClick = {this.clearBtnHandler}>To Clear Field</button>
              <p className="btn-description"> or the field  will clear after {this.clearFieldTimeout / 1000}s after the end of the game</p>
            </div>
          )
      }
  }

export default App;
