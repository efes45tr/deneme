// Basit bir saat göstergesi
function showTime() {
    const clock = document.getElementById("clock");
    const now = new Date();
    clock.innerHTML = now.toLocaleTimeString();
}
setInterval(showTime, 1000);
