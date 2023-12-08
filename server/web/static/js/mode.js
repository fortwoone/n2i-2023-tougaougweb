function stored_mode() {
    const storage = localStorage.mode
    return storage == null ? null : storage
}

function set_mode_tmp(mode, text) {
    document.getElementById("theme").href = document.getElementById("theme").href.replace(/theme_.*\.css/gm, `theme_${mode}.css`)
    document.getElementById("mode_switcher").innerText = text
}

function set_mode(mode) {
    localStorage.mode = mode
    update_mode()
}

function update_mode() {
    const storedMode = stored_mode()
    if (storedMode == null) {
        set_mode_tmp("main", "Main theme")
    } else {
        switch (storedMode) {
            case "main":
                set_mode_tmp("main", "Main theme")
                break
            case "apocalypse":
                set_mode_tmp("apocalypse", "Apocalypse")
                break
            case "noel":
                set_mode_tmp("noel", "Noël")
                break
        }
    }
}

document.getElementById("mode_switcher").onclick = () => {
    const storedMode = stored_mode()
    switch (storedMode) {
        case "apocalypse":
            set_mode("noel")
            break
        case "noel":
            set_mode("main")
            break
        default:
            set_mode("apocalypse")
            break
    }
}

update_mode()
