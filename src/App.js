// (C) Copyright 2017, Heiko Koehler

import React, { Component } from 'react';
import { Button, Wrapper, Menu, MenuItem } from 'react-aria-menubutton';

import './App.css';
import './Menu.css';

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
        var row = this.props.row;
        var col = this.props.col;
        var board = this.props.board;
        var selected = board[row][col].selected;
        var highlighted = board[row][col].highlighted;
        var val = board[row][col].val;
        var className;

        if (selected) {
            if (highlighted) {
                className = "SquareSelectedHighlighted";
            } else {
                className = "SquareSelected";
            }
        } else {
            if (highlighted) {
                className = "SquareHighlighted";
            } else {
                className = "Square";
            }
        }
        return (
            <td className={className} onClick={this.onClick}>
            {val}
            </td>
        );
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

function range(from, to) {
    var a = [];
    for (let i=from; i<=to; i++) {
        a.push(i);
    }
    return a;
}

class NumPad extends Component {
    constructor(props) {
        super(props)
        this.props = props
    }

    render() {
        var onClick = this.props.onClick;
        var selected = this.props.num;
        var buttons = range(1, 9).map((i) => {
            return <NumPadButton num={i} key={i} selected={selected} onClick={onClick}/>
        });

        return (
            <table className="NumPad">
                <tbody>
                    <tr>
                        {buttons}
                    </tr>
                </tbody>
            </table>
        )
    }
}

class NewDropDown extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.onSelection = this.onSelection.bind(this);
    }

    onSelection(val, event) {
        console.log(val, event);
        this.props.onClick();
    }

    render() {
        const menuItemWords = ["Easy", "Medium", "Hard"];
        const menuItems = menuItemWords.map((word, i) => {
            return (
                <li className="AriaMenuButton-menuItemWrapper" key={i}>
                    <MenuItem className="AriaMenuButton-menuItem">
                        {word}
                    </MenuItem>
                </li>
            );
        });

        return <Wrapper className="AriaMenuButton" onSelection={this.onSelection}>
            <Button className="AriaMenuButton-trigger"> New </Button>
            <Menu>
                <u1 className="AriaMenuButton-menu"> {menuItems} </u1>
            </Menu>
        </Wrapper>
    }    
}

class ControlPanel extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        var erase = this.props.onEraseClick;
        var newGame = this.props.onNewClick;
        return (
            <div className="ControlPanel">
                <NewDropDown onClick={newGame}/>
                <button type="button" className="Button" onClick={erase}>
                    Erase
                </button>
            </div>
        );
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
                    highlighted: false,
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
        this.onNewClick = this.onNewClick.bind(this);
        this.updateBoard = this.updateBoard.bind(this);
        this.verifyMove = this.verifyMove.bind(this);
        this.newBoard = this.newBoard.bind(this);
    }

    verifyMove(selectedRow, selectedCol, val) {
        let board = this.state.board;
        let boxRow = Math.floor(selectedRow/3) * 3
        let boxCol = Math.floor(selectedCol/3) * 3

        for (let col = 0; col < 9; col++) {
            let v = board[selectedRow][col].val;
            if (v === val) {
                console.log("Invalid move - row conflict")
                val = null;
                return false;
            }
        }
        for (let row = 0; row < 9; row++) {
            let v = board[row][selectedCol].val;
            if (v === val) {
                console.log("Invalid move - column conflict")
                val = null;
                return false;
            }
        }
        for (let row = boxRow; row < boxRow+3; row++) {
            for (let col = boxCol; col < boxCol+3; col++) {
                let v = board[row][col].val;
                if (v === val) {
                    console.log("Invalid move - box conflict")
                    return false;
                }
            }
        }
        return true;
    }

    updateBoard(selectedRow, selectedCol, val) {
        let newBoard = [];
        let board = this.state.board;
        let selectedVal = board[selectedRow][selectedCol].val;

        // verify move
        if (val != null &&
            this.verifyMove(selectedRow, selectedCol, val) === false) {
                val = null;
        }
        if (val === 0 &&
            board[selectedRow][selectedCol].given) {
                val = null;
        }

        for (let row = 0; row < 9; row++) {
            let newRow = [];
            for (let col = 0; col < 9; col++) {
                let square = board[row][col];
                if (row === selectedRow || col === selectedCol) {
                    square.selected = true;
                } else {
                    square.selected = false;
                }
                if (selectedVal != null && square.val === selectedVal) {
                    square.highlighted = true;
                } else {
                    square.highlighted = false;
                }
                newRow.push(square);
            }
            newBoard.push(newRow);
        }
        // update value of square
        if (val != null) {
            if (val === 0) {
                newBoard[selectedRow][selectedCol].val = null;
            } else {
                newBoard[selectedRow][selectedCol].val = val;
            }
        }
        return newBoard;
    }

    newBoard() {
        // hard-code game for now
        var puzzle = [
            [3, 9, 6, 0, 8, 7, 0, 0, 4],
       		[0, 2, 7, 0, 0, 4, 0, 6, 0],
    		[1, 0, 4, 3, 0, 0, 0, 8, 7],
	    	[0, 3, 2, 0, 7, 8, 0, 0, 0],
	    	[0, 7, 8, 0, 4, 0, 9, 3, 0],
	    	[0, 0, 5, 0, 0, 2, 0, 7, 0],
	    	[2, 0, 3, 0, 0, 5, 4, 9, 6],
		    [7, 0, 0, 0, 0, 0, 8, 1, 5],
		    [5, 0, 0, 8, 0, 9, 7, 0, 0],
        ];
        let board = [];
        for (let row = 0; row < 9; row++) {
            let r = [];
            for (let col = 0; col < 9; col++) {
                let v = puzzle[row][col];
                let g = false;

                if (v === 0) {
                    v = null;
                } else {
                    g = true;
                }
                r.push({selected: false,
                    val: v, given: g});
            }
            board.push(r)
        }
        return board;
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

    onNewClick() {
        var newBoard = this.newBoard();
        this.setState({
            board : newBoard,
            num: null,
        });
    }

    render() {
        return (
            <div>
            <h1 className="Header"> Sudoku </h1>
            <ControlPanel onEraseClick={this.onEraseClick}
                onNewClick={this.onNewClick}/>
            <Board onClick={this.onClick} board={this.state.board}/>
            <br/>
            <NumPad onClick={this.onNumPadClick} num={this.state.num}/>
            </div>
        );
  }
}

export default App;
