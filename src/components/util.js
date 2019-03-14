const generateTime = () => {
    const now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    hour = ('0' + hour).slice(-2)
    minute = ('0' + minute).slice(-2)
    return hour + ":" + minute;
}
export { generateTime }