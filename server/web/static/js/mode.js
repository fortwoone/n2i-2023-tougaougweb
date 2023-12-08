function stored_mode() {
    const storage = localStorage.mode
    return storage == null ? null : storage
}

function set_mode(mode, text) {
    document.getElementById("theme").href = document.getElementById("theme").href.replace(/theme_.*\.css/gm, `theme_${mode}.css`)
    document.getElementById("mode_switcher").innerText = text
}

function update_mode() {
    const storedMode = stored_mode()
    if (storedMode == null) {
        set_mode("main", "Main theme")
    } else {
        switch (storedMode) {
            case "main":
                set_mode("main", "Main theme")
                break
            case "apocalypse":
                set_mode("apocalypse", "Apocalypse")
                break
            case "noel":
                set_mode("noel", "Noël")
                break
        }
    }
}

document.getElementById("mode_switcher").onclick = () => {
    const storedMode = stored_mode()
    switch (storedMode) {
        case "apocalypse":
            localStorage.mode = "noel"
            break
        case "noel":
            localStorage.mode = "main"
            break
        default:
            localStorage.mode = "apocalypse"
            break
    }
    update_mode()
}

update_mode()
