
const createHistory = ()=> {
    const existHistory = document.getElementById('history_div');
    if (existHistory) {
        document.body.removeChild(existHistory);
    }
    const historyDiv = document.createElement('div');
    historyDiv.id = 'history_div';
    document.body.appendChild(historyDiv);
    refreshHistory();
};

const refreshHistory = ()=> {
    const historyDiv = document.getElementById('history_div');
    if (historyDiv.firstChild) {
        historyDiv.removeChild(historyDiv.firstChild);
    }
    const ul = document.createElement('ul');

    const sortedHistory = user.itemHistory.sort((a, b) => b.date - a.date);

    sortedHistory.reduce((previousValue, currentValue) => {
        const li = document.createElement('li');
        const p = document.createElement('p');
        const dateP = document.createElement('p');

        p.id = currentValue.id;
        p.textContent = currentValue.title;
        p.addEventListener('click', titleOnClick, false);
        p.className = 'history_title pointer_cursor';
        dateP.id = 'history_date';
        const date = new Date(currentValue.date);
        dateP.textContent = date.toShortFormat();

        li.appendChild(p);
        li.appendChild(dateP);

        previousValue.appendChild(li);
        return previousValue;
    }, ul);

    historyDiv.appendChild(ul);
};

Date.prototype.toShortFormat = function() {

    const month_names =["Jan","Feb","Mar",
        "Apr","May","Jun",
        "Jul","Aug","Sep",
        "Oct","Nov","Dec"];

    const day = this.getDate();
    const month_index = this.getMonth();
    const year = this.getFullYear();
    const hours = this.getHours();
    let minutes = this.getMinutes();
    let seconds = this.getSeconds();
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${day}-${month_names[month_index]}-${year} ${hours}:${minutes}:${seconds}`;
};
