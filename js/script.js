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
    
    const links = document.querySelectorAll(`${optTitleListSelector} a`);    
    for(let link of links){
        link.addEventListener('click', titleClickHandler);
    }
}