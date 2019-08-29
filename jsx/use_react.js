/*
UIの画面設計の試作を行うWebアプリ
DOMの制御を行い、動的に画面に部品を描画するプログラム
*/

ReactDOM.render(
	<h2>
		UI試作器：5*5くらいでフォームの見た目作る
	</h2>,
	document.getElementById("t1")
);

class Cell extends React.Component{
	constructor(props){
		super(props);

		//ボタンのクリック時イベントはクラスのメソッドに固定する
	//	this.handleClick = this.handleClick.bind(this);

		this.handleSelect = this.handleSelect.bind(this);

		//各マスにクリックされた状態を持たせる
		this.state = {
			value: null,
		};
	}

	/*
	handleClick(){
		this.setState({value: "X"});
	}
	*/

	handleSelect(e){
		console.log(e.target.value);
		if(e.target.value == "無し"){
			this.setState({value: null})
		}
	}

	render(){
		if(this.state.value == null){
			/*
			return (
				<button className="cell" onClick={this.handleClick}>
					{this.props.value}
				</button>
			)*/
			return (
				<input className="cell" type="button" value={this.props.value}/>
			)
		}else{
			return(
				<select className="cell" onChange={this.handleSelect}>
					<option>1</option>
					<option>2</option>
					<option>無し</option>
				</select>
			)
		}
	}
}

class Board extends React.Component{

	renderCell(i){
		return <Cell value={i}/>;
	}

	//一旦、子のコンポーネントからイベントを取り上げる
	handleClick(e){
		console.log(e.target.value);
	}

	render(){
		return(
			<div className="board" onClick={this.handleClick.bind(this)}>
				<div className="board-row">
					{this.renderCell(0)}
					{this.renderCell(1)}
					{this.renderCell(2)}
					{this.renderCell(3)}
					{this.renderCell(4)}
				</div>
				<div className="board-row">
					{this.renderCell(5)}
					{this.renderCell(6)}
					{this.renderCell(7)}
					{this.renderCell(8)}
					{this.renderCell(9)}
				</div>
				<div className="board-row">
					{this.renderCell(10)}
					{this.renderCell(11)}
					{this.renderCell(12)}
					{this.renderCell(13)}
					{this.renderCell(14)}
				</div>
				<div className="board-row">
					{this.renderCell(15)}
					{this.renderCell(16)}
					{this.renderCell(17)}
					{this.renderCell(18)}
					{this.renderCell(19)}
				</div>
				<div className="board-row">
					{this.renderCell(20)}
					{this.renderCell(21)}
					{this.renderCell(22)}
					{this.renderCell(23)}
					{this.renderCell(24)}
				</div>
			</div>
		);
	}
}

ReactDOM.render(
	<Board />,
	document.getElementById("root")
);
