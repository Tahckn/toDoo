<template>
  <div class="to-doo">
    <div class="title has-text-centered">To Doo</div>

    <form @submit.prevent="addTodo">
      <div class="field is-grouped mb-5">
        <div class="control is-expanded">
          <input
            v-model="newTodoContent"
            class="input"
            type="text"
            placeholder="Add a todoo"
          />
        </div>
        <div class="control">
          <button :disabled="!newTodoContent" class="button is-info">
            Add
          </button>
        </div>
      </div>
    </form>

    <div
      v-for="todo in todos"
      class="card mb-5"
      :class="{ 'has-background-success-light': todo.done }"
    >
      <div class="card-content">
        <div class="content">
          <div class="columns is-mobile is-vcentered">
            <div
              class="column"
              :class="{ 'has-text-success line-through': todo.done }"
            >
              {{ todo.content }}
            </div>
            <div class="column is-5 has-text-right">
              <button
                @click="toggleDone(todo.id)"
                class="button"
                :class="todo.done ? 'is-success' : 'is-ligth'"
              >
                &check;
              </button>
              <button
                @click="deleteTodo(todo.id)"
                class="button is-danger ml-2"
              >
                &cross;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import {
  collection,
  onSnapshot,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '@/firebase';

const todosCollection = collection(db, 'todos');
const todosQuery = query(todosCollection, orderBy('date', 'desc'));

const todos = ref([]);

onMounted(async () => {
  onSnapshot(todosQuery, (querySnapshot) => {
    const localTodos = [];
    querySnapshot.forEach((doc) => {
      const todo = {
        id: doc.id,
        content: doc.data().content,
        done: doc.data().done,
      };
      localTodos.push(todo);
    });
    todos.value = localTodos;
  });
});

const newTodoContent = ref('');

const addTodo = () => {
  addDoc(todosCollection, {
    content: newTodoContent.value,
    done: false,
    date: Date.now(),
  });
  newTodoContent.value = '';
};

const deleteTodo = (id) => {
  deleteDoc(doc(todosCollection, id));
};

const toggleDone = (id) => {
  const index = todos.value.findIndex((todo) => todo.id === id);

  updateDoc(doc(todosCollection, id), {
    done: !todos.value[index].done,
  });
};
</script>

<style>
@import 'bulma/css/bulma.min.css';
* {
  transition: all 0.4s;
}
body {
  background: #eff0ec;
  height: 100vh;
}
.to-doo {
  max-width: 400px;
  padding: 20px;
  margin: 0 auto;
}

.line-through {
  text-decoration: line-through;
}
</style>
