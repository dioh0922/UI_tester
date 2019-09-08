/*
UIの画面設計の試作を行うWebアプリ
DOMの制御を行い、動的に画面に部品を描画するプログラム
*/

function convertBtnFlg(val){
	let flg;

	if(val == "配置するものを選択"){
		flg = 1;
	}else if(val == "text:1"){
		flg = 3;
	}else if(val == "text:2"){
		flg = 2
	}else if(val == "btn:1"){
		flg = 0;
	}else if(val == "hidden"){
		flg = -1;
	}else{
		flg = 1;
	}

	return flg;
}

ReactDOM.render(
	<div>
		<h2>
			UI試作器：5*5くらいでフォームの見た目作る
		</h2>
		<p>子コンポーネントから別の子にイベントさせるには?</p>
		<ul>
			<li>子から親にクリックイベント</li>
			<li>親で状態変化</li>
			<li>親から子に状態＋再描画</li>
			<li>setState→setStateで最後だけ描画されている?</li>
		</ul>
	</div>,
	document.getElementById("t1")
);

class Cell extends React.Component{
	constructor(props){
		super(props);

		this.handleSelect = this.handleSelect.bind(this);
		this.state = {
			disp: 0,
			textAreaValue: "textboxです",
		}
	}

	getCellMode(){
		return this.state.disp;
	}

	setCellMode(mode){
		this.setState({disp:mode});
	}

	handleSelect(e){
		console.log(e.target.value);
		if(e.target.value == "無し"){
			this.setState({value: null})
		}
	}

	handleOnChange(e){
		const text = e.target.value;
		this.setState({textAreaValue: text});
	}

	render(){

		if( this.state.disp == 1){
			return(
				<select className="cell" >
					<option>{this.props.value}に配置するものを選択</option>
					<option>{this.props.value}にtext:1</option>
					<option>{this.props.value}にtext:2</option>
					<option>{this.props.value}にbtn:1</option>
					<option>{this.props.value}にhidden</option>
				</select>
			)
		}else	if( this.state.disp == 2){
			return <input className="cell_double" type="text"
			value={this.state.textAreaValue}
			onChange={this.handleOnChange.bind(this)}
			/>;
		}else if( this.state.disp == -1){
			return <input className="cell_hidden" type="button" value={this.props.value}/>;
		}else{
			return <input className="cell" type="button" value={this.props.value}/>;
		}
	}
}

//各行のコンポーネント、列数のCellを持つ
class Row extends React.Component{
	constructor(props){
		super(props);

		//各セルの表示状態を表すフラグ
		this.state = {
			disp: [0, 0, 0, 0, 0],
		}
	}

	//指定したセルの表示状態を変更する処理
	changeDispFlg(i, flg){
		const arr = this.state.disp.slice();
		arr[i] = flg;
		this.setState({disp:arr});
	}

	renderCell(i){
		const ref_name = "btnRef" + (i % 5);
		return <Cell disp={this.state.disp[i % 5]} value={i} ref={ref_name}/>;
	}

	//一旦、子のコンポーネントからイベントを取り上げる
	handleClick(e){
		let id = e.target.value.split("に");
		const idx = parseInt(id[0], 10) % 5;

		let flg = convertBtnFlg(id[1]);

		switch (idx) {
			case 0:
				this.refs.btnRef0.setCellMode(flg);
				if(flg == 2 && this.refs.btnRef1.getCellMode() != 2){
					this.refs.btnRef1.setCellMode(-1);
				}
				break;
			case 1:
				this.refs.btnRef1.setCellMode(flg);
				if(flg == 2){
					this.refs.btnRef2.setCellMode(-1);
				}
				break;
			case 2:
				this.refs.btnRef2.setCellMode(flg);
				if(flg == 2){
					this.refs.btnRef3.setCellMode(-1);
				}
				break;
			case 3:
				this.refs.btnRef3.setCellMode(flg);
				if(flg == 2){
					this.refs.btnRef4.setCellMode(-1);
				}
				break;
			case 4:
				this.refs.btnRef4.setCellMode(flg);
				break;
			default:
				break;
		}

	}

	componentDidUpdate(prevProps, prevState, snapshot){
			this.render();
			console.log(this.state.disp);
	}

	handleSelect(e){
		console.log(e.target.value);
	}

	render(){
		return (
			<div className="board-row"
			onClick={this.handleClick.bind(this)}>

				{this.renderCell(this.props.value)}
				{this.renderCell(this.props.value + 1)}
				{this.renderCell(this.props.value + 2)}
				{this.renderCell(this.props.value + 3)}
				{this.renderCell(this.props.value + 4)}
			</div>
		);
	}
}


//表示板全体のコンポーネント
class Board extends React.Component{

	constructor(props){
		super(props);
	}

	//各行を表示する処理
	renderRow(i){
		return <Row value={i} />;
	}

	render(){
		return(
			<div className="board">
				{this.renderRow(0)}
				{this.renderRow(5)}
				{this.renderRow(10)}
				{this.renderRow(15)}
				{this.renderRow(20)}
			</div>
		);
	}
}

ReactDOM.render(
	<Board />,
	document.getElementById("root")
);


//----------------
/*
class TheChild extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			disp: 0,
			value: "init",
		}
	}

	setFlg(flg){
		this.setState({value: flg});
		console.log(this.state.value);
	}

	render(){
		return <input type="button" value={this.state.value}/>;
	}
}

//refで子に引数渡して子でsetStateさせる
class TheParent extends React.Component{

	handleClick(){
		this.refs.child_1.setFlg("ref");
	}

	render(){
		return(
			<div onClick={this.handleClick.bind(this)}>
				<TheChild ref="child_1" value={1}/>
				<TheChild ref="child_2" value={2}/>
			</div>
		);
	}
}

ReactDOM.render(
	<TheParent />,
	document.getElementById("test_in")
);
*/
