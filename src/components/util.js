const generateTime = () => {
    const now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    hour = ('0' + hour).slice(-2)
    minute = ('0' + minute).slice(-2)
    return hour + ":" + minute;
}
const generateUid = () => {
    return new Date().getTime() + "" + Math.floor(Math.random() * 999 + 1);
  }
  
export { generateTime, generateUid }