const fmtBytes = (value) => {
    let units = ["B", "KB", "MB", "GB"];
    for (let i = 0; i < units.length; i++) {
        if (value < 1024) {
            return value.toFixed(2) + units[i];
        }
        value /= 1024;
    }
}

export {
    fmtBytes
}