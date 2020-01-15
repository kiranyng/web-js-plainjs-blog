import { View } from './view.js';
/**
 * Articles Create/Edit-View
 */
export class EditArticleView extends View{
    constructor(articleModel){
        super();

        this.template = "edit-post-template";
        this.targetEl = $('.main-view-content').get(0);
        this.model = articleModel;

        this.init();
    }
}