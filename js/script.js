{
    //options

    const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles';

    
    const titleClickHandler = function(event){    
        event.preventDefault();
        const clickedElement = this;

        /* [DONE] remove class 'active' from all article links  */
        
        const activeLinks = document.querySelectorAll(`${optTitleListSelector} a.active`);
        for(let activeLink of activeLinks){
            activeLink.classList.remove('active');
        }

        /* [DONE] add class 'active' to the clicked link */
        
        clickedElement.classList.add("active");
    
        /* [DONE] remove class 'active' from all articles */

        const activeArticles = document.querySelectorAll(`${optArticleSelector}.active`);
        for(let activeArticle of activeArticles){
            activeArticle.classList.remove('active');
        }
    
        /* get 'href' attribute from the clicked link */

        const idSelector = clickedElement.getAttribute("href");

        /* find the correct article using the selector (value of 'href' attribute) */

        const pickedPost = document.querySelector(idSelector);
        
        /* add class 'active' to the correct article */

        pickedPost.classList.add("active");
        console.log(pickedPost);
    }
       
    //generate links with article titles

    function generateTitleLinks(){        
        
        /* remove contents of titleList */
        const titleList = document.querySelector(optTitleListSelector);
        titleList.innerHTML = "";

        /* for each article */
        const articles = document.querySelectorAll(optArticleSelector);
        for (const article of articles){
          /* get the article id */
            const articleId = article.id; 

          /* find the title element */
            const titleElement = article.querySelector(optTitleSelector);   
          /* get the title from the title element */
            const articleTitle = titleElement.textContent;
      
          /* create HTML of the link */
            const liElement = document.createElement("li");
            liElement.innerHTML = `<a href="#${articleId}"><span>${articleTitle}</span></a>`;
      
          /* insert link into titleList */
            titleList.append(liElement);
        }

        //adding listeners to generated links
        const links = document.querySelectorAll(`${optTitleListSelector} a`);    
        for(let link of links){
            link.addEventListener('click', titleClickHandler);
        }
        
    }
      
    generateTitleLinks();    
}