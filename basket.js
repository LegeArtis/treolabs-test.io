const deleteFromBasket = ({target: {id}})=> {
    const index = user.basket.findIndex((item)=> item.id === +id);
    console.log(index);
    user.basket.splice(index, 1);
    refreshBasket();
};

const refreshBasket = ()=> {
    const bodyBasket = document.getElementById('body');
    const isExist = document.getElementById('basket_ul');
    if (isExist) {
        bodyBasket.removeChild(isExist);
    }

    let totalPrice = 0;
    const ul = document.createElement('ul');
    ul.id = 'basket_ul';

    user.basket.reduce((previousValue, {title, count, id, price}) => {
        const li = document.createElement('li');
        const titleItem = document.createElement('p');
        const countItem = document.createElement('p');
        const deleteItem = document.createElement('p');

        totalPrice += price * count;
        titleItem.id = id;
        titleItem.textContent = title;
        titleItem.className = 'basket_item_title pointer_cursor width';
        titleItem.addEventListener('click', titleOnClick, false);
        countItem.className = 'basket_item_count';
        countItem.textContent = count;
        deleteItem.id = id;
        deleteItem.addEventListener('click', deleteFromBasket, false);
        deleteItem.textContent = 'X';
        deleteItem.className = 'basket_item_delete pointer_cursor';

        li.appendChild(titleItem);
        li.appendChild(countItem);
        li.appendChild(deleteItem);

        previousValue.appendChild(li);
        return previousValue;
    }, ul);

    document.getElementById('total').textContent = `Total: ${totalPrice} UAH`;
    bodyBasket.appendChild(ul);
};

const createBasket = ()=> {
    const basket = document.createElement('div');
    const h3 = document.createElement('h3');
    const bodyHeader = document.createElement('div');
    const body = document.createElement('div');
    const total = document.createElement('p');
    const bodyTitle = document.createElement('p');
    const bodyCount = document.createElement('p');
    const bodyDelete = document.createElement('p');

    basket.id = 'basket_block';
    h3.textContent = 'Basket';
    body.className = 'body';
    body.id = 'body';
    bodyHeader.className = 'body';
    total.textContent = 'Total: 0 UAH';
    total.id = 'total';
    bodyTitle.textContent = 'Title';
    bodyCount.textContent = 'Count';
    bodyDelete.textContent = 'Delete';

    bodyHeader.appendChild(bodyTitle);
    bodyHeader.appendChild(bodyCount);
    bodyHeader.appendChild(bodyDelete);

    basket.appendChild(h3);
    basket.appendChild(bodyHeader);
    basket.appendChild(body);
    basket.appendChild(total);

    document.getElementById('header').appendChild(basket);
};
