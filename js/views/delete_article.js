import { View } from './view.js';
import { ArticleModel } from '../models/model_article.js';
/**
 * Articles Delete-View
 */
export class DeleteArticleView extends View{
    constructor(){
        super();

        this.template = "delete-post-template";
        this.targetEl = $('.main-view-content').get(0);
        this.model = new ArticleModel();

        this.init();
    }
}