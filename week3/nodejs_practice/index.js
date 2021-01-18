// Sử dụng các hàm đọc, ghi file đồng bộ để hoàn thiện các yêu cầu sau
const fs = require("fs")
const dataString = fs.readFileSync("data.json", "utf8")
const data = JSON.parse(dataString)
// lấy thông tin học sinh có _id là jubuq3lfmjjmp0wrdeupt
let a;
function getDetailStudent() {
  for(let item of data) {
    if(item._id === 'jubuq3lfmjjmp0wrdeupt'){
      a = item;
    }
  }
  return a;
}

// Lấy số lượng học sinh có từ Nguyễn
function getCountStudentWithLastName() {
  let arr = data.filter(item => {
    return item.name.includes("Nguyễn");
  })
  
  return arr.length;
}

// Tính điểm trung bình của toàn bộ sinh viên (làm tròn đến một chữ số sau dấu phẩy)
function calAverageMark() {
  let sum = 0;
  let n = data.length;
  data.forEach(element => {
    sum += element.mark
  });
  return Math.round((sum / n) * 10 ) / 10 ;
}

// Ghi ra số lượng học sinh đạt điểm 10 ra file output.txt (sử dụng hàm ghi đồng bộ);
function writeCountStudentGet10MarkToFile() {
  let res = data.filter(item => {
    return item.mark === 10;
  })
  fs.writeFileSync("output.txt", `${res.length}`)
}

module.exports = {
  getDetailStudent,
  getCountStudentWithLastName,
  calAverageMark,
  writeCountStudentGet10MarkToFile
}