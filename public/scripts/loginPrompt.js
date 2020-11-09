// (()=> {
//     let loginIdEle = document.getElementById('loginPromptId');
//     loginIdEle.style.left = 0.5 * (window.innerWidth - loginIdEle.getBoundingClientRect().width);
//     document.getElementById('backgroundBody').style.opacity = 0.2;
//     document.getElementById('backgroundBody').style['pointer-events'] = 'none';
// })();


function afterLogin(responseText, userName) {
    alert(responseText);
    document.getElementById('loginPromptId').style.display = 'none';
    document.getElementById('backgroundBody').style.opacity = 1;
    document.getElementById('backgroundBody').style['pointer-events'] = '';
    let name = document.getElementsByClassName('userIcon')[0];
    name.style.display = 'block';
    name.innerHTML = userName[0].toUpperCase();
    name.title = userName;
}

function doLogin() {
    let userName = document.getElementById('userName').value;
    let password = document.getElementById('password').value;
    if (userName !== '' && password !== '') {
        let xhttp = new XMLHttpRequest();
        let queryParams = `?user=${userName}&pass=${password}`;
        let url = '/getCreds' + queryParams;
        xhttp.onloadend = function() {
            if (this.status == 200) {
                afterLogin(this.responseText, userName);
            }
          };
    
        xhttp.open("POST",url,true);
        xhttp.send();
    } else {
        if (userName !== '') {
            alert('Password missing');
        } else if (password !== '') {
            alert('UserName missing');
        } else {
            alert('Enter the Credentials');
        }
    }
}