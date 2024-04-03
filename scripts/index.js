class Activity {
    constructor (id, title, description, imgUrl){
        this.id = id;
        this.title = title;
        this.description = description;
        this.imgUrl = imgUrl;
    }
}

class Repository {
    constructor(){        this.activities = [];
        this.id = 0;
    }
    getAllActivities(){
        return this.activities;
    }
    createActivity(title, description, imgUrl) {
        this.id++;
        const activity = new Activity(this.id, title, description, imgUrl);
        this.activities.push(activity);
    }

    deleteActivity(id) {
        this.activities = this.activities.filter(activity => activity.id !== id);
        return this.activities;
    }
}

const repository = new Repository()

console.log(repository);

repository.createActivity('Estudiar', 'Crear habitos para aplicar lo aprendido', 'https://t1.uc.ltmcdn.com/es/posts/6/7/0/trucos_para_estudiar_mas_rapido_53076_orig.jpg')

console.log(repository.getAllActivities());