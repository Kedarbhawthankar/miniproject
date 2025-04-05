const API_KEY="f53b4a5babb24f3896e1c4fa6d2beb95";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener("load",()=> fetchNews("Technology"));

async function fetchNews(query) {
    const res=await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data=await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardContainer=document.getElementById("cardscontainer");
    const newsCardTemplate=document.querySelector("#template-news-card");

    cardContainer.innerHTML="";

    articles.forEach((articles)=> {
        if(!articles.urlToImage) return;

        const cardClone =newsCardTemplate.content.cloneNode(true);
        filldataInCard(cardClone, articles);
        cardscontainer.appendChild(cardClone);
    })
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = `${article.title.slice(0, 60)}...`;
    newsDesc.innerHTML = `${article.description.slice(0, 150)}...`;

    const date = new Date(article.publishedAt).toLocaleString("en-US", { timeZone: "Asia/Jakarta" })

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    })

}