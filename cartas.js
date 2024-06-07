/**
 * Cartas Uno Atualizado
 * @author Luís Antônio de Paula Lima
 */

function sortearCarta(){
    //    
    let valorCarta = ["0-red","0-blue","0-green","0-yellow","1-red","2-red","3-red","4-red","5-red","6-red","7-red","8-red","9-red","bloqueio-red", "inverte-red", "cor-red", "mais2-red", "mais4-red","1-blue","2-blue","3-blue","4-blue","5-blue","6-blue","7-blue","8-blue","9-blue","bloqueio-blue", "inverte-blue", "cor-blue", "mais2-blue", "mais4-blue","1-green","2-green","3-green","4-green","5-green","6-green","7-green","8-green","9-green","bloqueio-green", "inverte-green", "cor-green", "mais2-green", "mais4-green","1-yellow","2-yellow","3-yellow","4-yellow","5-yellow","6-yellow","7-yellow","8-yellow","9-yellow","bloqueio-yellow", "inverte-yellow", "cor-yellow", "mais2-yellow", "mais4-yellow"]
    //sorteio do índice dos vetores
    let tipoCarta = valorCarta[Math.floor(Math.random() * valorCarta.length)]
    //console.log(`${face}${nipe}`)
    let centroCarta = document.getElementById('centro')
    centroCarta.innerHTML = `<img src="./${tipoCarta}.png">`
    //console.log(`${tipoCarta}${Cor}`)

}
