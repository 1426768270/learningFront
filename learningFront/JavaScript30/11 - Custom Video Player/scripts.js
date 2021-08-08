const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player__slider');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

//播放状态切换
function togglePlay() {
    console.log(video.paused);
    const method = video.paused ? 'play' : 'pause'; //判断是暂停还是播放
    video[method]();    //调用对应方法
}

//切换按钮状态
function updateToggle() {
    const icon = video.paused ? '►' : '❚❚';   //根据播放状态
    toggle.textContent = icon;
}

//控制前进
function skip() {
    //根据自定义属性，获得时间
    console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip);
}

//声音和速度的控制
function handleRange() {
    video[this.name] = this.value;
}

//处理播放
function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

//进度条
function screb(e) {
    console.log(e.offsetX);
    const screbTime = ( e.offsetX / progress.offsetWidth )*video.duration;  //获得要播放的量
    video.currentTime = screbTime;
}

//控制视频的播放
video.addEventListener('click', togglePlay)
video.addEventListener('play', updateToggle)
video.addEventListener('pause', updateToggle)
video.addEventListener('timeupdate', handleProgress)
//切换按钮，播放视频
toggle.addEventListener('click', togglePlay)

skipButtons.forEach( skipButton => {
    skipButton.addEventListener('click',skip)
})

ranges.forEach( range => {
    range.addEventListener('change',handleRange)
})
ranges.forEach( range => {
    range.addEventListener('mousemove',handleRange)
})

progress.addEventListener('click',screb);

let mousedown = false; //开关
progress.addEventListener('mousedown',() => mousedown = true);
progress.addEventListener('mouseup',() => mousedown = false);
progress.addEventListener('mousemove',(e) => mousedown && screb(e) );
