export function NumToTime(num: number) {
    let minutes = Math.floor(num / 60);
    let seconds: any = num % 60;
    if(seconds <= 9){
        seconds = '0' + seconds
    }
    return minutes + ":" + seconds;
}