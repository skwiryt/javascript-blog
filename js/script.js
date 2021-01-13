{
  // options
  const optArticleSelector = '.post';
  const optTitleSelector = '.post-title';
  const optTitleListSelector = '.titles';
  const titleClickHandler = (event) => {
    event.preventDefault();
    const clickedElement = event.target.parentElement;

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll(`${optTitleListSelector} a.active`);
    activeLinks.forEach((activeLink) => {
      activeLink.classList.remove('active');
    });

    /* [DONE] add class 'active' to the clicked link */
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll(`${optArticleSelector}.active`);
    activeArticles.forEach((activeArticle) => {
      activeArticle.classList.remove('active');
    });

    /* get 'href' attribute from the clicked link */
    const idSelector = clickedElement.getAttribute('href');

    /* find the correct article using the selector (value of 'href' attribute) */
    const pickedPost = document.querySelector(idSelector);

    /* add class 'active' to the correct article */
    pickedPost.classList.add('active');
  };
  // generate links with article titles
  const generateTitleLinks = () => {
    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector);
    articles.forEach((article) => {
      /* get the article id */
      const articleId = article.id;

      /* find the title element */
      const titleElement = article.querySelector(optTitleSelector);
      /* get the title from the title element */
      const articleTitle = titleElement.textContent;

      /* create HTML of the link */
      const liElement = document.createElement('li');
      liElement.innerHTML = `<a href="#${articleId}"><span>${articleTitle}</span></a>`;

      /* insert link into titleList */
      titleList.append(liElement);
    });

    // adding listeners to generated links
    const links = document.querySelectorAll(`${optTitleListSelector} a`);
    links.forEach((link) => {
      link.addEventListener('click', titleClickHandler);
    });
  };
  generateTitleLinks();
}
