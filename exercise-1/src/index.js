const userInfo = document.getElementById("user-template").innerHTML;
var template = Handlebars.compile(userInfo);

//const url = 'https://randomuser.me/api?results=10';
const url = 'https://5d7a59779edf7400140aa043.mockapi.io/khojirakhimov';

fetch(url)
.then(resp => resp.json())
.then(function(data){
        console.log(data);	
    let users = data;
    var userData = template({users: data});
    console.log(userData);
    document.getElementById("userList").innerHTML += userData;
    $('.tohide').hide();
    $('.btn_show').on('click', function(){
    $(this).prev('.tohide').show();
    })
})
.catch(function(error){
    console.log(error);
});

function append(parent, el) {
    parent.appendChild(el);
}
function createNode(element){
    return document.createElement(element);
}
