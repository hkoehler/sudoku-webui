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
        var selected = this.props.board[this.props.row][this.props.col].selected;
        if (selected) {
            return <td className="SquareSelected" onClick={this.onClick}> </td>;
        } else {
            return <td className="Square" onClick={this.onClick}> </td>;
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
        };
        this.onClick = this.onClick.bind(this);
        this.updateBoard = this.updateBoard.bind(this);
    }

    updateBoard(selectedRow, selectedCol) {
        let newBoard = [];
        let board = this.state.board;

        for (let row = 0; row < 9; row++) {
            let newRow = [];
            for (let col = 0; col < 9; col++) {
                let square = board[row][col];
                if (row == selectedRow || col == selectedCol) {
                    square.selected = true;
                } else {
                    square.selected = false;
                }
                newRow.push(square);
            }
            newBoard.push(newRow);
        }
        return newBoard;
    }

    onClick(row, col) {
        var newBoard = this.updateBoard(row, col);

        this.setState(prevState => ({
            board : newBoard,
        }));
        console.log("Click ", row, col);
    }

    render() {
        return (
            <div>
            <h1 className="Header"> Sudoku </h1>
            <Board onClick={this.onClick} board={this.state.board}/>
            </div>
        );
  }
}

export default App;
