import { Observable } from '../core/observe.js';
import { service as Service } from '../services/service.js';

/**
 * Articla data Model
 * - takes care of doing service calls to load/update/delete items
 * - implements/composed of Observable and triggers change even on all the observers when ever the model changes
 */
export class ArticleModel {
    id = '';

    title = '';
    title_error = null;

    text = '';
    text_error = null;

    timestamp = '';

    observable = new Observable();

    // TODO constructor

    // TODO validations

    // TODO SETTERS & GETTERS
    populate(data){
        this.id = data.id ? data.id : this.id;
        this.title = data.title ? data.title : this.title;
        this.text = data.text ? data.text : this.text;
        this.timestamp = data.timestamp ? new Date(data.timestamp) : this.timestamp;

        this.observable.triggerChange();
    }

    async load(param){
        if(!param || !param.id){
            return false;
        }

        let resp = await Service.getPost(param);

        this.populate(resp);

        // this.observable.triggerChange();
        return resp;
    }

    async save(){
        // TODO client validation
        // ..

        let resp = null;
        if(!this.id){
            resp = await Service.newPost(this);
        }else{
            resp = await Service.updatePost(this);
        }

        // TODO server resp validation
        // ..


        this.populate(resp);
        // this.observable.triggerChange();
        return resp;
    }

    async delete(){
        let resp = await Service.deletePost(this);

        return resp;
    }

    addObserver(observer){
        this.observable.addObserver(observer);
    }

    removeObserver(observer){
        this.observable.removeObserver(observer);
    }

    destroy(){
        this.observable.destroy();
    }
}