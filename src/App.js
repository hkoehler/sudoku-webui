// (C) Copyright 2017, Heiko Koehler

import React, { Component } from 'react';
import './App.css';

class Square extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.onClick = this.onClick.bind(this)
    }

    onClick() {
        this.props.onClick(this.props.row, this.props.col)
    }

    render() {
        var row = this.props.row
        var col = this.props.col
        var board = this.props.board
        var selected = board[row][col].selected;
        var val = board[row][col].val

        if (selected) {
            return (
                <td className="SquareSelected" onClick={this.onClick}>
                {val}
                </td>
            );
        } else {
            return (
                <td className="Square" onClick={this.onClick}>
                {val}
                </td>
            );
        }
    }
}

class Box extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        var row = this.props.row;
        var col = this.props.col;
        var onClick = this.props.onClick;
        var board = this.props.board;

        return (
            <table className="Box">
            <tbody>
            <tr>
                <Square row={row*3} col={col*3} onClick={onClick} board={board}/>
                <Square row={row*3} col={col*3+1} onClick={onClick} board={board}/>
                <Square row={row*3} col={col*3+2} onClick={onClick} board={board}/>
            </tr>
            <tr>
                <Square row={row*3+1} col={col*3} onClick={onClick} board={board}/>
                <Square row={row*3+1} col={col*3+1} onClick={onClick} board={board}/>
                <Square row={row*3+1} col={col*3+2} onClick={onClick} board={board}/>
            </tr>
            <tr>
                <Square row={row*3+2} col={col*3} onClick={onClick} board={board}/>
                <Square row={row*3+2} col={col*3+1} onClick={onClick} board={board}/>
                <Square row={row*3+2} col={col*3+2} onClick={onClick} board={board}/>
            </tr>
            </tbody>
            </table>
        )
    }
}

class Board extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        var onClick = this.props.onClick;
        var board = this.props.board;

        return (
            <table className="Board">
            <tbody>
            <tr>
            <td className="Board"> <Box  row={0} col={0} onClick={onClick} board={board}/> </td>
            <td className="Board"> <Box  row={0} col={1} onClick={onClick} board={board}/> </td>
            <td className="Board"> <Box  row={0} col={2} onClick={onClick} board={board}/> </td>
            </tr>
            <tr>
            <td className="Board"> <Box  row={1} col={0} onClick={onClick} board={board}/> </td>
            <td className="Board"> <Box  row={1} col={1} onClick={onClick} board={board}/> </td>
            <td className="Board"> <Box  row={1} col={2} onClick={onClick} board={board}/> </td>
            </tr>
            <tr>
            <td className="Board"> <Box  row={2} col={0} onClick={onClick} board={board}/> </td>
            <td className="Board"> <Box  row={2} col={1} onClick={onClick} board={board}/> </td>
            <td className="Board"> <Box  row={2} col={2} onClick={onClick} board={board}/> </td>
            </tr>
            </tbody>
            </table>
        )
    }
}

class NumPadButton extends Component {
    constructor(props) {
        super(props)
        this.props = props        
        this.onClick = this.onClick.bind(this)
    }

    onClick() {
        this.props.onClick(this.props.num)
    }

    render() {
        var num = this.props.num;
        var selected = this.props.selected;

        if (num === selected) {
            return (
                <td className="NumPadSelected" onClick={this.onClick}> {num} </td> 
        )
        } else {
            return (
                <td className="NumPad" onClick={this.onClick}> {num} </td> 
            )
        }
    }
}

class NumPad extends Component {
    constructor(props) {
        super(props)
        this.props = props
    }

    render() {
        var onClick = this.props.onClick;
        var selected = this.props.num;

        return (
            <table className="NumPad">
                <tbody>
                    <tr>
                        <NumPadButton num={1} selected={selected} onClick={onClick}/>
                        <NumPadButton num={2} selected={selected} onClick={onClick}/>
                        <NumPadButton num={3} selected={selected} onClick={onClick}/>
                        <NumPadButton num={4} selected={selected} onClick={onClick}/>
                        <NumPadButton num={5} selected={selected} onClick={onClick}/>
                        <NumPadButton num={6} selected={selected} onClick={onClick}/>
                        <NumPadButton num={7} selected={selected} onClick={onClick}/>
                        <NumPadButton num={8} selected={selected} onClick={onClick}/>
                        <NumPadButton num={9} selected={selected} onClick={onClick}/>
                    </tr>
                </tbody>
            </table>
        )
    }
}

class ControlPanel extends Component {
    constructor(props) {
        super(props)
        this.props = props
    }

    render() {
        var erase = this.props.onEraseClick
        return (
            <div className="ControlPanel">
            <button type="button" className="EraseButton" onClick={erase}>
                Erase
            </button>
            </div>
        )
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.props = props;

        let board = new Array(9);
        for (let row = 0; row < 9; row++) {
            board[row] = [];
            for (let col = 0; col < 9; col++) {
                board[row].push({
                    selected : false,
                    value : null,
                });
            }
        }
        this.state = {
            board: board,
            num: null,
            row: null,
            col: null,
        };
        this.onClick = this.onClick.bind(this);
        this.onNumPadClick = this.onNumPadClick.bind(this);
        this.onEraseClick = this.onEraseClick.bind(this);
        this.updateBoard = this.updateBoard.bind(this);
    }

    updateBoard(selectedRow, selectedCol, val) {
        let newBoard = [];
        let board = this.state.board;

        for (let row = 0; row < 9; row++) {
            let newRow = [];
            for (let col = 0; col < 9; col++) {
                let square = board[row][col];
                if (row === selectedRow || col === selectedCol) {
                    square.selected = true;
                } else {
                    square.selected = false;
                }
                newRow.push(square);
            }
            newBoard.push(newRow);
        }
        if (val != null) {
            if (val == 0) {
                newBoard[selectedRow][selectedCol].val = null;
            } else {
                newBoard[selectedRow][selectedCol].val = val;
            }
        }
        return newBoard;
    }

    onClick(row, col) {
        var num = this.state.num
        var newBoard = this.updateBoard(row, col, null);

        this.setState({
            board : newBoard,
            row: row,
            col: col,
            num: null,
        });
        console.log("Click ", row, col, num);
    }

    onNumPadClick(num) {
        var row = this.state.row
        var col = this.state.col
        var newBoard = this.updateBoard(row, col, num);
        this.setState({
            board : newBoard,
            num: num,
        });
        console.log("Num ", num);
    }

    onEraseClick() {
        var row = this.state.row
        var col = this.state.col
        var newBoard = this.updateBoard(row, col, 0);
        this.setState({
            board : newBoard,
            num: null,
        });
        console.log("Erase ", row, col);
    }

    render() {
        return (
            <div>
            <h1 className="Header"> Sudoku </h1>
            <ControlPanel onEraseClick={this.onEraseClick}/>
            <Board onClick={this.onClick} board={this.state.board}/>
            <br/>
            <NumPad onClick={this.onNumPadClick} num={this.state.num}/>
            </div>
        );
  }
}

export default App;
