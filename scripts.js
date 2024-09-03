// import { sportsNews } from './functions/sportsNews.js';


const button = document.getElementById('myButton');

// define the function to change the HTML content

function myFunction() {
    var x = document.getElementById("myTopnav");
    var toggle = document.getElementById("navControl");
    if (x.className === "topnav") {
        x.className += " responsive";
        toggle.innerHTML = '&#x2715;'
    } else {
        x.className = "topnav";
        toggle.innerHTML = '&#9776;'
    }
}


// document.addEventListener('DOMContentLoaded', function () {

// window.onscroll = function () { myFunction() };

// var navbar = document.querySelector("nav");
// var sticky = navbar.offsetTop;

// function myFunction() {
//     if (window.scrollY >= sticky) {
//         navbar.classList.add("sticky")
//     } else {
//         navbar.classList.remove("sticky");
//     }
// }
// })





function sportsNews(val) {

    myFunction()

    // const div = document.getElementById('myDiv');
    // div.innerHTML = `${val}News`;

    const div = document.getElementById('myDiv');
    var script = document.createElement('script');
    script.src = 'https://embeds.rss2html.net/embed.js?url=https%3A%2F%2Fespn.com/espn/rss/news'
    div.innerHTML = ''
    div.appendChild(script);

    const div2 = document.getElementById('myDiv2');
    var script2 = document.createElement('script');
    script2.src = 'https://embeds.rss2html.net/embed.js?url=https%3A%2F%2Fespn.com/espn/rss/news'
    div2.innerHTML = ''
    div2.appendChild(script2);

    const div3 = document.getElementById('myDiv3');
    var script3 = document.createElement('script');
    script3.src = 'https://embeds.rss2html.net/embed.js?url=https%3A%2F%2Fespn.com/espn/rss/news'
    div3.innerHTML = ''
    div3.appendChild(script3);


    const subNavSection = document.getElementById('subNavSection');
    subNavSection.innerHTML = ''
    var subNavButton = document.createElement('button');
    subNavButton.className = 'subButton'
    subNavButton.id = 'subButtonUS';
    subNavButton.value = 'subButtonUS';
    subNavButton.onclick = "worldNews()";
    subNavButton.innerHTML = 'World News';
    subNavSection.appendChild(subNavButton);


}

function nbaNews(val) {

    myFunction()

}


function worldNews(val) {

    // const div = document.getElementById('myDiv');
    // div.innerHTML = `${val}News`;

    const div = document.getElementById('myDiv');
    const script = document.createElement('script');
    script.src = 'https://embeds.rss2html.net/embed.js?url=https%3A%2F%2Frss.nytimes.com%2Fservices%2Fxml%2Frss%2Fnyt%2FWorld.xml&embed_render_copy_link=0&embed_title_replacement=World+News&feed_title_fallback=New+York+Times&feed_render_image=0&feed_render_link=0&feed_title_link_open_new_tab=0&feed_render_description=0&item_count=10&item_render_body=0&item_published_label=&item_published_format=%25a+%25b+%25e&embed_tag=div+id%3D%22mainNews%22';
    div.innerHTML = ''
    div.appendChild(script);

    const div2 = document.getElementById('myDiv2');
    const script2 = document.createElement('script2');
    script2.src = 'https://embed.reddit.com/widgets.js';
    div2.innerHTML = `<blockquote class="reddit-embed-bq" data-embed-height="900">Posts from the <a
    href = "https://www.reddit.com/r/worldnews/" > worldnews</a > <br> community on Reddit</blockquote>`
    div2.appendChild(script2);
    document.getElementById('embed-container').className = 'flex flex-col h-[900px]';

    const div3 = document.getElementById('myDiv3');
    const script3 = document.createElement('script');
    script3.src = 'https://embeds.rss2html.net/embed.js?url=https%3A%2F%2Frss.nytimes.com%2Fservices%2Fxml%2Frss%2Fnyt%2FWorld.xml&embed_render_copy_link=0&embed_title_replacement=World+News&feed_title_fallback=New+York+Times&feed_render_image=0&feed_render_link=0&feed_title_link_open_new_tab=0&feed_render_description=0&item_count=10&item_render_body=0&item_published_label=&item_published_format=%25a+%25b+%25e&embed_tag=div+id%3D%22mainNews%22';
    div3.innerHTML = ''
    div3.appendChild(script3);


    const subNavSection = document.getElementById('subNavSection');
    subNavSection.innerHTML = ''
    var subNavButton = document.createElement('button');
    subNavButton.className = 'subButton'
    subNavButton.id = 'subButtonUS';
    subNavButton.value = 'subButtonUS';
    subNavButton.onclick = "sportsNews()";
    subNavButton.innerHTML = 'Sports News';
    subNavSection.appendChild(subNavButton);
}



// document.getElementById('myDiv').addEventListener("DOMContentLoaded", (event) => {
//     document.getElementById('sportsNews').innerHTML = 'poop'
// });


// function sportsNews() {
//     document.getElementById('sportsNews').innerHTML = 'poop'
// }



// const div = document.getElementById('myDiv'); 
// var script = document.createElement('script');
// script.innerHTML = '<script src="https://embeds.rss2html.net/embed.js?url=https%3A%2F%2Frss.nytimes.com%2Fservices%2Fxml%2Frss%2Fnyt%2FWorld.xml"></script>';
// div.appendChild(script);
