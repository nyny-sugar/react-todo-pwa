import React, { useState, useEffect, useContext } from "react";
import * as Api from "../service/api";
import { signInWithGoogle } from "../service/firebase";
import dig from 'object-dig';
import { AuthContext } from "../providers/AuthProvider";

const ToDoList = (props) => {
  const deleteHandle = (id) => {
    Api.todoDelete(id);
    props.fetch();
  }

  const todoList = props.todos.map((todo) => {
    return (
      <li key={todo.id}>{todo.content}<button type="button" onClick={() => deleteHandle(todo.id)}>削除</button></li>
    );
  });
  return (
    <div>
      <h2>あなたのToDo</h2>
      <ul>{todoList}</ul>
    </div>
  )
}

export default ToDoList;
