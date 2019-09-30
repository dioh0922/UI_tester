/*
UIの画面設計の試作を行うWebアプリ
DOMの制御を行い、動的に画面に部品を描画するプログラム
*/

//表示モードのフラグ制御の識別子
const DISPMODE = {
	selectStart: 1,
	txtBox: 2,
	txtBoxDbl: 3,
	txtBoxTrpl: 4,
	button: 5,
	btnDbl: 6,
	btnTrpl: 7,
	fileSelect: 8,
	fileDbl: 9,
	fileTrpl: 10,
	selBox: 11,
	selBoxDbl: 12,
	selBoxTrpl: 13,
	chkBtn: 14,
	radioBtn: 15,
	hidden: -1,
	redisp: -5,
	default: 0
};

//選択用の表示文字列
const SELECTITEM = {
	selectStart: "配置するものを選択",
	txtBox: "入力欄(1マス)",
	txtBoxDbl: "入力欄(2マス)",
	txtBoxTrpl: "入力欄(3マス)",
	button: "ボタン(1マス)",
	btnDbl: "ボタン(2マス)",
	btnTrpl: "ボタン(3マス)",
	fileSelect: "ファイル選択(1マス)",
	fileDbl: "ファイル選択(2マス)",
	fileTrpl: "ファイル選択(3マス)",
	selBox: "セレクトボックス(1マス)",
	selBoxDbl: "セレクトボックス(2マス)",
	selBoxTrpl: "セレクトボックス(3マス)",
	chkBtn: "チェックボタン",
	radioBtn: "ラジオボタン",
}

//対応する表示状態のフラグを決定する処理
function convertBtnFlg(val){
	let flg;

	if(val == SELECTITEM.selectStart){
		flg = DISPMODE.selectStart;
	}else if(val == SELECTITEM.txtBox){
		flg = DISPMODE.txtBox;
	}else if(val == SELECTITEM.txtBoxDbl){
		flg = DISPMODE.txtBoxDbl;
	}else if(val == SELECTITEM.button){
		flg = DISPMODE.button;
	}else if(val == SELECTITEM.btnDbl){
		flg = DISPMODE.btnDbl;
	}else if(val == "hidden"){
		flg = DISPMODE.hidden;
	}else if(val == SELECTITEM.txtBoxTrpl){
		flg = DISPMODE.txtBoxTrpl;
	}else if(val == SELECTITEM.btnTrpl){
		flg = DISPMODE.btnTrpl;
	}else if(val == SELECTITEM.fileSelect){
		flg = DISPMODE.fileSelect;
	}else if(val == SELECTITEM.fileDbl){
		flg = DISPMODE.fileDbl;
	}else if(val == SELECTITEM.fileTrpl){
		flg = DISPMODE.fileTrpl;
	}else if(val == SELECTITEM.selBox){
		flg = DISPMODE.selBox;
	}else if(val == SELECTITEM.selBoxDbl){
		flg = DISPMODE.selBoxDbl;
	}else if(val == SELECTITEM.selBoxTrpl){
		flg = DISPMODE.selBoxTrpl;
	}else if(val == SELECTITEM.chkBtn){
		flg = DISPMODE.chkBtn;
	}else if(val == SELECTITEM.radioBtn){
		flg = DISPMODE.radioBtn;
	}else{
		flg = 1;
	}

	return flg;
}

//2倍の大きさのフラグか判定する処理
function checkCellDoubleFlg(flg){
	if(flg == DISPMODE.txtBoxDbl
	|| flg == DISPMODE.btnDbl
	|| flg == DISPMODE.fileDbl
	|| flg == DISPMODE.selBoxDbl){
		return true;
	}else{
		return false;
	}
}

//3倍の大きさのフラグか判定する処理
function checkCellTripleFlg(flg){
	if(flg == DISPMODE.txtBoxTrpl
	|| flg == DISPMODE.btnTrpl
	|| flg == DISPMODE.fileTrpl
	|| flg == DISPMODE.selBoxTrpl){
		return true;
	}else{
		return false;
	}
}

//隣のセルを非表示にするか判定するラッパー関数
function checkNextCellHidden(flg){
	if( checkCellDoubleFlg(flg)
	||  checkCellTripleFlg(flg) ){
		return true;
	}else{
		return false;
	}
}

