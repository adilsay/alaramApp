// const hour = document.getElementById('hour');
// const minute = document.getElementById('minute');
// const second = document.getElementById('second');

// const setBtn = document.getElementById('setBtn');

// let interval = null;
// let total = 0;

// totalValue = ()=>{
//     total = Number(hour.value)*360 + Number(minute.value)*60 + Number(second.value);
// }

// let added = document.getElementById('addedContent');
// timer = ()=>{
//   totalValue();
//   total--;

//   if(total >= 0){
//     var hr = Math.floor(total/3600);
//     var mt = Math.floor((total/60) - (hr*60));
//     var sc = total - ((hr*3600) + (mt*60));
    
  
//     added.innerHTML = `
//     <div class="timeContent">
//         <span>Time left: </span>
//         <span id="ttime">
//           <input type="number" id="hhour" value = ${hr} > :
//           <input type="number" id="mminute" value = ${mt}> :
//           <input type="number" id="ssecond" value = ${sc}>
//         </span>
//         <button id="dltBtn">Delete</button>
//       </div>
//     `
//     // hour.value = hr;
//     // minute.value = mt;
//     // second.value = sc;
//   }
// }

// setBtn.addEventListener('click' , () =>{
//     clearInterval(interval);
//     setInterval(timer , 1000);

// })


document.addEventListener("DOMContentLoaded", function() {
    const activeTimersContainer = document.getElementById("activeTimers");
    const startTimerBtn = document.getElementById("startTimerBtn");
    const hoursInput = document.getElementById("hours");
    const minutesInput = document.getElementById("minutes");
    const secondsInput = document.getElementById("seconds");
  
    let timers = [];
  
    startTimerBtn.addEventListener("click", function() {
      const hours = parseInt(hoursInput.value);
      const minutes = parseInt(minutesInput.value);
      const seconds = parseInt(secondsInput.value);
  
      if (isNaN(hours) || isNaN(minutes) || isNaN(seconds) ||
           seconds < 0 ||
          minutes > 59 || seconds > 59) {
        alert("Please enter a valid time.");
        return;
      }
  
      const totalTimeInSeconds = hours * 3600 + minutes * 60 + seconds;
      if (totalTimeInSeconds === 0) {
        alert("Please enter a non-zero time.");
        return;
      }
  
      const timerObj = {
        totalTime: totalTimeInSeconds,
        intervalId: null
      };
  
      timers.push(timerObj);
  
      const timerElement = createTimerElement(timerObj);
  
      activeTimersContainer.appendChild(timerElement);
  
      timerObj.intervalId = setInterval(function() {
        timerObj.totalTime--;
        if (timerObj.totalTime <= 0) {
          clearInterval(timerObj.intervalId);
          timerElement.classList.add("timer-ended");
          timerElement.querySelector(".time-left").textContent = "Timer is Up!";
          showStopButton(timerElement);
          playTimerEndSound();
        } else {
          const timeLeft = formatTime(timerObj.totalTime);
          timerElement.querySelector(".time-left").textContent = timeLeft;
        }
      }, 1000);
  

      updateNoTimersMessage();

      // Clear input values
      hoursInput.value = "";
      minutesInput.value = "";
      secondsInput.value = "";
    });
  
    function createTimerElement(timerObj) {
      const timerElement = document.createElement("div");
      timerElement.classList.add("timer");
  
      const timeLeft = formatTime(timerObj.totalTime);
      timerElement.innerHTML = `
        <span id="timeLeftText">Time Left:</span>
        <span class="time-left">${timeLeft}</span>
        <button class="delete-btn">Delete</button>
        <button class="stop-btn">Stop</button>
      `;
      const deleteBtn = timerElement.querySelector(".delete-btn");
      deleteBtn.addEventListener("click", function() {
        clearInterval(timerObj.intervalId);
        timers = timers.filter(timer => timer !== timerObj);
        timerElement.remove();
        updateNoTimersMessage();
      });
      
      const stopBtn = timerElement.querySelector(".stop-btn");
      stopBtn.addEventListener("click", function() {
      clearInterval(timerObj.intervalId);
      timerElement.classList.remove("timer-ended");
      timerObj.timeLeft = timerObj.totalTime;
      timerElement.querySelector(".time-left").style.display = "inline";
      showDeleteButton(timerElement);
    });

    showDeleteButton(timerElement);

      return timerElement;
    }


    function showDeleteButton(timerElement) {
        timerElement.querySelector(".delete-btn").style.display = "inline-block";
        timerElement.querySelector(".stop-btn").style.display = "none";
      }
      
      function updateNoTimersMessage() {
        const noTimersMessage = document.getElementById("noTimersMessage");
        if (timers.length === 0) {
          noTimersMessage.style.display = "block";
        } else {
          noTimersMessage.style.display = "none";
        }
      }
    
      function showStopButton(timerElement) {
        timerElement.querySelector(".delete-btn").style.display = "none";
        timerElement.querySelector(".stop-btn").style.display = "inline-block";
      }
    
    function formatTime(totalSeconds) {
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
  
      return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`;
    }
  
    function formatNumber(number) {
      return number.toString().padStart(2, "0");
    }
  
    function playTimerEndSound() {
      // Replace the sound file path with your preferred audio alert
      const audio = new Audio('./sound/snd_fragment_retrievewav-14728.mp3');
      audio.play();
    }
  });
  