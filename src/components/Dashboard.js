import React, { useState, useEffect, useContext } from "react";
import * as Api from "../service/api";
import { signInWithGoogle } from "../service/firebase";
import dig from 'object-dig';
import { AuthContext } from "../providers/AuthProvider";
import ToDoList from "./ToDoList";

const Dashboard = () => {
  const currentUser = useContext(AuthContext);
  const [inputName, setInputName] = useState("");
  const [todos, setTodos] = useState([]);
  console.log(inputName);

  useEffect(() => {
    fetch();
  }, [currentUser])

  const fetch = async () => {
    if (dig(currentUser, 'currentUser', 'uid')) {
      const data = await Api.initGet(currentUser.currentUser.uid)
      await setTodos(data);
      console.log(todos);
    }
  }

  const formRender = () => {
    let dom
    if ( dig(currentUser, 'currentUser', 'uid') ) {
      dom = <form>
        <input placeholder="ToDoName" value={inputName} onChange={(event) => setInputName(event.currentTarget.value)}/>
        <button type="button" onClick={() => post()}>追加</button>
      </form>
    } else {
      dom = <button onClick={signInWithGoogle}>ログイン</button>
    }
    return dom
  }

  const post = async() => {
    await Api.addTodo(inputName, currentUser.currentUser.uid);
    await setInputName("");
    fetch();
  }

  return (
    <div>
      {formRender()}
      <ToDoList todos={todos} fetch={fetch} />
    </div>
  )
};

export default Dashboard;
