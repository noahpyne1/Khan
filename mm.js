const ver = "V3.2.6";
let isDev = false;

const repoPath = `https://raw.githubusercontent.com/Niximkk/Khanware/refs/heads/${isDev ? "dev/" : "main/"}`;

let device = {
    mobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|Mobile|Tablet|Kindle|Silk|PlayBook|BB10/i.test(navigator.userAgent),
    apple: /iPhone|iPad|iPod|Macintosh|Mac OS X/i.test(navigator.userAgent)
};

/* User */
let user = {
    username: "Username",
    nickname: "Nickname",
    UID: 0
}

let loadedPlugins = [];

/* Elements */
const unloader = document.createElement('unloader');
const dropdownMenu = document.createElement('dropDownMenu');
const statsPanel = document.createElement('statsPanel');
const splashScreen = document.createElement('splashScreen');

/* Globals */
window.features = {
    questionSpoof: true,
    videoSpoof: true,
    showAnswers: false,
    autoAnswer: false,
    customBanner: false,
    nextRecomendation: false,
    repeatQuestion: false,
    minuteFarmer: false,
    rgbLogo: false
};
window.featureConfigs = {
    autoAnswerDelay: 3,
    customUsername: "",
    customPfp: ""
};

/* Security */
document.addEventListener('contextmenu', (e) => !window.disableSecurity && e.preventDefault());
document.addEventListener('keydown', (e) => {
    if (!window.disableSecurity && (e.key === 'F12' || (e.ctrlKey && e.shiftKey && ['I','C','J'].includes(e.key)))) {
        e.preventDefault();
    }
});

/* Misc Styles */
document.head.appendChild(Object.assign(document.createElement("style"), {
    innerHTML: "@font-face{font-family:'MuseoSans';src:url('https://corsproxy.io/?url=https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/ynddewua.ttf')format('truetype')}"
}));

document.querySelector("link[rel~='icon']").href = '';

/* Event Emitter */
class EventEmitter {
    constructor(){ this.events={} }
    on(t,e){ ("string"==typeof t)&&(t=[t]),t.forEach(t=>{
        this.events[t]||(this.events[t]=[]);
        this.events[t].push(e);
    })}
    off(t,e){ ("string"==typeof t)&&(t=[t]),t.forEach(t=>{
        this.events[t]&&(this.events[t]=this.events[t].filter(t=>t!==e))
    })}
    emit(t,...e){ this.events[t]&&this.events[t].forEach(t=>{ t(...e) }) }
    once(t,e){
        ("string"==typeof t)&&(t=[t]);
        let s=(...i)=>{ e(...i),this.off(t,s) };
        this.on(t,s)
    }
}
const plppdo = new EventEmitter();

new MutationObserver((m) => { for (let mu of m) if (mu.type === 'childList') plppdo.emit('domChanged'); })
.observe(document.body, { childList:true, subtree:true });

/* Helpers */
const delay = ms => new Promise(r => setTimeout(r, ms));
const playAudio = url => { const a=new Audio(url); a.play(); };
function sendToast(text, duration=5000, gravity='bottom') {
    Toastify({ text, duration, gravity, position:"center", stopOnFocus:true, style:{ background:"#000" }}).showToast();
}

/* Splash Screen */
async function showSplashScreen(){
    splashScreen.style.cssText =
        "position:fixed;top:0;left:0;width:100%;height:100%;background:#000;display:flex;align-items:center;justify-content:center;z-index:9999;color:white;font-size:30px;font-family:MuseoSans,sans-serif;text-align:center;";
    splashScreen.innerText = "Loading...";
    document.body.appendChild(splashScreen);
}
async function hideSplashScreen(){ splashScreen.remove(); }

/* Script Loader */
async function loadScript(url,label){
    return fetch(url).then(r=>r.text()).then(code => { loadedPlugins.push(label); eval(code); });
}
async function loadCss(url){
    return new Promise(res=>{
        const l=document.createElement("link");
        l.rel="stylesheet"; l.href=url; l.onload=()=>res();
        document.head.appendChild(l);
    });
}

/* Visual Setup */
function setupMenu(){
    loadScript(repoPath+'visuals/mainMenu.js', 'mainMenu');
    loadScript(repoPath+'visuals/statusPanel.js', 'statusPanel');
    if(isDev) loadScript(repoPath+'visuals/devTab.js', 'devTab');
}

/* Core Functions */
function setupMain(){
    loadScript(repoPath+'functions/questionSpoof.js', 'questionSpoof');
    loadScript(repoPath+'functions/videoSpoof.js', 'videoSpoof');
    loadScript(repoPath+'functions/minuteFarm.js', 'minuteFarm');
    loadScript(repoPath+'functions/spoofUser.js', 'spoofUser');
    loadScript(repoPath+'functions/answerRevealer.js', 'answerRevealer');
    loadScript(repoPath+'functions/rgbLogo.js', 'rgbLogo');
    loadScript(repoPath+'functions/customBanner.js', 'customBanner');
    loadScript(repoPath+'functions/autoAnswer.js', 'autoAnswer');
}

/* Inject Startup */
showSplashScreen();

loadCss('https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css');
loadScript('https://cdn.jsdelivr.net/npm/toastify-js').then(async () => {
    sendToast("Injected successfully!");
    hideSplashScreen();
    setupMenu();
    setupMain();
});
