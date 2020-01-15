import { router as Router } from './core/router.js'
import { ArticleModel } from './models/model_article.js'
import { ArticleListModel } from './models/model_articles_list.js'
import { ListArticlesView } from './views/list_articles.js';
import { ViewArticleView } from './views/view_article.js';
import { EditArticleView } from './views/edit_article.js';
import { DeleteArticleView } from './views/delete_article.js';
import { BlogPresenter } from './presenters/blog_presenter.js';

/**
 * Core responsibility is to 
 *  - register routes 
 *  - process the data and initiate the View
 */
Router.register({
    'home': {
        default: true,
        modelClass: ArticleListModel,
        render: new BlogPresenter().home,
        // viewClass: ListArticlesView
    },
    'new/article': {
        modelClass: ArticleModel,
        // render: blogPresenter.createPost,
        viewClass: EditArticleView
    },
    'view/article/{id}': {
        modelClass: ArticleModel,
        // render: blogPresenter.viewPost,
        viewClass: ViewArticleView
    },
    'edit/article/{id}': {
        modelClass: ArticleModel,
        // render: blogPresenter.editPost,
        viewClass: EditArticleView
    },
    'delete/article/{id}': {
        modelClass: ArticleModel,
        // render: blogPresenter.deletePost,
        viewClass: DeleteArticleView
    }
});

Router.goTo('home');