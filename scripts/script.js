const btn = document.getElementById('btn');
const form = document.getElementById('form');
const response = document.getElementById('response');

const getData = () => {
  const data = new FormData(form);
  const processedData = Object.fromEntries(data.entries());
  form.reset();
  return processedData;
}

const postData = async () => {
  const newUser = getData();
  try {
    const response = await fetch ('http://localhost:3000/users', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify(newUser)
    });
    if(response.ok) {
      const jsonResponse = await response.json();
      const {email, name, number} = jsonResponse;
      response.innerHTML = `
      <ul>
      Success! you uploaded the following information:
        <li>${email}</li>
        <li>${name}</li>
        <li>${number}</li>
      </ul>
      `
    }
  
  } catch(error) {
    console.log(error);
  }
}


btn.addEventListener('click', (event) => {
  event.preventDefault();

  const email = document.querySelector("#email");
  const name = document.querySelector("#name");
  const number = document.querySelector("#number");

  if (!email.value || !name.value || !number.value) {
    alert("Please fill out all required fields.");
    return;
  }

  postData();
  
})

//type this to run local server=    npm run json:server