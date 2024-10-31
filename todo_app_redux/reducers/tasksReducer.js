// reducers/tasksReducer.js

const tasksReducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_TASKS_SUCCESS':
            return action.payload;
        case 'ADD_TASK':
            return [...state, action.payload];
        case 'UPDATE_TASK':
            return state.map(task =>
                task.id === action.payload.id ? action.payload : task
            );
        case 'DELETE_TASK':
            return state.filter(task => task.id !== action.payload);
        default:
            return state;
    }
};

export default tasksReducer;
