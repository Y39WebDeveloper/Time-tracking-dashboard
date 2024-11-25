const container = document.getElementById("container");
const inputs = document.querySelectorAll(".profile ul input");
const time = () => {
    for (let i = 0; i < inputs.length; i++) {
        if(inputs[i].checked){
            return inputs[i].value;
        }
    }
}
fetch("data.json").then(res => {
    return res.json();
}).then(data => {
    filterData(data).forEach(d => {
        createUI(d)
    })
    inputs.forEach(i => {
        i.addEventListener("change", () => {
            time()
            cleanUI()
            filterData(data).forEach(d => {
                createUI(d)
            })
        })
    })
})

function filterData(data){
    let newData = [];
    data.forEach(item => {
        function t(){
            if(time() == "daily"){
                return item.timeframes.daily
            }else if(time() == "weekly"){
                return item.timeframes.weekly
            }else{
                return item.timeframes.monthly
            }
        }
        let obj = {
            title: item.title,
            color: item.color,
            img: item.img,
            timeframes: t()
        }
        newData.push(obj);
    });
    return newData;
}

function createUI(data){
    let card = document.createElement("div")
    card.classList.add("card");
    card.style.background = data.img ? `url(${data.img}) no-repeat`: '';
    card.style.backgroundColor = `${data.color}`;
    let info = document.createElement("div")
    info.classList.add("info");
    info.innerHTML = `
        <h4>
            ${data.title} <span><img src="images/icon-ellipsis.svg" alt="" /></span>
        </h4>
        <h3>${data.timeframes.current}hrs <span>Last Week - ${data.timeframes.previous}hrs</span></h3>
    
    `;
    card.appendChild(info);
    container.appendChild(card)
}
function cleanUI(){
    const cards = document.querySelectorAll('.container .card')
    cards.forEach(ca => {
        ca.remove()
    })
}

/* 

<div class="card">
        <div class="info">
          <h4>
            Work <span><img src="images/icon-ellipsis.svg" alt="" /></span>
          </h4>
          <h3>32hrs <span>Last Week - 36hrs</span></h3>
        </div>
      </div>

*/
