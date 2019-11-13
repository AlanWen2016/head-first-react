import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// class Square extends React.Component {
//     constructor() {
//         super(); // 使用javascript classes的组件中，当子类继承父类方法，必须执行此方法super,才能获取正确的this绑定
//     }
//     render() {
//         return (
//             <button className="square" onClick={()=>{ props.onClick}}>
//                 { this.props.value }
//             </button>
//         );
//     }
// }
function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}
class Board extends React.Component {
    renderSquare(i) {
        return <Square
            onClick={() => this.props.onClick(i)}
            value={this.props.squares[i]}
        />;
    }
    render() {
        return (
            <div>
                <div className="status">{this.props.status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // 存储每个操作步骤
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
            stepNum: 0
        };
    }
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNum + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            xIsNext: !this.state.xIsNext,
            stepNum: history.length
        });
    }
    jumpTo(step) {
        this.setState({
            stepNum: step,
            xIsNext: step % 2 === 0
        });
    }
    render(){
        // move表示history的索引
        const history = this.state.history;
        const current = history[this.state.stepNum];
        const winner = calculateWinner(current.squares);
        const moves = history.map((step, move) => {
            const desc = move ?
                'Move #' + move :
                'Game start';
            return (
                <li key={move}>
                    <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
                </li>
            );
        });
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares} onClick={(i)=>this.handleClick(i)}/>
                </div>
                <div className="game-info">
                    <div>{ status }</div>
                    <ol>{ moves }</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}