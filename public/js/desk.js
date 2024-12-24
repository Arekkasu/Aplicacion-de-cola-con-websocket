const lblPending = document.querySelector("#lbl-pending");
const deskHeader = document.querySelector("h1");
const noMoreAlert = document.querySelector(".alert");
const btnDraw = document.querySelector("#btn-draw");
const btnDone = document.querySelector("#btn-done");
const currentTicket = document.querySelector("small");

const searchParams = new URLSearchParams(window.location.search);
if (!searchParams.has("escritorio")) {
  window.location = "index.html";
  throw new Error("El escritorio es obligatorio");
}

const deskNumber = searchParams.get("escritorio");
let workingNumber = null;
deskHeader.innerText = `${deskNumber}`;

function checkTicketCount(currentCount = 0) {
  if (currentCount === 0) {
    noMoreAlert.classList.remove("d-none");
    lblPending.textContent = "";
  } else {
    noMoreAlert.classList.add("d-none");
    lblPending.textContent = currentCount;
  }
}

async function loadInitialCount() {
  const pending = await fetch("http://localhost:3000/api/ticket/pending").then(
    (response) => response.json(),
  );
  checkTicketCount(pending.length);
}

async function getTicket() {
  const { status, ticket, message } = await fetch(
    `http://localhost:3000/api/ticket/draw/${deskNumber}`,
  ).then((response) => response.json());

  if (status === "error") {
    currentTicket.textContent = message;
    return;
  }
  workingNumber = ticket;
  currentTicket.textContent = ticket.number;
}

async function finishTicket() {
  if (!workingNumber) {
    return;
  }
  console.log(workingNumber);
  const { status, message } = await fetch(
    `http://localhost:3000/api/ticket/done/${workingNumber.id}`,
    {
      method: "PUT",
    },
  ).then((response) => response.json());
  console.log(status, message);
  if (status === "success") {
    workingNumber = null;
    console.log("AA");
    currentTicket.textContent = "nadie";
  }
}

function connectToWebSockets() {
  const socket = new WebSocket("ws://localhost:3000/ws");

  socket.onmessage = (event) => {
    console.log(event.data);
    const { type, payload } = JSON.parse(event.data);
    //Cuando un ticket cambie
    if (type === "ticket-number-changed") {
      checkTicketCount(payload);
    }
    return;
  };

  socket.onclose = (event) => {
    console.log("Connection closed");
    setTimeout(() => {
      console.log("retrying to connect");
      connectToWebSockets();
    }, 1500);
  };

  socket.onopen = (event) => {
    console.log("Connected");
  };
}

btnDraw.addEventListener("click", getTicket);
btnDone.addEventListener("click", finishTicket);
loadInitialCount(); // Carga el contador inicial

connectToWebSockets();
