/**
 * Represents a class for pagination on page.
 * @class
 */
class Pagination {
    /**
     * Constructs a new instance of the Pagination class.
     * @constructor
     * @param {number} total - All count posts.
     * @param {number} page - Current page number.
     * @param {number} countOnPage - Count posts on page.
     */
    constructor(total, page, countOnPage) {
        this.total = total;
        this.page = page;
        this.count = countOnPage;
        this.COUNT_LINKS = 5;

        document.addEventListener('click', e => {
            const el = e.target;
            if (el.tagName == 'A' && el.className == 'page-link') {
                e.preventDefault();
                location.hash = el.getAttribute('href');
            }
        })
    }

    /**
     * Generate pagination method.
     * @returns {string} - Generated html pagination.
     */
    generatePagination() {
        const pages = Math.ceil(this.total / this.count);
        const countLinks = this.COUNT_LINKS;

        let page = this.page;
        if (this.page < 1) page = 1;
        else if (this.page > pages) page = pages;

        let pagination = '';
        if (pages > 1) {
            pagination = '<ul class="pagination">';
            if (page > 1) {
                if (page - 1 != 1) pagination += `<li class="page-item"><a class="page-link" href="#page=${(page - 1)}">&lt;</a></li>`;
                else pagination += '<li class="page-item"><a class="page-link" href="#page=1">&lt;</a></li>';
            }

            let start;
            let end;

            if (pages <= countLinks) {
                start = 1;
                end = pages;
            } else {
                start = page - Math.floor(countLinks / 2);
                end = page + Math.floor(countLinks / 2);

                if (start < 1) {
                    end += Math.abs(start) + 1;
                    start = 1;
                }

                if (end > pages) {
                    start -= (end - pages);
                    end = pages;
                }
            }

            for (let i = start; i <= end; i++) {
                if (i == page) pagination += `<li class="page-item active"><span class="page-link">${i}</span></li>`;
                else {
                    if (i === 1) pagination += `<li class="page-item"><a class="page-link" href="#page=1">${i}</a></li>`;
                    else pagination += `<li class="page-item"><a class="page-link" href="#page=${i}">${i}</a></li>`;
                }
            }

            if (page < pages) pagination += `<li class="page-item"><a class="page-link" href="#page=${(page + 1)}">&gt;</a></li>`;
            pagination += '</ul>';
        } else pagination = '';

        return pagination;
    }
    
}