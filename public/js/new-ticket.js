const btnNewTicket = document.getElementById('btn-new-ticket');
let lastTicket = document.getElementById("lbl-new-ticket");



let getLastTicket = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/ticket/last');
    
    if (!response.ok) {
      throw new Error('Error en la petición: ' + response.statusText);
    }
    return await response.json(); // Devuelve los datos JSON directamente
  } catch (error) {
    console.error('Error en la petición:', error);
    throw error; // Lanza el error para manejarlo fuera
  }
};



document.addEventListener('DOMContentLoaded', async () => {  

        
      
      lastTicket.textContent = await getLastTicket();





});

btnNewTicket.addEventListener('click', async () => {
   
  const response = await fetch('http://localhost:3000/api/ticket/', {
    method: 'POST'
  });

  if (response.ok) {
    lastTicket.textContent = await getLastTicket();
  } else {
    console.error('Error en la petición:', response.statusText);
  }
})
