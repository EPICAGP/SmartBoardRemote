// =========================
// EduKart Remote
// Designed by Aadi Gupta
// Part 1 - UI Interaction
// =========================
const socket = new WebSocket("wss://smartboardserver.onrender.com");

socket.onopen = () => {
    console.log("Connected to Server");
};

socket.onmessage = (event) => {
    console.log("Server:", event.data);
};

socket.onerror = (err) => {
    console.log("Connection Error", err);
};

socket.onclose = () => {
    console.log("Disconnected");
};
const buttons = document.querySelectorAll(".controls button");
const touchpad = document.querySelector(".touchpad");
const wifi = document.querySelector(".wifi");

let connected = false;

// Fake connection animation
setTimeout(() => {
    connected = true;
    wifi.innerHTML = "🟢 Connected";
    wifi.style.background = "#00c853";
}, 1500);

// Button click effect
buttons.forEach(button => {

    button.addEventListener("click", () => {

        button.style.transform = "scale(.92)";

        setTimeout(() => {
            button.style.transform = "";
        },150);

        showToast(button.innerText);

if (socket.readyState === WebSocket.OPEN) {
    socket.send(button.innerText);
}

    });

});

// ------------------------
// Touchpad
// ------------------------

let mouseDown = false;

touchpad.addEventListener("mousedown", () => {
    mouseDown = true;
});

document.addEventListener("mouseup", () => {
    mouseDown = false;
});

touchpad.addEventListener("mousemove", (e)=>{

    if(!mouseDown) return;

    const x = e.offsetX;
    const y = e.offsetY;

    console.log("Move:",x,y);

});

// Touch Support

touchpad.addEventListener("touchmove",(e)=>{

    const t = e.touches[0];

    console.log("Touch",t.clientX,t.clientY);

});

// Double click

touchpad.addEventListener("dblclick",()=>{

    showToast("Left Click");

});

// ------------------------
// Keyboard Shortcuts
// ------------------------

document.addEventListener("keydown",(e)=>{

    switch(e.key){

        case "ArrowUp":
        showToast("▲");
        break;

        case "ArrowDown":
        showToast("▼");
        break;

        case "ArrowLeft":
        showToast("◀");
        break;

        case "ArrowRight":
        showToast("▶");
        break;

        case "Enter":
        showToast("OK");
        break;

    }

});

// ------------------------
// Toast Message
// ------------------------

function showToast(message){

    const toast=document.createElement("div");

    toast.className="toast";

    toast.innerHTML=message;

    document.body.appendChild(toast);

    toast.style.position="fixed";
    toast.style.bottom="40px";
    toast.style.left="50%";
    toast.style.transform="translateX(-50%)";
    toast.style.padding="12px 24px";
    toast.style.background="#00bcd4";
    toast.style.color="white";
    toast.style.borderRadius="30px";
    toast.style.fontWeight="600";
    toast.style.boxShadow="0 10px 25px rgba(0,0,0,.4)";
    toast.style.zIndex="9999";

    setTimeout(()=>{

        toast.remove();

    },1200);

}

// ------------------------
// Clock
// ------------------------

setInterval(()=>{

    document.title="EduKart Remote • "+new Date().toLocaleTimeString();

},1000);

// ------------------------
// Startup
// ------------------------

console.log("EduKart Remote Started");