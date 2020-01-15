/**
 * Class that does the acutal server calls using the fetch API
 * 
 */
class ArticlesService {
    ENDPOINT = "REPLACE WITH YOUR API ENDPOINT ROOT URL"; 
    
    async getAll() {
        return await this.doRequest('');
    }

    async getPost(postData) {
        return await this.doRequest(`${postData.id}`);
    }

    async newPost(postData){
        // TODO validate postData using model_post -> BlogPost model


        let options = {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(postData)
        }

        return await this.doRequest('', options);
    }

    async updatePost(postData) {
        // TODO validate postData using model_post -> BlogPost model

        let options = {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(postData)
        }

        return await this.doRequest(`${postData.id}`, options);
    }

    async deletePost(postData) {
        // TODO validate postData.id presense

        let options = {
            method: 'DELETE'
        }

        return await this.doRequest(`${postData.id}`, options);
    }

    async deleteAll(){
        let options = {
            method: 'DELETE'
        }

        return await this.doRequest('', options);
    }

    // helpers
    async doRequest(uri, options){
        try {
            let response = await fetch(`${this.ENDPOINT}${uri}`, options);
            let responseData = await this.processResponse(response);

            console.log("fetch response data:", responseData);

            return responseData;
        } catch(e) {
            console.error("Service failed:", e.message);

            return {
                type: 'error',
                message: e.message
            }
        }
    }

    async processResponse(response){
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          return await response.json();
        } else {
          return await response.text();
        }
    }
}

export let service = new ArticlesService();