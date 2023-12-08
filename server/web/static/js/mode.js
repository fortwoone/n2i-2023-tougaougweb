function stored_mode() {
    const storage = localStorage.mode
    return storage == null ? null : storage
}

function set_mode_tmp(mode) {
    document.getElementById("theme").href = document.getElementById("theme").href.replace(/theme_.*\.css/gm, `theme_${mode}.css`)
    console.log(mode)
    let snowflakes = document.getElementsByClassName("snowflake")
    for (let i = 0; i < snowflakes.length; i++) {
        if (mode !== 'noel')
            snowflakes[i].classList.add("invisible")
        else
            snowflakes[i].classList.remove("invisible")
    }
}

function set_mode(mode) {
    console.log(mode)
    localStorage.mode = mode
    update_mode()
}

function update_mode() {
    const storedMode = stored_mode()
    if (storedMode == null) {
        set_mode_tmp("main")
    } else {
        set_mode_tmp(storedMode)
    }
}

update_mode()

var _0x37c5cd=_0x1583;function _0x34f7(){var _0x23affd=['85821uNvGZJ','31152pzKJxj','21862160eYYyrV','left','down','44DeupGg','addEventListener','2SPhBni','24mMuoKw','5811050uwwNjr','293503TleXTL','length','3199608ckWseR','472572oXCFTF','keyCode'];_0x34f7=function(){return _0x23affd;};return _0x34f7();}(function(_0x145280,_0x453461){var _0xfaab07=_0x1583,_0xe8422=_0x145280();while(!![]){try{var _0xdc68fe=parseInt(_0xfaab07(0x12e))/0x1*(parseInt(_0xfaab07(0x126))/0x2)+-parseInt(_0xfaab07(0x12f))/0x3*(parseInt(_0xfaab07(0x124))/0x4)+-parseInt(_0xfaab07(0x128))/0x5+-parseInt(_0xfaab07(0x12b))/0x6+parseInt(_0xfaab07(0x129))/0x7+-parseInt(_0xfaab07(0x127))/0x8*(-parseInt(_0xfaab07(0x12c))/0x9)+parseInt(_0xfaab07(0x130))/0xa;if(_0xdc68fe===_0x453461)break;else _0xe8422['push'](_0xe8422['shift']());}catch(_0x2b440c){_0xe8422['push'](_0xe8422['shift']());}}}(_0x34f7,0xa191c));var a={0x25:_0x37c5cd(0x122),0x26:'up',0x27:'right',0x28:_0x37c5cd(0x123),0x41:'a',0x42:'b'},k=['up','up','down',_0x37c5cd(0x123),_0x37c5cd(0x122),'right',_0x37c5cd(0x122),'right','b','a'],p=0x0;document[_0x37c5cd(0x125)]('keydown',function(_0x49e464){var _0x1e5f4b=_0x37c5cd,_0x336fb8=a[_0x49e464[_0x1e5f4b(0x12d)]],_0x11fde1=k[p];_0x336fb8==_0x11fde1?(p++,p==k[_0x1e5f4b(0x12a)]&&(d(),p=0x0)):p=0x0;});function _0x1583(_0x1d7e87,_0x37f6b8){var _0x34f74a=_0x34f7();return _0x1583=function(_0x1583a8,_0x318325){_0x1583a8=_0x1583a8-0x122;var _0x3a5b69=_0x34f74a[_0x1583a8];return _0x3a5b69;},_0x1583(_0x1d7e87,_0x37f6b8);}function d(){set_mode('noel');}