class Cell extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			disp: 0,
		}
	}

	getCellMode(){
		return this.state.disp;
	}

	setCellMode(mode){
		this.setState({disp:mode});
	}

	render(){

		if(this.state.disp == DISPMODE.selectStart){
			return(
				<select className="cell_selectStart" >
					<option>{this.props.value}に{SELECTITEM.selectStart}</option>
					<option>{this.props.value}に{SELECTITEM.txtBox}</option>
					<option>{this.props.value}に{SELECTITEM.txtBoxDbl}</option>
					<option>{this.props.value}に{SELECTITEM.txtBoxTrpl}</option>
					<option>{this.props.value}に{SELECTITEM.button}</option>
					<option>{this.props.value}に{SELECTITEM.btnDbl}</option>
					<option>{this.props.value}に{SELECTITEM.btnTrpl}</option>
					<option>{this.props.value}に{SELECTITEM.fileSelect}</option>
					<option>{this.props.value}に{SELECTITEM.fileDbl}</option>
					<option>{this.props.value}に{SELECTITEM.fileTrpl}</option>
					<option>{this.props.value}に{SELECTITEM.selBox}</option>
					<option>{this.props.value}に{SELECTITEM.selBoxDbl}</option>
					<option>{this.props.value}に{SELECTITEM.selBoxTrpl}</option>
					<option>{this.props.value}に{SELECTITEM.chkBtn}</option>
					<option>{this.props.value}に{SELECTITEM.radioBtn}</option>
				</select>
			);
		}else if(this.state.disp == DISPMODE.txtBox){
			return <img src="./Img/txtImg.png" className="cell" data-id={this.props.value}/>;
		}else	if(this.state.disp == DISPMODE.txtBoxDbl){
			return <img src="./Img/txtDblImg.png" className="cell_double" data-id={this.props.value}/>;
		}else if(this.state.disp == DISPMODE.hidden){
			return <input className="cell_hidden" type="button" value={this.props.value}/>;
		}else if(this.state.disp == DISPMODE.button){
			return <img src="./Img/btnImg.png" className="cell" data-id={this.props.value}/>;
		}else if(this.state.disp == DISPMODE.btnDbl){
			return <img src="./Img/btnDblImg.png" className="cell_double" data-id={this.props.value}/>;
		}else if(this.state.disp == DISPMODE.btnTrpl){
			return <img src="./Img/btnTrplImg.png" className="cell_triple" data-id={this.props.value}/>;
		}else if(this.state.disp == DISPMODE.txtBoxTrpl){
			return <img src="./Img/txtTrplImg.png" className="cell_triple" data-id={this.props.value}/>;
		}else if(this.state.disp == DISPMODE.fileSelect){
			return <img src="./Img/fileImg.png" className="cell" data-id={this.props.value}/>;
		}else if(this.state.disp == DISPMODE.fileDbl){
			return <img src="./Img/fileDblImg.png" className="cell_double" data-id={this.props.value}/>;
		}else if(this.state.disp == DISPMODE.fileTrpl){
			return <img src="./Img/fileTrplImg.png" className="cell_triple" data-id={this.props.value}/>;
		}else if(this.state.disp == DISPMODE.selBox){
			return <img src="./Img/selBoxImg.png" className="cell" data-id={this.props.value}/>;
		}else if(this.state.disp == DISPMODE.selBoxDbl){
			return <img src="./Img/selBoxDblImg.png" className="cell_double" data-id={this.props.value}/>;
		}else if(this.state.disp == DISPMODE.selBoxTrpl){
			return <img src="./Img/selBoxTrplImg.png" className="cell_triple" data-id={this.props.value}/>;
		}else if(this.state.disp == DISPMODE.chkBtn){
			return <img src="./Img/chkBtnImg.png" className="cell" data-id={this.props.value}/>;
		}else if(this.state.disp == DISPMODE.radioBtn){
			return <img src="./Img/radioBtnImg.png" className="cell" data-id={this.props.value}/>;
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

	//全体を初期状態に戻す処理
	allResetRow(){
		const clearFlg = 0;
		this.refs.btnRef0.setCellMode(clearFlg);
		this.refs.btnRef1.setCellMode(clearFlg);
		this.refs.btnRef2.setCellMode(clearFlg);
		this.refs.btnRef3.setCellMode(clearFlg);
		this.refs.btnRef4.setCellMode(clearFlg);
	}

	//指定したセルが非表示なら初期状態に戻す処理
	searchHidden(id){

		const clearFlg = 0;

		switch(id){
			case 0:
				if(this.refs.btnRef0.getCellMode() == DISPMODE.hidden){
					this.refs.btnRef0.setCellMode(clearFlg);
				}
				break;

			case 1:
				if(this.refs.btnRef1.getCellMode() == DISPMODE.hidden){
					this.refs.btnRef1.setCellMode(clearFlg);
				}
				break;

			case 2:
				if(this.refs.btnRef2.getCellMode() == DISPMODE.hidden){
					this.refs.btnRef2.setCellMode(clearFlg);
				}
				break;

			case 3:
				if(this.refs.btnRef3.getCellMode() == DISPMODE.hidden){
					this.refs.btnRef3.setCellMode(clearFlg);
				}
				break;

			case 4:
				if(this.refs.btnRef4.getCellMode() == DISPMODE.hidden){
					this.refs.btnRef4.setCellMode(clearFlg);
				}
				break;

			default:
				break;
		}
	}

	//位置が被る場合に初期状態に一旦戻す処理
	margeHiddenCell(id){
		let nextCellFlg;

		switch(id){
			case 1:
				nextCellFlg = this.refs.btnRef1.getCellMode();
				if(checkCellDoubleFlg(nextCellFlg)){
					this.refs.btnRef2.setCellMode(DISPMODE.default);
				}else if(checkCellTripleFlg(nextCellFlg)){
					this.refs.btnRef2.setCellMode(DISPMODE.default);
					this.refs.btnRef3.setCellMode(DISPMODE.default);
				}
				break;

			case 2:
				nextCellFlg = this.refs.btnRef2.getCellMode();
				if(checkCellDoubleFlg(nextCellFlg)){
					this.refs.btnRef3.setCellMode(DISPMODE.default);
				}else if(checkCellTripleFlg(nextCellFlg)){
					this.refs.btnRef3.setCellMode(DISPMODE.default);
					this.refs.btnRef4.setCellMode(DISPMODE.default);
				}
				break;

			case 3:
				nextCellFlg = this.refs.btnRef3.getCellMode();
				if(checkCellDoubleFlg(nextCellFlg)){
					this.refs.btnRef4.setCellMode(DISPMODE.default);
				}
				break;

			default:
				break;
		}
	}

	renderCell(i){
		const ref_name = "btnRef" + (i % 5);
		return <Cell disp={this.state.disp[i % 5]} value={i} ref={ref_name}/>;
	}

	handleClick(e){

		let id;
		let flg;
		let nextCellFlg;
		let confrictFlg;

		if(typeof(e.target.value) != "string"){
			id = e.target.getAttribute("data-id");
			flg = DISPMODE.redisp;
		}else{
			let tmp_id = e.target.value.split("に");
			id = tmp_id[0];
			flg = convertBtnFlg(tmp_id[1]);
		}

		const idx = parseInt(id, 10) % 5;

		switch (idx) {
			case 0:

				if(checkNextCellHidden(flg)){
					this.margeHiddenCell(idx + 1);
					if(checkCellTripleFlg(flg)){
						if(checkNextCellHidden(this.refs.btnRef2.getCellMode()) ){
							this.refs.btnRef3.setCellMode(DISPMODE.default);
							this.refs.btnRef4.setCellMode(DISPMODE.default);
						}
						this.refs.btnRef2.setCellMode(DISPMODE.hidden);
					}
					this.refs.btnRef1.setCellMode(DISPMODE.hidden);
				}else if(flg == DISPMODE.redisp){
					//再表示の時は非表示になっているセルを戻す
						if(checkCellDoubleFlg(this.refs.btnRef0.getCellMode()) ){
							this.searchHidden(idx + 1);
						}else if(checkCellTripleFlg(this.refs.btnRef0.getCellMode()) ){
							this.searchHidden(idx + 1);
							this.searchHidden(idx + 2);
						}
				}

				this.refs.btnRef0.setCellMode(flg);

				break;

			case 1:

				if(checkNextCellHidden(flg)){
					this.margeHiddenCell(idx + 1);
					if(checkCellTripleFlg(flg)){
						if(checkNextCellHidden(this.refs.btnRef3.getCellMode()) ){
							this.refs.btnRef4.setCellMode(DISPMODE.default);
						}
						this.refs.btnRef3.setCellMode(DISPMODE.hidden);
					}
					this.refs.btnRef2.setCellMode(DISPMODE.hidden);
				}else if(flg == DISPMODE.redisp){
					//再表示の時は非表示になっているセルを戻す
						if(checkCellDoubleFlg(this.refs.btnRef1.getCellMode()) ){
							this.searchHidden(idx + 1);
						}else if(checkCellTripleFlg(this.refs.btnRef1.getCellMode()) ){
							this.searchHidden(idx + 1);
							this.searchHidden(idx + 2);
						}
				}

				this.refs.btnRef1.setCellMode(flg);

				break;

			case 2:

				if(checkNextCellHidden(flg)){
					this.margeHiddenCell(idx + 1);
					if(checkCellTripleFlg(flg)){
						this.refs.btnRef4.setCellMode(DISPMODE.hidden);
					}
					this.refs.btnRef3.setCellMode(DISPMODE.hidden);
				}else if(flg == DISPMODE.redisp){
					//再表示の時は非表示になっているセルを戻す
						if(checkCellDoubleFlg(this.refs.btnRef2.getCellMode()) ){
							this.searchHidden(idx + 1);
						}else if(checkCellTripleFlg(this.refs.btnRef2.getCellMode()) ){
							this.searchHidden(idx + 1);
							this.searchHidden(idx + 2);
						}
				}

				this.refs.btnRef2.setCellMode(flg);

				break;

			case 3:
				//3マスのものは配置しないで縮小する
				if(flg == DISPMODE.txtBoxTrpl){
					flg = DISPMODE.txtBoxDbl;
				}else if(flg == DISPMODE.btnTrpl){
					flg = DISPMODE.btnDbl;
				}else if(flg == DISPMODE.fileTrpl){
					flg = DISPMODE.fileDbl;
				}else if(flg == DISPMODE.selBoxTrpl){
					flg = DISPMODE.selBoxDbl;
				}

				if(checkNextCellHidden(flg)){
					this.refs.btnRef4.setCellMode(DISPMODE.hidden);
				}else if(flg == DISPMODE.redisp){
					this.refs.btnRef4.setCellMode(DISPMODE.default);
				}

				this.refs.btnRef3.setCellMode(flg);

				break;

			case 4:
				//右端には2マス以上のものは配置しない
				if(flg == DISPMODE.txtBoxTrpl
				|| flg == DISPMODE.txtBoxDbl ){
					flg = DISPMODE.txtBox;
				}else if(flg == DISPMODE.btnDbl
				|| flg == DISPMODE.btnTrpl ){
					flg = DISPMODE.button;
				}else if(flg == DISPMODE.fileDbl
				|| flg == DISPMODE.fileTrpl){
					flg = DISPMODE.fileSelect;
				}else if(flg == DISPMODE.selBoxDbl
				|| flg == DISPMODE.selBoxTrpl){
					flg = DISPMODE.selBox;
				}

				this.refs.btnRef4.setCellMode(flg);

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

	//各行ごとにリセットして全体を初期状態にする処理
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
					className="reset_button"
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

//試作機部分の描画
ReactDOM.render(
	<Board />,
	document.getElementById("UI")
);

//ヘッダ部分の描画
ReactDOM.render(
	<div>
		<h2>アプリUI簡易試作器</h2>
		<ul className="list_center">
			<li>UI試作器：5*5くらいでフォームの見た目のイメージを作ります</li>
			<li>各セルから配置するパーツを選んでください</li>
			<li>配置位置が被ると左側にあるパーツが優先されます</li>
		</ul>
	</div>,
	document.getElementById("header")
);
