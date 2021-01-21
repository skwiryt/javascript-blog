{
  /**/
  /**/
  // Two ways to address style problems with airbnb are shown in this file.
  // Look for comments like this.
  /**/
  /**/
  // options
  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    authorListLink: Handlebars.compile(document.querySelector('#template-author-list-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  };
  const opts = {
    cloudClassCount: 5,
    cloudClassPrefix: 'tag-size-',
  };
  const select = {
    articles: '.post',
    linksTo: {
      tags: 'a[href^="#tag"]',
      authors: 'a[href^="#author"]',
    },
    articleTitles: '.post-title',
    articleAuthors: '.post-author',
    articleTagLists: '.post-tags .list',
    tagList: '.tags.list',
    authorList: '.authors.list',
    titleList: '.titles',
  };
  /**/
  /**/
  // First dealing with eslint. Use additional name of function in function expression.
  /**/
  /**/
  const titleClickHandler = function titleClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll(`${select.titleList} a.active`);
    activeLinks.forEach((activeLink) => {
      activeLink.classList.remove('active');
    });

    /* [DONE] add class 'active' to the clicked link */
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll(`${select.articles}.active`);
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
  const generateTitleLinks = (customSelector = '') => {
    /* remove contents of titleList */
    const titleList = document.querySelector(select.titleList);
    titleList.innerHTML = '';
    /* for each article */
    const articles = document.querySelectorAll(select.articles + customSelector);
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
      const titleElement = article.querySelector(select.articleTitles);
      /* get the title from the title element */
      const articleTitle = titleElement.textContent;

      /* create HTML of the link */
      const liElement = document.createElement('li');
      const linkHTMLData = { id: articleId, title: articleTitle };
      liElement.innerHTML = templates.articleLink(linkHTMLData);
      /* insert link into titleList */
      titleList.append(liElement);
    }

    // adding listeners to generated links
    const links = document.querySelectorAll(`${select.titleList} a`);
    links.forEach((link) => {
      link.addEventListener('click', titleClickHandler);
    });
  };
  generateTitleLinks();
  const calculateTagsParams = function calculateTagsParams(tags) {
    const min = Object.values(tags).reduce((a, c) => Math.min(a, c));
    const max = Object.values(tags).reduce((a, c) => Math.max(a, c));
    return { min, max };
  };
  const calculateTagClass = function calculateTagClass(count, params) {
    const span = (params.max - params.min) / opts.cloudClassCount;
    const triggers = [...Array(opts.cloudClassCount - 1)]
      .map((e, i) => (params.min + (i + 1) * span));
    let classNb = 1;
    triggers.forEach((trigger) => {
      if (count >= trigger) {
        classNb += 1;
      }
    });
    return `${opts.cloudClassPrefix}${classNb}`;
  };
  const generateTags = function generateTags() {
    /* [NEW] create a new variable allTags with an empty object */
    const allTags = {};
    /* find all articles */
    const articles = document.querySelectorAll(select.articles);
    /* START LOOP: for every article: */
    articles.forEach((article) => {
    /* find tags wrapper */
      const tagList = article.querySelector(select.articleTagLists);
      tagList.innerHTML = '';
      /* make html variable with empty string */
      let articleHtml = '';
      /* get tags from data-tags attribute */
      const tagsString = article.getAttribute('data-tags');
      /* split tags into array */
      const tagsArray = tagsString.split(' ');
      /* START LOOP: for each tag */
      tagsArray.forEach((tag) => {
      /* generate HTML of the link */
        const tagHtmlData = { id: `tag-${tag}`, title: tag };
        const tagHtml = templates.articleLink(tagHtmlData);
        /* add generated code to html variable */
        articleHtml += tagHtml;
        /* add to allTags if unique and count */
        if (!allTags[tag]) {
          allTags[tag] = 1;
        } else {
          allTags[tag] += 1;
        }
      /* END LOOP: for each tag */
      });
      /* insert HTML of all the links into the tags wrapper */
      tagList.innerHTML = articleHtml;
    /* END LOOP: for every article: */
    });
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(select.tagList);
    const tagsParams = calculateTagsParams(allTags);
    /* [NEW] create variable for all links HTML code */
    const allTagsData = { tags: [] };
    /* [NEW] START LOOP: for each tag in allTags: */
    // eslint-disable-next-line no-restricted-syntax
    for (const tag in allTags) {
      /* [NEW] generate code of a link and add it to allTagsHTML */
      if (Object.prototype.hasOwnProperty.call(allTags, tag)) {
        allTagsData.tags.push(
          {
            tag,
            count: allTags[tag],
            className: calculateTagClass(allTags[tag], tagsParams),
          },
        );
      }
    }
    /* [NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
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
    const links = document.querySelectorAll(select.linksTo.tags);
    /* START LOOP: for each link */
    links.forEach((link) => {
      /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
    });
  };
  addClickListenersToTags();
  const generateAuthors = function generateAuthors() {
    const allAuthors = {};
    const articleElements = document.querySelectorAll(select.articles);
    articleElements.forEach((element) => {
      const author = element.getAttribute('data-author');
      const authorWrapper = element.querySelector(select.articleAuthors);
      const authorHtmlData = { id: 'author', title: author };
      authorWrapper.innerHTML = templates.authorLink(authorHtmlData);
      /* add to allAuthors if unique and count */
      if (!allAuthors[author]) {
        allAuthors[author] = 1;
      } else {
        allAuthors[author] += 1;
      }
    });
    const authorList = document.querySelector(select.authorList);
    authorList.innerHTML = '';
    const allAuthorsData = { authors: [] };
    Object.keys(allAuthors).forEach((author) => {
      allAuthorsData.authors.push(
        {
          author,
          count: allAuthors[author],
        },
      );
    });
    authorList.innerHTML = templates.authorListLink(allAuthorsData);
  };
  generateAuthors();
  const authorClickHandler = function authorClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;
    const authorLinksActive = document.querySelectorAll('a.active[href^="#author"]');
    authorLinksActive.forEach((link) => {
      link.classList.remove('active');
    });
    clickedElement.classList.add('active');
    const author = clickedElement.textContent.replace(/ \(\d+\)/g, '');
    generateTitleLinks(`[data-author="${author}"]`);
  };
  const addClickListenersToAuthors = function addClickHandlersToAuthors() {
    document.querySelectorAll(select.linksTo.authors).forEach((link) => {
      link.addEventListener('click', authorClickHandler);
    });
  };
  addClickListenersToAuthors();
}
