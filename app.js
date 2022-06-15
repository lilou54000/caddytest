//pour s'assurer que le document soit charg'e,possibilit'e de mettre un addEventlisterner sur le container
document.addEventListener("DOMContentLoaded", () => {
    fetchData()
})

//mettre une variable car consommation d'une API. Mettre en async pour avoir un temps d'attente de reponse API
//mettre fonction en fleche

const fetchData = async () => {
    try {
        //on va utiliser la reponse de l'API indiquee dans la parenthese (url ou chemin du document)
        const rep = await fetch("./caddyshop/api.json")
        //attendre les reponses de la data
        const data = await rep.json()

        //mettre les functions qui vont charger a partir de la data
        showProducts(data)
        detecterButton(data)

    }
    //en cas de probleme, faire apparaitre error dans 
    //console
    catch (error) {
        //console.log(error)
    }
};

//une fois que l on a la partie div ou on va placer les elements, on va les mettre en reserve. Garder le meme nom que l'id de cette partie, mais en camelcase et attache. Avec querySelector, on indique cette id justiement
const containerProduits = document.querySelector('#container-produits');

//on va modeliser les donnees. Dans cette fonction =>, on va lui faire recevoir la donnee (data)
const showProducts = (data) => {
    //creation de template et fragment pour eviter de refaire trop de code
    //on attrape le template et on met .contetn au final pour saisir les elements du template
    const template = document.querySelector('#template-produits').content;
    //on attrape le fragment
    const fragment = document.createDocumentFragment();

    //on parcours la data
    data.forEach(produits => {
        //on sasit les differents elements de la card
        templateCard.querySelector('img').setAttribute('src', produits.thumbnailUrl)
        templateCard.querySelector('h5').textContent = product.title
        templateCard.querySelector('p').textContent = product.price

        //placer un dataset sur le bouttonpour indiquer l'action sur les differents boutons d-achat
        templateCard.querySelector('button').dataset.id = product.id

        //comme on a plusieurs fois le contenu de ce template, on va devoir le cloner.
        const clone = templateCard.cloneNode(true);
        //dans ce fragment pour le moment vide, on va avoir le contenu du clone
        fragment.appendChild(clone)
    })
    //ce fragment va se repeter dans le container-product
    container - produits.appendChild(fragment)

};

// creer la variable du caddy
let carrito = {}
//mettre le detecteur sur le boutton achat

const detecterButton = (data) => {
    //besoin de selectionner le bon boutton
    //donc on selectionne le bouton qui repond aux conditions
    const buttons = document.querySelector('.card button')
    // on parcourt le tableau pour  que btn s-applique sur tous les bouttons
    buttons.forEach (btn => {

            btn.addEventListener('click', () => {

        // on va chercher dans la data le product qui soit le meme que celui a qui on a attribue un id     === signifie egaul en valeur et type de donnees
        //parseInt --> met l'objet en numero entier
        const product = data.find(item => item.id === parseInt(btn.dataset.id));
        //par default, 1  click quantite =1
        product.quantity=1

        //pour eviter de recharger tout les elements du product a chaque fois,
        //on veut seulement modifier la quantite du rpoduit. Donc function if, car si on a deja leproduit dans le caddy (hasOwnProperty), on a juste besoin de la quantite
        if (caddy.hasOwnProperty()) {
            //si on la deja dans le caddy, on augmente ++
            product.quantity = caddy[product.id].quantity +1

        }
        // si on n a pas leproduit, identifie par son id, dans le caddy, on va lajouter
        //... -> reste sert à stocker une liste indéfinie de valeur sous forme de tableau ( OU spread operator sert à éclater un tableau en une liste finie de valeurs)
        caddy[product.id] = { ...produits }

        // actions sur le caddy
        // creation d'un tableau d'achat  
        showCaddy()

    })

})
};

