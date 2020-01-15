import { Observable } from '../core/observe.js';
import { service as Service } from '../services/service.js';

export class ArticleListModel {
    list = [];
    enableCache = false; // TODO

    observable = new Observable();

    // SETTERS & GETTERS - Services
    populate(data){
        // TODO VALIDATE

        this.list = data;

        this.observable.triggerChange();
    }

    async load(){
        let resp = await Service.getAll();

        this.populate(resp);

        return resp;
    }

    async save(){
        // nothing to do here
    }

    async delete(){
        let resp = await Service.deleteAll();

        this.populate(resp);

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