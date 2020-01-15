/**
 * Self intutive basic Observable and Obsever classes
 */

export class Observable {
    observers = new Set();

    triggerChange(data){
        this.observers.forEach((observer) => {
            if (observer.onChange && typeof observer.onChange === 'function' && !observer.pauseObserving) {
                observer.onChange(data);
            }
        });
    }

    // Might cause some late-and-stale updates because of data getting changed again even before the prev change event processed on the observers
    triggerChangeAsync(data){
        this.observers.forEach((observer) => {
            setTimeout(() => {
                if (observer.onChange && typeof observer.onChange === 'function' && !observer.pauseObserving) {
                    observer.onChange(data);
                }
            }, 0);
        });
    }

    triggerError(err){
        this.observers.forEach((observer) => {
            setTimeout(() => {
                if (observer.onError && typeof observer.onError === 'function' && !observer.pauseObserving) {
                    observer.onError(err);
                }
            }, 0);
        });
    }

    addObserver(observer){
        if (observer && observer instanceof Observer) {
            this.observers.add(observer);
        } else {
            throw new Error("invalid observer, parameter must be an instance of sf.utils.Observer");
        }
    }

    removeObserver(observer){
        if (observer && this.observers.has(observer)) {
            this.observers.delete(observer);
        } else {
            console.warn("Cannot remove Observer, not in the list!");
        }
    }

    destroy(){
        this.observers = null;
    }
}

export class Observer {
    pauseObserving = false;

    onChange(data){
        console.log('change triggered!');
    }

    onError(e){
        console.log('observer error', e);
    }
}