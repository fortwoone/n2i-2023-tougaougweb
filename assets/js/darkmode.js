function stored_dark_mode() {
    const storage = localStorage.dark_mode
    return storage == null ? null : JSON.parse(storage)
}

function system_dark_mode() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}

function set_mode(mode, icon) {
    document.body.dataset.bsTheme = mode
    document.getElementById("dark_mode_toggle").children[0].innerText = icon
}

function update_dark_mode() {
    const storedDarkMode = stored_dark_mode()
    if (storedDarkMode == null) {
        if (system_dark_mode()) set_mode("dark", "dark_mode"); else set_mode("light", "light_mode")
        document.getElementById("dark_mode_toggle").children[0].innerHTML = "night_sight_auto"
    } else {
        if (storedDarkMode) set_mode("dark", "dark_mode"); else set_mode("light", "light_mode")
    }
}

document.getElementById("dark_mode_toggle").onclick = () => {
    const storedDarkMode = stored_dark_mode()
    localStorage.dark_mode = String(storedDarkMode == null ? !system_dark_mode() : !storedDarkMode)
    update_dark_mode()
}

document.getElementById("dark_mode_toggle").onauxclick = (ev) => {
    if (ev.button === 1) {
        localStorage.removeItem("dark_mode")
        update_dark_mode()
    }
}

update_dark_mode()

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    update_dark_mode()
});
