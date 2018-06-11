var tdata;
var nrows = 10;
var users = [];
$(document).ready(function () {

  $.get("http://127.0.0.1:8080/student.json", function (data, status) {
    localStorage.allUsers = JSON.stringify(data);
    users = data;
    createTable(users, nrows);
  });
});

function dropdown() {
  var x = $("#sel option:selected").text();
  var a = parseInt(x);
  createTable(users, a);
}

function createTable(data, nrows) {
  $("#display").html('');
  for (i = 0; i < nrows; i++) {
    tdata += `<tr id="data_${i}">
  <td>${data[i].firstname}
  </td>
  <td>${data[i].lastname}
  </td>
  <td>${data[i].email}</td>
  <td>${data[i].location}</td>
  <td>${data[i].phone}</td>
  <td>${data[i].batch}</td>
  <td>${data[i].address.permanent}</td>
  <td><input type="button" value = "more details" id="details_${i}" onclick="details(this.id);"/></td>

  <td><input type="button" value = "delete" id="delete${i}" onclick="delete();"/></td>
  <td><input type="button" value = "edit" id="edit${i}" onclick="edit();"/>
  </td>
  </tr>`;
  }
  $("#display").html(`<table id="myTable" style="border: 1px solid black ;" ><thead><th>firstname</th><th>lastname</th><th>emailid</th><th>locatiom</th><th>phone</th><th>batch</th><th>address</th></thead >
  ${tdata}
  </table>`
  );
}

function details(id) {
  if(){
    
  }
  var i = parseInt(id.split('_')[1]);
  var id1 = (id + "").replace("details", "data");
  document.getElementById(id1).insertAdjacentHTML("afterend", `<tr id="extended_${i}"> <td> ${users[i].previous_employer.google} </td> </tr>`);  
}

function myFunction() {
  var input, filter, table, tr, td, i;
  input = document.getElementById("myinput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}