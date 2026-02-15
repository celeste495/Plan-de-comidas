let currentDate = new Date();
let startX = 0;

function renderCalendar() {

    const calendar = document.getElementById("calendar");
    calendar.innerHTML = "";

    const monthNames = [
        "Enero","Febrero","Marzo","Abril","Mayo","Junio",
        "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
    ];

    const daysOfWeek = ["L","M","M","J","V","S","D"];

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    document.getElementById("monthTitle").textContent =
        monthNames[month] + " " + year;

    // Encabezado días
    daysOfWeek.forEach(day => {
        const header = document.createElement("div");
        header.textContent = day;
        header.style.fontWeight = "bold";
        calendar.appendChild(header);
    });

    const firstDay = new Date(year, month, 1).getDay();
    const adjustedFirstDay = (firstDay === 0 ? 6 : firstDay - 1);

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Espacios vacíos antes del día 1
    for (let i = 0; i < adjustedFirstDay; i++) {
        const empty = document.createElement("div");
        calendar.appendChild(empty);
    }

    const today = new Date(); // ← SOLO UNA VEZ

    for (let i = 1; i <= daysInMonth; i++) {

        const div = document.createElement("div");
        div.className = "day";
        div.textContent = i;

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
        if (diff > 0) nextMonth();
        else prevMonth();
    }
});

/* DESLIZAR EN COMPUTADORA */
document.addEventListener("mousedown", function(e){
    startX = e.clientX;
});

document.addEventListener("mouseup", function(e){
    let diff = startX - e.clientX;

    if (Math.abs(diff) > 50) {
        if (diff > 0) nextMonth();
        else prevMonth();
    }
});

renderCalendar();

function showCalendar() {
    document.getElementById("calendarView").classList.remove("hidden");
    document.getElementById("shoppingView").classList.add("hidden");
    document.getElementById("scannerView").classList.add("hidden");
}

function showShopping() {
    document.getElementById("calendarView").classList.add("hidden");
    document.getElementById("shoppingView").classList.remove("hidden");
    document.getElementById("scannerView").classList.add("hidden");
}

function showScanner() {
    document.getElementById("calendarView").classList.add("hidden");
    document.getElementById("shoppingView").classList.add("hidden");
    document.getElementById("scannerView").classList.remove("hidden");
}
