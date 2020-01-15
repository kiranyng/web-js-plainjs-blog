import { Observer } from "../core/observe.js"

/**
 * Base View class that expects targetEl, model and template and can render the UI in the DOM
 * - can also bind and process events
 * - can also bind with model for two way data binding etc.,
 */
export class View {
    observer = new Observer();
    isRendered = false;

    targetEl = null;
    model = null;
    template = null;
    onRender = () => {};
    events = null;

    onChange = null;

    init(){
        if(this && this.targetEl && this.model && this.template){
            this.model.addObserver(this.observer);
            
            if(this.onChange){
                this.observer.onChange = config.onChange;
            } else {
                this.observer.onChange = () => {
                    this.render();
                };
            }

            if(!this.observer.onError){
                this.observer.onError = function(msg){
                    console.error("Error with view model", msg);
                }
            }
        }else{
          throw new Error("Invalid configurations of the View");
        }
    }

    render(){
        try{
            // read targetEl, data and templateData to render automatically, instead of child overriding it
            var source = document.getElementById(this.template).innerHTML; // assuming template is the template-id - not template element
            var template = Handlebars.compile(source);

            this.targetEl.innerHTML = template(this.model);
        } catch(e){
            throw new Error("improper view, not all necessary core properties are initialized:"+e.msg);
        }

        if(this.events){
            for (let key in this.events){
              console.log(`${key} : ${this.events[key]}`);

              if(key == 'form submit'){
                  $('form', this.targetEl).on('submit', this.events[key]);
              }else{
                  console.warn('ignoring event for now TODO');
              }
            }
        }

        if(this.isRendered == false){
            this.isRendered = true;

            this.onRender();
        }
    }

    destroy(){
      this.model.removeObserver(this.observer);
    }
}