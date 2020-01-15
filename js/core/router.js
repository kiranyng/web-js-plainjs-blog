/**
 * Listens to hashchange, form-submit, reload etc. events and do approproate presentation changes
 */
class Router {
    currentRoute = '/';
    routes = new Map();

    constructor(){
        // Listend to hashchange event
        window.addEventListener("hashchange", async (event) => {
            let tokens = location.hash.substr(1).split("/");

            // iterate over all the configured routes
            for (let [key, route] of this.routes) {
                console.log(key + " : ", route);

                let routeTokens = key.split("/");
                if(tokens.length == routeTokens.length){
                    let paramValues = {};
                    let tokensClone = JSON.parse(JSON.stringify(tokens));

                    // read url params and assign to paramValues map
                    if(route.params && route.params.length > 0){
                        route.params.forEach((item, index) => {
                            paramValues[item.key] = tokensClone[item.index];
                            tokensClone[item.index] = `{${item.key}}`;
                        });
                    }

                    // compare the url with the route configuration
                    if(tokensClone.join('/') == routeTokens.join('/')){
                        // matched!!
                        console.log("Matched:>"+ key + " : " , route);
                        // process presentation
                        let model = null;
                        let data = null;

                        // if a modelClass is configured, instantiate it and do load opertation on it
                        if(route.modelClass) {
                            route.model = new route.modelClass();

                            model = route.model;

                            await route.model.load(paramValues);
                        } else {
                            model = data;
                        }

                        if(route.viewClass){
                            const view = new route.viewClass(model);

                            // on render
                            view.onRender = () => {
                                console.info("Rendered route(@router):", route);
                            }

                            view.render();
                        }else{
                            // render the route with model and paramvalues passed to the actual presenter
                            route.render(model, paramValues);
                        }

                        // save current route to local property to refer it in other routing handlers
                        this.currentRoute = route;

                        // mark as done
                        return true;
                    }
                }
            }

            // routeing failed to match any preconfigured routes.
            event.preventDefault(); // or show some message on the screen TODO call this.show404() method

            // do not update the location in the URL
            return false;
        });
        
        
        // Inorder to handle form submisions and other misc handlers
        $(document).ready(() => {
            let thisRouter = this;

            // Listen to form submit event - and process model.save(), model.delete() or other configured submit-type operation on the FORM element
            $("body").on('submit', 'form', async (ev) => {
                // cancel acutal form submission
                ev.preventDefault();

                // get the form data
                const formData = new FormData(ev.target);
                let retrievedData = {};      

                // retrieve the form data as a json object
                const data = formData.entries();              
                let obj = data.next();       
                while(undefined !== obj.value) {    
                    retrievedData[obj.value[0]] = obj.value[1];
                    obj = data.next();
                }
                console.log('retrieved: ',retrievedData);

                // call populate on the route model
                this.currentRoute.model.populate(retrievedData);

                // get data and do corresponding service call
                const formSubmitTypeAttr = ev.target.getAttribute('data-submit-type');
                const formSubmitType = formSubmitTypeAttr?formSubmitTypeAttr:'save';
                const resp = await this.currentRoute.model[formSubmitType]();
                this.currentRoute.model.destroy();

                console.info("form submission resp", resp);

                // redirect to the configured FORM action path
                location.href = "#"+ev.target.getAttribute("action");
                // thisRouter.gotTo("new/article");  //'/#'+this.currentRoute.submit;

                return false;
            });
        });
    }

    // method to register a route to the Router
    register(routesMap = new Map()){
        if(!(routesMap instanceof Map)){
            routesMap = new Map(Object.entries(routesMap));
        }

        // if obj, append to existing this.routes map
        if(routesMap.size > 0){
            for (let [key, route] of routesMap) {
                route.params = [];

                // identify the parameter-name and parameter index in the path-token and add it to the route object ie., {key: xxx, index: yyy}
                let tokens = key.split('/');
                tokens.forEach((item, index) => {
                    const match = item.match(/{(\w*)}/);

                    if(match){
                        route.params.push({
                            key: match[1],
                            index
                        });
                    }
                });

                // add route to routes map
                this.routes.set(key, route);
            }
        } else {
            console.warn("routes not registered:", routesMap);
        }
    }

    goTo(path = 'home'){
        location.href = `#${path}`;
    }

    show404(){
        // TODO
    }

    reload(){
        window.reload();
    }

    forward(){
        window.forward();
    }

    backward(){
        window.backward();
    }
}

export let router = new Router();