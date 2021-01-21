let question = document.getElementById('question')
let newQuestion = fetch('http://localhost:3000/get-question')
newQuestion.then(res => res.json()).then(res => question.innerHTML = (res.data.content))
