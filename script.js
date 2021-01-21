/*
基礎プログラミング演習2　最終課題
by 920OJ
====================
このプログラムはGoogle Chromeで動作検証しています。
Internet Explorerでは正常に動作しない可能性があります。
*/

/* メモを格納する変数を用意 */
let memodata = [];

/* 現在時刻を取得する関数 */
const gettime = () => {
    let now = new Date();           // Dateインスタンスを作成
    let year = now.getFullYear();   // 年の取得
    let month = now.getMonth() + 1;   // 月の取得
    let date = now.getDate();       // 日の取得
    let hour = now.getHours();      // 時間の取得
    let min = now.getMinutes();     // 分の取得
    let sec = now.getSeconds();     // 秒の取得
    let nowtime = `${year}年${month}月${date}日${hour}時${min}分${sec}秒` // 時刻を変数に代入
    return nowtime; // 時刻を代入した変数を返す
}

/* メモを追加する関数 */
const add = () => {
    if (!memodata) { // もしメモを格納している変数の中に何も入っていなかったら初期化する
        memodata = [];
    }
    else {
        memodata = JSON.parse(localStorage.getItem('memostorage')); // メモを格納している変数の中に何か入っていたらLocal Storageを参照して最新の状態に更新する
    }
    let name = document.getElementById('memoname').value; // 名前欄からメモの名前を取得
    let text = document.getElementById('memotext').value; // 本文欄からメモの本文を取得
    let time = gettime(); // 現在時刻を取得
    memodata.push({ 'n': name, 't': text, 'a': time }); // メモを格納している変数に連想配列としてメモの内容を代入
    localStorage.setItem('memostorage', JSON.stringify(memodata)); // 取得したメモの内容をLocal StorageにJSONデータとして格納
    display(); // メモの内容を表示する関数を呼び出す
}

/* 入力フォームを削除する関数 */
const delForm = () => {
    document.getElementById('memoname').value = ''; // 名前欄を無にする
    document.getElementById('memotext').value = ''; // メモ本文欄を無にする
}

/* メモを全消去する関数 */
const delAll = () => {
    localStorage.clear('memostorage'); // clearメソッドで全消去
    memodata = []; // メモを格納する変数を初期化
    tmptext = ''; // メモ表示用の変数を初期化
    document.getElementById('sticky').innerHTML = ''; // メモ表示欄を初期化
}

/* 指定したメモを消去する関数 */
const deletememo = (i) => {
    memodata = JSON.parse(localStorage.getItem('memostorage'));
    memodata.splice(i, 1);
    console.log(memodata);
    localStorage.setItem('memostorage', JSON.stringify(memodata));
    display();
}

/* 指定したメモを編集する関数 */
const editmemo = (i) => {
    memodata = JSON.parse(localStorage.getItem('memostorage'));
    let fixedname = document.getElementById(`memonameedit${i}`).value;
    let fixedtext = document.getElementById(`memotextedit${i}`).value;
    let fixedtime = gettime();
    memodata[i] = { 'n': fixedname, 't': fixedtext, 'a': fixedtime };
    localStorage.setItem('memostorage', JSON.stringify(memodata));
    display();
    memodata = [];
}

/* データからメモを表示する関数 */
let tmptext = '';
const display = () => {
    for (let i = 0; i < memodata.length; i++) {
        tmptext = tmptext + `
        <div class="card-body" style="background-color: #f9f957; margin: 10px 10px 10px 10px;">
            <h5 class="card-title">${memodata[i].n}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${memodata[i].a}</h6>
            <p class="card-text">${memodata[i].t}</p>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#ModalEdit${i}">編集</button>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#ModalDelete${i}">削除</button>
        
            <div class="modal fade" id="ModalEdit${i}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">メモの編集</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            メモを編集します。
                            <form>
                            <div class="form-group">
                              <label for="exampleFormControlInput1">メモの名前を入力</label>
                              <input type="text" class="form-control" id="memonameedit${i}" value="${memodata[i].n}">
                            </div>
                            <div class="form-group">
                              <label for="exampleFormControlTextarea1">メモの本文を入力</label>
                              <textarea class="form-control" id="memotextedit${i}" rows="3">${memodata[i].t}</textarea>
                              </div>
                            </form>
                        </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" >閉じる</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal" onclick="editmemo(${i});">保存</button>
                    </div>
                </div>
            </div>
        </div>
        
            <div class="modal fade" id="ModalDelete${i}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">メモの編集</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            メモを削除します。
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">閉じる</button>
                            <button type="button" class="btn btn-primary" data-dismiss="modal" onclick="deletememo(${i});">削除</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    }
    document.getElementById('sticky').innerHTML = tmptext;
    tmptext = '';
}

/* 初期化処理 */
memodata = JSON.parse(localStorage.getItem('memostorage'));
if (memodata) {
    display(); // LocalStorageに値が残っていればメモを表示
}
else {
    memodata = []; // LocalStorageに値がなければ初期化
}