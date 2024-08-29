const oneMonthInSeconds : number = 30 * 24 * 60 * 60;
const currentTime : number = Math.floor(Date.now() / 1000);
const tokenExp : number =  currentTime + oneMonthInSeconds; 

export {
    tokenExp,
    currentTime
}