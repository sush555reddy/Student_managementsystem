var tdata;
var nrows = 10;
var users = [];
$(document).ready(function () {

  if (!localStorage.allUsers) {

    jQuery.ajax({
      url: "http://127.0.0.1:54065/student.json", success: function (data) {
        localStorage.allUsers = JSON.stringify(data);
        users = data;
        createTable(users, nrows);
      }
    });

  } else {

    users = JSON.parse(localStorage.allUsers);
    createTable(users, nrows);

  }
});
function savetable(){ 
    var getdata = {};
    getdata.firstname = document.getElementById("firstname").value;
    getdata.lastname = document.getElementById("lastname").value;
    getdata.email = document.getElementById("email").value;
    getdata.location = [];
    getdata.location.push(document.getElementById("location").value);
    getdata.phone = document.getElementById("phone").value;
    getdata.batch = document.getElementById("batch").value;
    getdata.address ={};
    getdata.address.communication = document.getElementById("communication").value;
    getdata.address.permanent = document.getElementById("permanent").value;
    
    getdata.previous_employer = {
        google: "Computer Programmer",
        facebook: "Frontend developer",
        linkedIn: "Software Engineer"
      };   
    users.push(getdata);
    localStorage.allUsers = JSON.stringify(users); 
    createTable(users,nrows);   
    document.getElementById("firstname").value = "";
    document.getElementById("lastname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("location").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("batch").value = "";
    document.getElementById("permanent").value = "";
    document.getElementById("communication").value = "";
}


function dropdown() {
  var x = $("#sel option:selected").text();
  var a = parseInt(x);
  createTable(users, a);
}

function createTable(data, nrows) {
  $("#display").html('');
  for (i = 0; i < nrows; i++) {
    tdata += `<tr id="data_${i}">
  <td id="firstname_${i}">${data[i].firstname}</td>
  <td id="lastname_${i}">${data[i].lastname}</td>
  <td id="email_${i}">${data[i].email}</td>
  <td id="location_${i}">${data[i].location}</td>
  <td id="phone_${i}">${data[i].phone}</td>
  <td id="batch_${i}">${data[i].batch}</td>
  <td id="address.permanent_${i}">${data[i].address.permanent}</td>
  <td id="address.communications_${i}">${data[i].address.communication}</td>
  <td><input type="button" value = "more details" id="details_${i}" onclick="details(this.id);"/></td>
  <td><input type="button" value = "delete" id="delete_${i}" onclick="deletes(this.id);"/></td>
  <td><input type="button" value = "edit" id="edit_${i}" onclick="editdetails(this.id);"/>
  </td>
  </tr>`;
  }
  $("#display").html(`<table id="myTable"><thead><th>firstname</th><th>lastname</th><th>emailid</th><th>locatiom</th><th>phone</th><th>batch</th><th>permanent address</th><th>communication address</th></thead >
  ${tdata}
  </table>`
  );
}


function editdetails(id) {
  var i = parseInt(id.split('_')[1]);
  var id1 = (id + "").replace("edit", "data");
  // $("#edit_"+i).hide();
  var editdata = $("#" + id1).attr("contenteditable", true);
  $("#edit_" + i).attr('value', 'Save');
  $("#edit_" + i).attr('onclick', 'savedata(this.id)');
    
    
    
}

function savedata(id) {

  var i = parseInt(id.split('_')[1]);
  var firstname = document.getElementById(`firstname_${i}`).innerHTML;
   var lastname=document.getElementById(`lastname_${i}`).innerHTML;
   var email=document.getElementById(`email_${i}`).innerHTML;
   var location=document.getElementById(`location_${i}`).innerHTML;
   var phone=document.getElementById(`phone_${i}`).innerHTML;
   var batch=document.getElementById(`batch_${i}`).innerHTML;
   var permanent= document.getElementById(`address.permanent_${i}`).innerHTML;
   var communication = document.getElementById(`address.communications_${i}`).innerHTML;
   users[i].firstname = firstname;
   users[i].lastname = lastname;
   users[i].email = email;
   users[i].location = location;
   users[i].phone = phone;
   users[i].batch = batch;
    users[i].address.permanent = permanent;
    users[i].address.communication=communication; 
 localStorage.allUsers = JSON.stringify(users);
  $("#edit_" + i).attr('value', 'edit');
   $("#data_" + i).attr("contenteditable",false);
  $("#edit_" + i).attr('onclick', 'editdetails(i)');
    
    if(nrows==users.length-1){createTable(users,users.length);}

}

function deletes(id) {
  var i = parseInt(id.split('_')[1]);
  var id1 = (id + "").replace("delete", "data");
  document.getElementById(id1).remove();
  $(".videt").remove();
  localStorage.allUsers = JSON.stringify(users);
}

function details(id) {
  $(".videt").remove();
  var i = parseInt(id.split('_')[1]);
  var id1 = (id + "").replace("details", "data");
  var employee = users[i].previous_employer;
  var str = "";
  for (var key in employee) {
    str += key + ":" + employee[key] + ", ";
  }
  console.log(str);
  document.getElementById(id1).insertAdjacentHTML("afterend", `<tr class="videt" id="extended_${i}"> <td> ${str} </td> </tr>`);
}

function myFunction() {
  var input, filter, table, tr, td, i;
  input = document.getElementById("myinput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    // for(var j=0; j< 6; j++){
    td = tr[i].getElementsByTagName("td")[0] || tr[i].getElementsByTagName("td")[1] || tr[i].getElementsByTagName("td")[2] || tr[i].getElementsByTagName("td")[3] ||tr[i].getElementsByTagName("td")[4] || tr[i].getElementsByTagName("td")[5] || tr[i].getElementsByTagName("td")[6];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
  // }
}

 function debounce(func, wait, immediate) {
 	var timeout;
 	return function() {
 		var context = this, args = arguments;
 		var later = function() {
 			timeout = null;
 			if (!immediate) func.apply(context, args);
 		};
 		var callNow = immediate && !timeout;
 		clearTimeout(timeout);
 		timeout = setTimeout(later, wait);
 		if (callNow) func.apply(context, args);
 	};
 };
var statuspoint =0;
var newpoint =0;

function empty(){}

var scrolldata= debounce(function(){
    statuspoint = window.scrollY;
    if(statuspoint -300> newpoint){
        if(nrows<=(Math.floor(users.length/10)*10)-10){
            nrows+=10;
            createTable(users,nrows);
            
        }
        else{
            nrows=users.length;
            createTable(users,nrows);
            window.removeEventListener('scroll',scrolldata);
          alert("no more records");
            
        }
    }
    if(statuspoint>newpoint){
        newpoint= statuspoint;
    }  
    
 },300);
window.addEventListener('scroll',scrolldata);
