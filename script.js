document.getElementById("year").textContent = new Date().getFullYear();

const days = [
	"sunday",
	"monday",
	"tuesday",
	"wednesday",
	"thursday",
	"friday",
	"saturday",
];
const todayName = days[new Date().getDay()];

document.querySelectorAll(".hours-list tr").forEach(function (row) {
	const label = row.querySelector("td").textContent.trim().toLowerCase();
	row.classList.toggle("current-day", label === todayName);
});

const openOrClosed = document.querySelector(".open-or-closed");
const hours = {
	monday: { open: "09:00", close: "17:30" },
	tuesday: { open: "09:00", close: "17:30" },
	wednesday: { open: "09:00", close: "17:30" },
	thursday: { open: "09:00", close: "19:00" },
	friday: { open: "09:00", close: "17:30" },
	saturday: { open: "09:00", close: "17:30" },
	sunday: { open: "10:00", close: "15:00" },
};
function isOpenNow() {
	const now = new Date();
	const today = days[now.getDay()];
	const currentTime =
		now.getHours() + ":" + now.getMinutes().toString().padStart(2, "0");
	const openTime = hours[today].open;
	const closeTime = hours[today].close;

	const [currentHours, currentMinutes] = currentTime.split(":").map(Number);
	const [openHours, openMinutes] = openTime.split(":").map(Number);
	const [closeHours, closeMinutes] = closeTime.split(":").map(Number);

	const currentTimeInMinutes = currentHours * 60 + currentMinutes;
	const openTimeInMinutes = openHours * 60 + openMinutes;
	const closeTimeInMinutes = closeHours * 60 + closeMinutes;

	return (
		currentTimeInMinutes >= openTimeInMinutes &&
		currentTimeInMinutes < closeTimeInMinutes
	);
}

openOrClosed.textContent = isOpenNow() ? "Open now" : "Closed now";

const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

function closeMenu() {
	menuToggle.setAttribute("aria-expanded", "false");
	menuToggle.setAttribute("aria-label", "Open menu");
	mobileMenu.classList.remove("open");
}

function openMenu() {
	menuToggle.setAttribute("aria-expanded", "true");
	menuToggle.setAttribute("aria-label", "Close menu");
	mobileMenu.classList.add("open");
}

menuToggle.addEventListener("click", function () {
	const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
	isOpen ? closeMenu() : openMenu();
});

mobileMenu.querySelectorAll("a").forEach(function (link) {
	link.addEventListener("click", closeMenu);
});

window.addEventListener("resize", function () {
	if (window.innerWidth > 900) closeMenu();
});
