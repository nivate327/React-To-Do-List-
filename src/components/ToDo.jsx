import React, { useState, useEffect } from 'react';
import "./css/style.css";
import img from "./img/pinknote.png";

function ToDo() {

    const [task, setTask] = useState();
    const [toggle, setToggle]=useState(true);
    const [editItem, setEdit]=useState(null);

    const getItem = () => {
        let list = localStorage.getItem("lists");

        if (list) {
            return JSON.parse(localStorage.getItem("lists"));
        }
        else {
            return [];
        }
    }

    const [items, setItem] = useState(getItem());


    useEffect(() => {
        localStorage.setItem("lists", JSON.stringify(items))
    }, [items]);

    const InputEvent = (e) => {
        setTask(e.target.value);
    }

    const addItems = () => {
        if (task === "") {
            alert("Task Field is Empty !");
        }
        else if(task != "" && !toggle)
        {
            setItem(
                items.map((elem)=>
                {
                    if(elem.id===editItem)
                    {
                        return {...elem, name: task}
                    }

                    return elem;
                })
            )

            setToggle(true);
            setTask("")
            setEdit(null)
        }
        else {
            setItem((old) => {
                const taskall = { id: new Date().getTime().toString(), name: task };
                return [...old, taskall];
            })

            setTask("");
        }
    }

    const Edit=(id)=>
    {
        let newItem=items.find((elem)=>
        {
            return elem.id==id;
        })

        setToggle(false);
        setTask(newItem.name)
        setEdit(id)
    }

    const Delete = (id) => {

        let update = items.filter((elem) => {
            return elem.id !== id;
        });

        setItem(update);
    }

    const clearData = () => {
        setItem([]);
    }


    return (
        <div className="main">
            <div className="center">
                <div className="img">
                    <img src={img} alt="no-found" />
                </div>
                <p id="head">Add List Here 🖕</p>
                <div className="enterlist">
                    <input type="text" id="enter" placeholder="Enter Task   ✍️" onChange={InputEvent} value={task} />
                  
                  {toggle ?  <i className="fas fa-plus addItem" onClick={addItems}></i> : 
                  <i className="fas fa-edit addItem" onClick={addItems}></i> }
                </div>

                <div className="alltask">
                    {items.map((elem) => {
                        return (
                            <div className="new" key={elem.id}>
                                <p>{elem.name}</p>
                                <div>
                                    <i className="fas fa-edit edit" onClick={() => Edit(elem.id)}></i>
                                    <i className="fas fa-trash" onClick={() => Delete(elem.id)}></i>
                                </div>
                            </div>);
                    })}

                </div>

                <div className="removeall">
                    <button className="remove" onClick={clearData}>Clear All</button>
                </div>
            </div>
        </div>

    );
}

export default ToDo;
