let addbtn = document.getElementById("button_add");
let sortbtn = document.getElementById("button_sort");
let obj = JSON.parse(getLocalStorage());
addHTML(obj);

let addToList = () => {
  let inputValue = document.querySelector("#input input").value;
  if (inputValue == "" || checkRepeat(inputValue)) {
    return;
  }

  let promise = getInformation(inputValue);
  promise
    .then(function (data) {
      data = JSON.parse(data);
      if(data['message'] === 'Not Found') {
        alert("Không tìm thấy user bạn yêu cầu");
      }
      else {
        obj.push(data);
        addHTML(obj);
        addLocalStorage();
      }
      
      document.querySelector("#input input").value = "";
    })
    .catch(function (error) {
      console.log(error)
    })
    .finally(function () {
      console.log("done");
    });
};

function getInformation(inputValue) {
  let promise = (url) =>
    new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.onload = () => resolve(xhr.responseText);
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send();
    });
  var res;
  res = promise(`https://api.github.com/users/${inputValue}`);
  return res;
}
function addHTML(object) {
  let list = document.querySelector("ul");
  list.innerHTML = "";
  for (let i in object) {
    // console.log(data["login"]);
    // console.log(data["avatar_url"]);
    // console.log(data["company"]);
    // console.log(data["followers"]);
    list.innerHTML += /*html*/ `
      <li class="list-group-item d-flex justify-content-between">
        <div class="d-flex justify-content-between" >
          <img src="${object[i]['avatar_url']}" alt="" width="100px">
          <div class="ml-3 mr-3">
            <p>Username: ${object[i]["login"]}</p>
            <p>Email: ${object[i]["email"]}</p>
          </div>
          <div>
            <p>Company: ${object[i]["company"]}</p>
            <p>Followers: ${object[i]["followers"]}</p>
          </div>
        </div>
    
        <button onclick="deleteItem(this)" class="btn btn-danger">delete</button>
      </li>`;
  }
}

function addLocalStorage() {
  localStorage.setItem("list", JSON.stringify(obj));
  // console.log(localStorage.getItem('list'))
}

function getLocalStorage() {
  if (localStorage.getItem("list") == null) {
    localStorage.setItem("list", "[]");
  }
  return localStorage.getItem("list");
}
function checkRepeat(input) {
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const element = obj[key]["login"];
      if (element === input) return true;
    }
  }
  return false;
}

function removeFromObj(value) {
  for (let i in obj) {
    if (obj[i]["login"] === value) {
      console.log(obj[i])
      obj.splice(i, 1);
    }
  }
  addLocalStorage();
}
function getConfirmation() {
  var retVal = confirm("Do you want to delete ?");
  return retVal == true;
}
function deleteItem(item) {
  let childValue = $(item).parent().children("div").children("div.ml-3").children()["0"].innerHTML;
  childValue = childValue.slice(10)
  if (getConfirmation()) {
    removeFromObj(childValue);
    $(item).parent().remove();
  }
}
function sortList(value) {
  let temp = obj.filter((ele) => {
    return ele["login"].includes(value);
  });
  console.log(temp)
  addHTML(temp);
}
$(document).ready(function () {
  $("#button_add").click(() => addToList());
  $("#button_sort").click(function () {
    let inputValue = document.querySelector("#input input").value;
    sortList(inputValue);
  });
  $("#button_delete_all").click(function () {
    getConfirmation();
    $("ul").children("li").remove();
    obj = [];
    localStorage.removeItem("list");
  });
  $("#show_all").click(function() {
    addHTML(obj);
  })
});

// Promise.all([promise("https://api.github.com/users/anhtbok92"), promise("https://api.github.com/users/vinhspm")]).then(
//   function([data1, data2]) {
//     console.log(data1)
//     console.log(data2)
//   }
// ).catch(function([error1, error2]) {
//   console.log(error1)
//   console.log(error2)

// }).finally(function(){
//   console.log('ok')
// })
