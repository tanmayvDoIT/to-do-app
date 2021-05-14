import React, { useState, useEffect } from 'react';
import './home.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Home = () => {
  const [task, setTask] = useState('');
  const [list, setList] = useState([]);
  const [editItemButton, setEditItemButton] = useState({
    value: false,
    id: null,
  });

  const changeText = (e) => {
    e.preventDefault();
    setTask(e.target.value);
  };

  const addTask = () => {
    setList((prevState) => {
      let arr = [...prevState];
      arr.push(task);
      return arr;
    });
    setTask('');
  };

  const removeItem = (id) => {
    setList((prevState) => {
      let arr = [...prevState];
      let arr2 = arr.filter((item, itemId) => itemId !== id && item);
      localStorage.setItem('localList', JSON.stringify(arr2));
      return arr2;
    });
  };

  const editItem = (id) => {
    console.log(id);
    setTask(list[id]);
    setEditItemButton({
      value: true,
      id: id,
    });
  };

  const editItemValue = (value, id) => {
    setList((prevState) => {
      let arr = [...prevState];
      arr[id] = value;
      return arr;
    });
    setEditItemButton({
      value: false,
      id: null,
    });
    setTask('');
  };

  useEffect(() => {
    console.log(editItemButton);
  }, [editItemButton]);

  useEffect(() => {
    console.log(list);
    if (list.length !== 0) {
      localStorage.setItem('localList', JSON.stringify(list));
    }
    // else {
    //   localStorage.setItem('localList', 'hey');
    // }
  }, [list]);

  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem('localList')));
    if (JSON.parse(localStorage.getItem('localList')) !== null) {
      let arrLocalStorage = JSON.parse(localStorage.getItem('localList'));
      setList((prevState) => {
        let arr = [...prevState];
        arr = arrLocalStorage.concat(arr);
        // console.log(arrLocalStorage);
        // console.log(arrLocalStorage.concat(arr));
        return arr;
      });
    }
  }, []);

  // DND

  // a little function to help us with reordering the result
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the list look a bit nicer
    userSelect: 'none',
    // padding: grid * 2,
    // margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    //background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver) => ({
    //background: isDraggingOver ? 'lightblue' : 'lightgrey',
    minheight: '400px',
    //border: '1px solid black',
    // padding: grid,
    // width: 250,
  });

  // const [list, setList] = useState(list);

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const itemsReorder = reorder(
      list,
      result.source.index,
      result.destination.index
    );

    // this.setState({
    //   list,
    // });
    setList(itemsReorder);
  };

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity

  return (
    <div className="row m-4">
      <div className="col-sm-12 col-md-5 mb-5 mt-2">
        <input
          type="text"
          name=""
          id=""
          style={{ backgroundColor: '#357089', color: 'white' }}
          className="form-control input-word"
          placeholder="Enter Task Name..."
          value={task}
          onChange={changeText}
        />
        <button
          className="btn btn-block mt-2"
          style={{ backgroundColor: '#cb9c18' }}
          onClick={() =>
            editItemButton.value === true
              ? editItemValue(task, editItemButton.id)
              : addTask()
          }
        >
          {editItemButton.value ? 'EDIT' : 'ADD'}
        </button>
        {editItemButton.value && (
          <button
            className="btn btn-dark btn-block mt-2"
            onClick={() => {
              setEditItemButton({
                value: false,
                id: null,
              });
              setTask('');
            }}
          >
            CLEAR
          </button>
        )}
      </div>

      <div className="col-sm-12 col-md-7">
        {/* {list.map((item, id) => {
          <div key={id}>{item}</div>;
        })} */}
        {/* {list.map((item, id) => (
          <div
            className="border border-dark m-2 text-center row task-block"
            style={{ borderRadius: 10, height: 30, overflow: 'hidden' }}
            key={id}
          >
            <div className="col-11 first-half" onClick={() => editItem(id)}>
              {item}
            </div>
            <div
              className="col-1 p-0 pr-1 second-half"
              onClick={() => removeItem(id)}
            >
              <button type="button" className="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
        ))} */}

        {/* DND */}
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {list.map((item, index) => (
                  <Draggable
                    key={index.toString()}
                    draggableId={index.toString()}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <div
                          className="border border-dark m-2 text-center row task-block"
                          style={{
                            // borderRadius: 10,
                            height: 50,
                            overflow: 'hidden',
                            backgroundColor: '#c124ac',
                          }}
                          key={index}
                        >
                          <div
                            className="col-11 first-half font-weight-bold"
                            style={{ color: 'white' }}
                          >
                            <div className="mt-2">
                              <span
                                onClick={() => editItem(index)}
                                style={{ cursor: 'pointer' }}
                              >
                                {item.toUpperCase()}
                              </span>
                            </div>
                          </div>
                          <div
                            className="col-1 p-0 pr-1 second-half"
                            onClick={() => removeItem(index)}
                          >
                            <button
                              type="button"
                              className="close mt-2"
                              aria-label="Close"
                            >
                              <i class="fas fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Home;
