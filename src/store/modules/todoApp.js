const storage = {
    fetch() {
        const arr = [];
        for (let i = 0; i < localStorage.length; ++i) {
            if (localStorage.key(i) !== 'loglevel:webpack-dev-server')
                arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
        return arr;
    },
};

const state = {
    headerText: 'To do It!!',
    todoItems: storage.fetch(),
};

const getters = {
    getTodoItem(state) {
        return state.todoItems;
    },
    getHeaderText(state) {
        return state.headerText;
    }
};

const mutations = {
    addOneItem(state, todoItem) {
        for (let i = 0; i < state.todoItems.length; ++i) {
            if (state.todoItems[i].item === todoItem)
                return ;
        }
        const obj = {
            completed: false,
            item: todoItem
        };
        localStorage.setItem(todoItem, JSON.stringify(obj));
        state.todoItems.push(obj);
    },
    removeOneItem(state, payload) {
        localStorage.removeItem(payload.todoItem.item);
        state.todoItems.splice(payload.index, 1);
    },
    toggleOneItem(state, payload) {
        state.todoItems[payload.index].completed = !state.todoItems[payload.index].completed;
        localStorage.setItem(payload.todoItem.item, JSON.stringify(state.todoItems[payload.index]));
    },
    clearAllItems(state) {
        localStorage.clear();
        state.todoItems = [];
    }
};

export default {
    state,
    getters,
    mutations,
}
