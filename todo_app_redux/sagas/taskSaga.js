// sagas/taskSaga.js

import { takeEvery, call, put } from 'redux-saga/effects';
import { FETCH_TASKS_REQUEST, ADD_TASK, UPDATE_TASK, DELETE_TASK, fetchTasksSuccess } from '../actions/taskActions';

const fetchTasksFromApi = async () => {
    const response = await fetch('https://670fdb9da85f4164ef2c393a.mockapi.io/job');
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
};

const addTaskToApi = async (task) => {
    const response = await fetch('https://670fdb9da85f4164ef2c393a.mockapi.io/job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
    });
    return response.json();
};

const updateTaskInApi = async (task) => {
    const response = await fetch(`https://670fdb9da85f4164ef2c393a.mockapi.io/job/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
    });
    return response.json();
};

const deleteTaskFromApi = async (id) => {
    await fetch(`https://670fdb9da85f4164ef2c393a.mockapi.io/job/${id}`, {
        method: 'DELETE',
    });
};

function* fetchTasks() {
    try {
        const tasks = yield call(fetchTasksFromApi);
        yield put(fetchTasksSuccess(tasks));
    } catch (error) {
        console.error('Fetch tasks failed', error);
    }
}

function* addTask(action) {
    try {
        const newTask = yield call(addTaskToApi, action.payload);
        yield put(fetchTasks()); // Fetch updated tasks
    } catch (error) {
        console.error('Add task failed', error);
    }
}

function* updateTask(action) {
    try {
        const updatedTask = yield call(updateTaskInApi, action.payload);
        yield put(fetchTasks()); // Fetch updated tasks
    } catch (error) {
        console.error('Update task failed', error);
    }
}

function* deleteTask(action) {
    try {
        yield call(deleteTaskFromApi, action.payload);
        yield put(fetchTasks()); // Fetch updated tasks
    } catch (error) {
        console.error('Delete task failed', error);
    }
}

export function* watchTaskActions() {
    yield takeEvery(FETCH_TASKS_REQUEST, fetchTasks);
    yield takeEvery(ADD_TASK, addTask);
    yield takeEvery(UPDATE_TASK, updateTask);
    yield takeEvery(DELETE_TASK, deleteTask);
}
