import { ListArticlesView } from '../views/list_articles.js';

export class BlogPresenter {
    constructor(){
    }

    async home(listModel, params) {
        console.log('from home presenter - data:', listModel);

        const view = new ListArticlesView(listModel);

        // on render
        view.onRender = () => {
            console.info("Home view rendered!");
        }

        view.render();
    }

    // NOTE other presentations are also straight forward so auto rendered by the core based on route configurations
}