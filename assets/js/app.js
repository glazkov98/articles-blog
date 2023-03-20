/**
 * Represents a class for articles blog.
 * @class
 */
class ArticlesBlog {
    
    /**
     * Constructs a new instance of the ArticlesBlog class.
     * @param {string} selector - CSS selector.
     * @param {Object} options - Object with options.
     */
    constructor(selector, options) {
        if (!selector) return false;

        this.fetchData = new FetchData(options.apiUrl);
        this.COUNT_ON_PAGE = 10;
        this.rootApp = document.querySelector(selector);
        this.load();
        
        window.addEventListener('hashchange', () => this.load());
    }

    /**
     * Get page number.
     * @param {string} str - Page information in key=value format.
     * @returns {number} - Page number.
     */
    getPage(str) {
        const arr = str.split('=');        
        return Number(arr[1]);
    }

    /** Loading articles */
    async load() {
        const page = this.getPage(location.hash) || 1;
        const offset = (this.COUNT_ON_PAGE * page) - this.COUNT_ON_PAGE;
        const articles = await this.getArticles(this.COUNT_ON_PAGE, offset);
        const countArticles = (await this.getAll()).length;
        this.renderArticles(articles);
        const pagination = new Pagination(countArticles, page, this.COUNT_ON_PAGE);
        this.renderPagination(pagination.generatePagination());
    }

    /**
     * Get articles for count and offset.
     * @param {number} count - Count for selection.
     * @param {number} offset - The starting index of the results to return.
     * @returns {Promise<any>} - A Promise that resolves with the fetched data.
     */
    async getArticles(count, offset) {
        return this.fetchData.fetch('/posts', count, offset);
    }

    /**
     * Get all posts.
     * @returns {Promise<any>} - A Promise that resolves with the fetched data.
     */
    async getAll() {
        return this.fetchData.fetch('/posts');
    }

    /**
     * Render all articles.
     * @param {Array} articles - Array of articles.
     */
    renderArticles(articles) {
        if (!articles) return false;
    
        this.rootApp.innerHTML = '';
        let html = '<div class="articles">';
        articles.forEach(article => {
            html += `
                <article class="article-item">
                    <h2 class="article-title">${article.title}</h2>
                    <p class="article-text">${article.body}</p>
                </article>
            `;
        });
        html += '</div>';
    
        this.rootApp.insertAdjacentHTML('afterbegin', html);
    }

    /**
     * Render pagination.
     * @param {string} pagination - HTML pagination code. 
     */
    renderPagination(pagination) {
        if (!pagination) return false;

        this.rootApp.insertAdjacentHTML('beforeend', pagination);
    }
}

new ArticlesBlog('#app', {
    apiUrl: 'https://jsonplaceholder.typicode.com'
});