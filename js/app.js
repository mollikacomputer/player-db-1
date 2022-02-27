function searchPlayer(){
    const searchFieldBox = document.getElementById('search-field');
    const searchFieldText = searchFieldBox.value;
    searchFieldBox.value = '';
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchFieldText}`;
    fetch(url)
    .then(response=>response.json())
    .then(data => displayPlayer(data.player))
    
} 


function displayPlayer(players){
    
    players.forEach(player =>{
           const playerContainrer = document.getElementById('player-container');
           const div = document.createElement('div');
           div.classList.add('col');
           div.innerHTML =`
           <div onclick="playerInfo('${player.idPlayer}')" class="card">
                <img src="${player.strThumb}" class="card-img-top" alt="...">
           <div class="card-body">
                <h5 class="card-title"> ${player.strBirthLocation} </h5>
                <p class="card-text">${player.strDescriptionEN.slice(0,100)} </p>
                <p>${player.strBirthLocation}</p>
           </div>
         </div>
           `;
           playerContainrer.appendChild(div);
    })
}


function playerInfo(playerId){

    const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${playerId}`;
    fetch(url)
    .then(response => response.json())
    .then(data => playerDetails(data.players[0]))
}


function playerDetails(info){
    // 
    document.getElementById('player-info').innerHTML =`
        <div class="card h-100">
            <img src="${info.strThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${info.strPlayer}</h5>
            <p class="card-text">${info.strDescriptionEN.slice(0,150)}</p>
        </div>
        <div class="card-footer">
            <small class="text-muted"> ${info.strFacebook} </small>
        </div>
    ` 
}