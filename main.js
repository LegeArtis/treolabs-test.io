let user;
let currentItemList;
let currentPag;

window.onload = ()=> {
  document.getElementById('auth_off').addEventListener('submit', logIn, false);
};

const logIn = (e)=> {
    e.preventDefault();
    const login = document.getElementById('login');
    const pass = document.getElementById('pass');
    user = searchUser(login.value, pass.value);
    if (user) {
        currentItemList = itemList;
        searchBlock();
        drawList(currentItemList);
        createHistory();
        authToggle();
        document.getElementById('wrong_auth').hidden = true;
        document.getElementById('welcome').textContent = `Welcome, ${user.userName}!`;
        login.value = '';
        pass.value = '';
        createBasket();
    } else {
        document.getElementById('wrong_auth').hidden = false;
    }
};

const logOut = ()=> {
    user = null;
    const list = document.getElementById('list_div');
    const history = document.getElementById('history_div');
    const basket = document.getElementById('basket_block');
    const searchBlock = document.getElementById('search_block');
    document.body.removeChild(history);
    document.body.removeChild(list);
    document.getElementById('header').removeChild(basket);
    document.getElementById('header').removeChild(searchBlock);
    authToggle();
};


const authToggle = ()=> {
    const authOff = document.getElementById('auth_off');
    const authIn = document.getElementById('auth_in');
    authOff.hidden = !authOff.hidden;
    authIn.hidden = !authIn.hidden;
};


