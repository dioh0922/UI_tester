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
		flg = 4;
	}else if(val == "hidden"){
		flg = -1;
	}else if(val == "Img"){
		flg = 99;
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
		<ul>
			<li>2倍textboxで消した後に戻すには?</li>
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
					<option>{this.props.value}にImg</option>
				</select>
			);
		}else if( this.state.disp == 3){
			return <img src="./Img/txtImg.png" className="cell" data-id={this.props.value}/>;
		}else	if( this.state.disp == 2){
			return <img src="./Img/txtImg.png" className="cell_doubletext" data-id={this.props.value}/>;
		}else if( this.state.disp == -1){
			return <input className="cell_hidden" type="button" value={this.props.value}/>;
		}else if( this.state.disp == 4){
			return <img src="./Img/btnImg.png" className="cell" data-id={this.props.value}/>;
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

	allResetRow(){
		const clearFlg = 0;
		this.refs.btnRef0.setCellMode(clearFlg);
		this.refs.btnRef1.setCellMode(clearFlg);
		this.refs.btnRef2.setCellMode(clearFlg);
		this.refs.btnRef3.setCellMode(clearFlg);
		this.refs.btnRef4.setCellMode(clearFlg);
	}

	renderCell(i){
		const ref_name = "btnRef" + (i % 5);
		return <Cell disp={this.state.disp[i % 5]} value={i} ref={ref_name}/>;
	}

	//一旦、子のコンポーネントからイベントを取り上げる
	handleClick(e){

		let id;
		let flg;

		if(typeof(e.target.value) != "string"){
			id = e.target.getAttribute("data-id");
			flg = 0;
		}else{
			let tmp_id = e.target.value.split("に");
			id = tmp_id[0];
			flg = convertBtnFlg(tmp_id[1]);
		}

		const idx = parseInt(id, 10) % 5;

		switch (idx) {
			case 0:
				this.refs.btnRef0.setCellMode(flg);
				if(flg == 2 && this.refs.btnRef1.getCellMode() != 2){
					this.refs.btnRef1.setCellMode(-1);
				}
				break;
			case 1:
				this.refs.btnRef1.setCellMode(flg);
				if(flg == 2 && this.refs.btnRef2.getCellMode() != 2){
					this.refs.btnRef2.setCellMode(-1);
				}
				break;
			case 2:
				this.refs.btnRef2.setCellMode(flg);
				if(flg == 2 && this.refs.btnRef3.getCellMode() != 2){
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
				if(flg != 2){
					this.refs.btnRef4.setCellMode(flg);
				}
				break;
			default:
				break;
		}

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
		const refName = "rowRef" + (i / 5);
		return <Row value={i} ref={refName}/>;
	}

	allResetBoard(){
		this.refs.rowRef0.allResetRow();
		this.refs.rowRef1.allResetRow();
		this.refs.rowRef2.allResetRow();
		this.refs.rowRef3.allResetRow();
		this.refs.rowRef4.allResetRow();
	}

	render(){
		return(
			<div className="board">
				<input type="button"
					className="resetBtn"
					value="配置をリセットします"
					onClick={this.allResetBoard.bind(this)}/>
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


/*
//----------------
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
				<input type="text" value="textboxです" style={
					{
						backgroundColor: "#FFDDDD",
						height: "40px",
						width: "200px"
					}
				}/>
			</div>
		);
	}
}

ReactDOM.render(
	<TheParent />,
	document.getElementById("test_in")
);
*/