//faire selectioner les items/produits
const item = document.querySelector('#items');
const showCaddy = () => {

    //informationde lakey product
    //for(const key in object){
    //  if(object.hasOwnProperty(key)){    const element = object[key];}




    // mieux vaut uriliser un foreache mais pour ca, il faut transformer object en valeur

    Object.values(caddy).forEach(product => {
        //on selectionne chaque element html et on y colle le contenu que l on souhaite
        templateCaddy.querySelector('th').textContent = product.id
        templatecaddy.querySelectorAll('td')[0].textContent = product.title
        templatecaddy.querySelectorAll('td')[1].textContent = product.quantity

        //le prix doit etre multiplier par la quantite achetee
        templatecaddy.querySelector('span').textContent = product.prix * product.quantity

        //botones
        templatecaddy.querySelector('.btn-info').dataset.id = product.id
        templatecaddy.querySelector('.btn-danger').dataset.id = product.id

        const clone = templatecaddy.cloneNode(true);

        //je clone plusieurs fois ce fragment, en fonction du nombre de item
        fragment.appendChild(clone)
    })

    //je colle les differents fragment dans le tbody items
    items.appendChild(fragment)


    //mise  en forme footer
    showFooter()
    //action bouton +/-
    actionBtn ()

    
};

const footer = document.querySelector(#template-footer);

const showFooter = () => {

    // phrase de chariot vide, disparait lors du 1er click d achat
    footer.innerHTML = ''


 //definir le template footer
 const template= document.querySelector(#template-footer).content;
 const fragment = document.createDocumentFragment ();
 
    //les elemenst deviennent des object
    // augmenter quantity et totaux
    const nQuantity = Object.values(caddy).reduce((acc, { quantity }) => acc + quantity, 0);
    // acc --> accuumulateur.  on lui ajoute la quantite
    //on rend cet accumulateur en un numero 
    const nPrice = Object.values(caddy).reduce((acc, {quantity, price}) => acc + quantity * price ,0);
    
    //console.log(nPrice)

    templateFooter.querySelectorAll('td')[0].textContent = nQuantity
    templateFooter.querySelector('span').textContent = nPrice


    //on clone pour tous les produits
    const clone = templateFooter.cloneNode(true);
//on colle les clones dans le fragment
    fragment.appendChild(clone)

    //on colle le fragnment dans le footer
    footer.appendChild(fragment)

    //bouton de vider le chariiot. on le selectionne, on met un eventlistener, et le chariot revient a la situation initiale

    const boton = document.querySelector('#empty-caddy');
    boton.addEventListener('click', () => {
        caddy = {}
        showCaddy()
    })

}

//action sur les boutons +/-
const actionBtn = () =>{
//saisie de tous les boutons + et -
const btnMore = document.querySelectorAll('#items btn-info');
const btnLess = document.querySelectorAll('#items btn-danger');

//faire une boucle pour prendre en compte toutes les actions faites sur ces boutons
btnMore.forEach(btn =>{
    btn.addEventListener('click',()=>{
        //console.log ('ajouter...');
        const product= caddy[btn.dataset.id]
        product.quantity++
        caddy[e.target.dataset.id] = { ...product }
        showCaddy()
        
    });
})

btnLess.forEach(btn =>{
    btn.addEventListener('click',()=>{
        //console.log ('retirer...');
        const product = caddy[btn.dataset.id]
        product.quantity--

        //si la quantite due produit est egal a 0, on doit eliminer ce chariot
        if (product.quantity === 0) {
            delete caddy[btn.dataset.id]
        } 
        //sinon, je dois faire apparaitre la quantite des autres produits
        else {
            caddy[btn.dataset.id] = {...product}
        }
        showCaddy()
    });
})

};

/*  en version reduite
const btnMoreLess = e => {
    
    //console.log(e.target.classList.contains('btn-info'))
    if (e.target.classList.contains('btn-info')) {
        const product = caddy[e.target.dataset.id]
        product.quantity++
        caddy[e.target.dataset.id] = { ...product }
        showCaddy()
    }

    if (e.target.classList.contains('btn-danger')) {
        const product = caddy[e.target.dataset.id]
        product.quantity--
        if (product.quantity === 0) {
            delete caddy[e.target.dataset.id]
        } else {
            caddy[e.target.dataset.id] = {...product}
        }
        showCaddy()
    }
    e.stopPropagation()
}