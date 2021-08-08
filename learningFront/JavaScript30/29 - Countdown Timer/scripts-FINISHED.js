const timeDisplay  = document.querySelector('.display__time-left');
const timeEndDisplay = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]')

let countdown;
//计时
function timer(secondes) {
    clearInterval(countdown); //清除已有计时器
    showTimeLeft(secondes);
    const now = Date.now();
    const then = now + secondes *1000;
    showTimeLeft(secondes);
    showEndTime(then);
    countdown = setInterval( () => {
        const secondesLeft = Math.round((then - Date.now()) / 1000); //换算秒
        if ( secondesLeft < 0 ) {
            clearInterval(countdown);
            return;
        }
        showTimeLeft(secondesLeft);
    }, 1000)
}

//展示
function showTimeLeft(secondes) {
    //处理格式
    const minutes = Math.floor(secondes / 60); //取整数
    const remainedSeconds = secondes % 60;
    const display = `${minutes}:${remainedSeconds < 10 ? '0':''}${remainedSeconds}`;
    document.title = display;
    timeDisplay.textContent = display;
}

//展示最后截止时间
function showEndTime(timestamp) {
    const end = new Date(timestamp);
    const hours = end.getHours();
    const minutes = end.getMinutes();
    const endDisplay = `在 ${hours}:${ minutes < 10 ? '0' : ''}${minutes} 停止`
    console.log(endDisplay);
    timeEndDisplay.textContent = endDisplay;
}

//开始计时
function startTime() {
    const secondes = this.dataset.time;
    timer(secondes);
}

buttons.forEach( button => {
    button.addEventListener('click', startTime);
})

//输入
document.customForm.addEventListener('submit', function(e){
    //阻止提交
    e.preventDefault();
    const min = this.minutes.value;
    timer(min * 60);
})