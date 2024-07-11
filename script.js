const API_KEY = "ed2678ec6095461bbf0a4649401c2aca";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', ()=> fetchNews("India"));

function reload(){
    window.location.reload();
}

const fetchNews = async (query) => {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles){
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card")

    cardsContainer.innerHTML = '';

    articles.forEach(article => {
        if(!article.urlToImage) 
            return;

        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article)
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard (cardClone,article){
    const newsImg = cardClone.querySelector('#news-image');
    
    const newsTitle = cardClone.querySelector('#news-title');
    
    const newsSource = cardClone.querySelector('#news-source');
    
    const newsDes = cardClone.querySelector('#news-des');


    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDes.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-Us", {
        timeZone:"Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener('click', ()=>{
        window.open(article.url,"_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');

}

const searchText = document.getElementById('search-text');
const searchButton = document.getElementById('search-button');

searchButton.addEventListener('click', ()=>{
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
});
