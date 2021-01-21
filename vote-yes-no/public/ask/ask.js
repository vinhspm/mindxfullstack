const createForm = document.getElementById('form-question');
const textAreaQuestion = document.getElementById('create-question');
let charLeft = document.getElementById('char-left')
createForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const content = textAreaQuestion.value;

  const question = { content }

  fetch('http://localhost:3000/create-question', {
    method: 'POST',
    body: new URLSearchParams(question)
  })
  .then(res => res.json())
  .then(res => {
    console.log(res)
    window.open('/', '_self')
  })
})

textAreaQuestion.addEventListener('input', () => {
  let n = 200 - textAreaQuestion.value.length
  charLeft.innerHTML = `${n}/200`
})