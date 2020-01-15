import { View } from './view.js';

/**
 * Articles Preview-View
 */
export class ViewArticleView extends View{
    constructor(articleModel){
        super();

        this.template = "view-post-template";
        this.targetEl = $('.main-view-content').get(0);
        this.model = articleModel;

        this.init();
    }
}