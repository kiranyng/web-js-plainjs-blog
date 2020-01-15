# web-es6-blog
Simple web app with bare minimum framework, ui and rest-calls

## Browsers tested:
Chrome

## Libraries used:
**JQuery v3.3.1**
- For easy dom-querying and event handling.
  
**Handlebars v4.0.11**
- For templetization

## Source files:
### HTML:
> blog.html
- only html file in this single page application. Holds the actual markup and the templates of the dynamic UI

### CSS:
> styles.css
- conatins the styles of the application
theme.css
- contains the styles related to colors and themes of the application

### JS:
> router.js
- Core script file that takes care of routing to the right presenter based on the location hash. 
Takes care of some generic task like loading the model and saving the model based on the route configuration.
Also takes care of form submission and does the configured operation on the model(operation can be configured on the form tag using data-submit-type attribute).

> service.js
- Communicates with the server using the provided API and returns the server response

> model_article.js
- Model for the Blog-post json data returned by the server. Triggers service calls inorder to load and save the model in/from the server.

> model_articles_list.js
- Model for the Blog-posts list json data returned by the server. Triggers service calls inorder to load the model from the server.

> views/view.js
- Base class for the views. contains logic for databinding with the model and processing the tempalte and rendering in the target element.

> views/list_article.js
- View class to render UI to list the Articles

> views/edit_article.js
- View class to render UI to Create/Edit an Article

> view/delete_article.js
- View class to render UI to show delete confirmation of an Article

> observe.js
- Contains Observer, Observable simple utility classes, used for data binding between the model and the view

> main.js
- The main file that contains the router confiturations and route handlers