const listContainer = document.querySelector('.list-container');
const itemsContainer = document.querySelector('.list-container');

export default class ToDoCollection {
  static tasks = [];

  static createTask = (task) => {
    const objTasks = {
      description: task,
      completed: false,
      index: this.tasks.length + 1,
    };
    this.tasks.push(objTasks);
    return objTasks;
  };

  static showTasks = () => {
    listContainer.innerHTML = '';
    ToDoCollection.tasks = JSON.parse(localStorage.getItem('tasks'));
    if (!ToDoCollection.tasks) {
      ToDoCollection.tasks = [];
    } else {
      ToDoCollection.tasks.forEach((element) => {
        const items = document.createElement('li');
        items.classList.add('item-list');
        items.id = element.index - 1;
        items.innerHTML = `
          <input type="checkbox" class="check">        
          <p class="label" contenteditable="true">${element.description}</p>
          <box-icon class="icon" name='dots-vertical-rounded'></box-icon>
          <box-icon class="trash-icon d-none" name='trash'></box-icon>`;
        itemsContainer.appendChild(items);
      });
    }
  };

  static deleteTask = (del) => {
    let indexArray;
    ToDoCollection.tasks.forEach((element, index) => {
      if (element.description === del) {
        indexArray = index;
      }
    });
    ToDoCollection.tasks.splice(indexArray, 1);
    ToDoCollection.setLocalStorage();
    window.location.reload();
  };

  static setLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(ToDoCollection.tasks));
  };
}
