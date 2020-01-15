import { View } from './view.js';

/**
 * Articles List-View
 */
export class ListArticlesView extends View{
    constructor(model){
        super();

        this.template = "list-posts-template";
        this.targetEl = $('.main-view-content').get(0);
        this.model = model;
        /*
        this.events = {
            'button view': function(ev){
                var postId = $(ev.target).data('id');
        
                Router.goTo("view/article/"+postId);
            },
            'button edit': function(ev){
                var postId = $(ev.target).data('id');
        
                Router.goTo("edit/article/"+postId);
            },
            'button delete': function(ev){
                var postId = $(ev.target).data('id');
        
                Router.goTo("delete/article/"+postId);
            }
        }*/

        this.init();
    }
}