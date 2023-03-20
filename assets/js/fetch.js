/**
 * Represents a class for fetching data from a specified API URL.
 * @class
 */
class FetchData {
    
    /**
     * Constructs a new instance of the FetchData class.
     * @constructor
     * @param {string} apiUrl - The URL of the API to fetch data from.
     */
    constructor(apiUrl) {
        this.API_URL = apiUrl;
    }

    /**
     * Fetches data from the specified URI of the API.
     * @async
     * @param {string} uri - The URI of the API to fetch data from.
     * @param {number} [count=0] - Count for selection.
     * @param {number} [offset=0] - The starting index of the results to return.
     * @returns {Promise<any>} - A Promise that resolves with the fetched data.
     */
    async fetch(uri, count = 0, offset = 0) {
        try {
            const response = await fetch(`${this.API_URL}${uri}`);
            const data = await response.json();
            
            if (count) {
                const end = offset + count;
                return data.slice(offset, end);
            }
            
            return data;
        } catch (e) {
            console.log(e);
        }
    }
}