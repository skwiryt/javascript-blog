{
  /**/
  /**/
  // Two important ways to address style problems with airbnb are shown in this file.
  // Look for comments like this.
  /**/
  /**/
  // options
  const optArticleSelector = '.post';
  const optTitleSelector = '.post-title';
  const optTitleListSelector = '.titles';
  const optArticleTagsSelector = '.post-tags .list';
  /**/
  /**/
  // First dealing with eslint. Use additional name of function in function expression.
  /**/
  /**/
  const titleClickHandler = function titleClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;

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
  const generateTitleLinks = (customSelector = '') => {
    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    /**/
    /**/
    // Second method is simply to tell eslint to take a breake
    /**/
    /**/
    /* eslint-disable-next-line no-restricted-syntax */
    for (const article of articles) {
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
    }

    // adding listeners to generated links
    const links = document.querySelectorAll(`${optTitleListSelector} a`);
    links.forEach((link) => {
      link.addEventListener('click', titleClickHandler);
    });
  };
  generateTitleLinks();
  const generateTags = function generateTags() {
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
    articles.forEach((article) => {
    /* find tags wrapper */
      const tagList = article.querySelector(optArticleTagsSelector);
      tagList.innerHTML = '';
      /* make html variable with empty string */
      let articleHtml = '';
      /* get tags from data-tags attribute */
      const tagsString = article.getAttribute('data-tags');
      /* split tags into array */
      const tagsArray = tagsString.split(' ');
      /* START LOOP: for each tag */
      tagsArray.forEach((element) => {
      /* generate HTML of the link */
        const tagHtml = `<li><a href="#tag-${element}">${element}</a></li> `;
        /* add generated code to html variable */
        articleHtml += tagHtml;
      /* END LOOP: for each tag */
      });
      /* insert HTML of all the links into the tags wrapper */
      tagList.innerHTML = articleHtml;
    /* END LOOP: for every article: */
    });
  };
  generateTags();
  const tagClickHandler = function tagClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.substring(5);
    /* find all tag links with class active */
    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag"]');
    /* START LOOP: for each active tag link */
    activeTagLinks.forEach((link) => {
      /* remove class active */
      link.classList.remove('active');
    /* END LOOP: for each active tag link */
    });
    /* find all tag links with "href" attribute equal to the "href" constant */
    const clickedTagLinks = document.querySelectorAll(`a[href="${href}"]`);
    /* START LOOP: for each found tag link */
    clickedTagLinks.forEach((link) => {
      /* add class active */
      link.classList.add('active');
    /* END LOOP: for each found tag link */
    });
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks(`[data-tags~=${tag}`);
  };
  const addClickListenersToTags = function addClickListenersToTags() {
    /* find all links to tags */
    const links = document.querySelectorAll('a[href^="#tag"');
    /* START LOOP: for each link */
    links.forEach((link) => {
      /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
    });
  };
  addClickListenersToTags();
}
