let section = document.querySelector(".clock");

setInterval(() =>{

    let date = new Date(),
    hour = date.getHours(),
    minute = date.getMinutes(),
    second = date.getSeconds();

    let AM_PM;
    AM_PM = hour < 12 ? "AM":"PM";
    hour = hour > 12 ? hour-12 : hour;
    hour = hour == 0 ? hour = 12 : hour;


    hour = hour < 10 ? "0" + hour : hour;
    minute = minute < 10 ? "0" + minute : minute;
    second = second < 10 ? "0" + second : second;

    document.querySelector(".hour_num").innerText = hour;
    document.querySelector(".minute_num").innerText = minute;
    document.querySelector(".second_num").innerText = second;
    document.querySelector(".am_pm").innerText =AM_PM;

},1000)



//alarm ringtone

let alarmListArr = [];
const selectMenu = document.querySelectorAll("select");
const setAlarmBtn = document.querySelector("#btn-setAlarm");
let alarmCount = 0;
let alarmTime;
let ring = new Audio('https://mobcup.net/ringtone/mahesh-dle-nzxgq7r8');
;




//Set Alarm section


for(let i=12; i>0;i--){
    i=i<10 ? "0"+i :i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for(let i=59; i>=0;i--){
    i=i<10 ? "0"+i :i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for(let i=2; i>0;i--){
    let ampm = i== 1? "AM":"PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

//add alarm 


function setAlarm(){
    document.querySelector("#alarm-h3").innerText = "Alarms";
    let time = `${selectMenu[0].value}:${selectMenu[1].value}:00 ${selectMenu[2].value}`;
    if(time.includes("setHour") || time.includes("setMinute") || time.includes("AM/PM")){
        alert("Please, Select Valid Input");
    }else{
        alarmCount++;
        document.querySelector(".alarmList").innerHTML += `
        <div class="alarmLog" id="alarm${alarmCount}">
            <span id="span${alarmCount}">${time}</span>
            <button class="btn-delete" id="${alarmCount}" onClick="deleteAlarm(this.id)">Delete</button>
        </div>`;

        alarmTime = `${selectMenu[0].value}:${selectMenu[1].value}:00 ${selectMenu[2].value}`;
        alarmListArr.push(alarmTime);
        console.log(document.querySelector(".btn-delete").value);
    }

}

setAlarmBtn.addEventListener("click",setAlarm);

//delete alarm

function deleteAlarm(click_id){
    var element = document.getElementById("alarm"+click_id);
    var deleteIndex = alarmListArr.indexOf(document.querySelector("#span"+click_id).innerText);
    alarmListArr.splice(deleteIndex,1);
    element.remove();
}


let ringtone = new Audio('https://mobcup.net/ringtone/mahesh-dle-nzxgq7r8');

setInterval(() => {
    let date = new Date(),
        hour = date.getHours(),
        minute = date.getMinutes(),
        second = date.getSeconds();

    let AM_PM;
    AM_PM = hour < 12 ? "AM" : "PM";
    hour = hour > 12 ? hour - 12 : hour;
    hour = hour == 0 ? 12 : hour;

    hour = hour < 10 ? "0" + hour : hour;
    minute = minute < 10 ? "0" + minute : minute;
    second = second < 10 ? "0" + second : second;

    document.querySelector(".hour_num").innerText = hour;
    document.querySelector(".minute_num").innerText = minute;
    document.querySelector(".second_num").innerText = second;
    document.querySelector(".am_pm").innerText = AM_PM;

    // Check if the current time matches any of the alarm times
    if (alarmListArr.includes(hour + ":" + minute + ":00 " + AM_PM)) {
        ring.play();
        document.querySelector("#stopAlarm").style.visibility = "visible";
    }
}, 1000);

function stopAlarm() {
    ring.pause();
    ring.currentTime = 0; // Reset playback position
    document.querySelector("#stopAlarm").style.visibility = "hidden";
}
