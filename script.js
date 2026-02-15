let currentDate = new Date(2026, 1); // Febrero 2026
let startX = 0;

function renderCalendar() {

    const calendar = document.getElementById("calendar");
    calendar.innerHTML = "";

    const monthNames = [
        "Enero","Febrero","Marzo","Abril","Mayo","Junio",
        "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
    ];

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    document.getElementById("monthTitle").textContent =
        monthNames[month] + " " + year;

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= daysInMonth; i++) {

    const div = document.createElement("div");
    div.className = "day";
    div.textContent = i;

    const today = new Date();
    
    if (
        i === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear()
    ) {
        div.classList.add("today");
    }

    calendar.appendChild(div);
    }
}

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
}

function prevMonth() {
    const minDate = new Date(2026, 1);
    if (currentDate <= minDate) return;

    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
}

/* DESLIZAR EN CELULAR */

document.addEventListener("touchstart", function(e){
    startX = e.touches[0].clientX;
});

document.addEventListener("touchend", function(e){
    let endX = e.changedTouches[0].clientX;
    let diff = startX - endX;

    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            nextMonth();
        } else {
            prevMonth();
        }
    }
});

/* DESLIZAR EN COMPUTADORA */

document.addEventListener("mousedown", function(e){
    startX = e.clientX;
});

document.addEventListener("mouseup", function(e){
    let diff = startX - e.clientX;

    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            nextMonth();
        } else {
            prevMonth();
        }
    }
});

renderCalendar();
