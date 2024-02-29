import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import "./TasksPage.css";
import ToDoCard from '../../components/ToDoCard/ToDoCard';
import ToDoMaker from '../../components/ToDoMaker/ToDoMaker';
import Modal from '../../components/Modal';

function TodoList() {
    const { t } = useTranslation();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const [todos, setTodos] = useState([]);
    const [mapQuickFinds, setMapQuickFinds] = useState([]);
    const [dateQuickFinds, setDateQuickFinds] = useState([]);
    const [find, setFind] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        setTodos(savedTodos);
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    useEffect(() => {
        const savedMapQuickFinds = JSON.parse(localStorage.getItem('mapQuickFinds')) || [];
        setMapQuickFinds(savedMapQuickFinds);
    }, []);

    useEffect(() => {
        localStorage.setItem('mapQuickFinds', JSON.stringify(mapQuickFinds));
    }, [mapQuickFinds]);

    useEffect(() => {
        const savedDateQuickFinds = JSON.parse(localStorage.getItem('dateQuickFinds')) || [];
        setDateQuickFinds(savedDateQuickFinds);
    }, []);

    useEffect(() => {
        localStorage.setItem('dateQuickFinds', JSON.stringify(dateQuickFinds));
    }, [dateQuickFinds]);

    const openModal = () => {
        if(isModalOpen== false){            
            setIsModalOpen(true);
        }else {
            setIsModalOpen(false);
    }
      };
    

    const addTodo = (map, task, date) => {
        const currentDate = new Date();
        const uniqueId = currentDate.getTime().toString();
        const newTodo = { map, task, date, id: uniqueId };
        setTodos([...todos, newTodo]);

        const existingMap = mapQuickFinds.find(item => item.map === map);
        if (!existingMap) {
            const newMap = { map, id: uniqueId };
            setMapQuickFinds([...mapQuickFinds, newMap]);
        }

        const existingDate = dateQuickFinds.find(item => item.date === date);
        if (!existingDate) {
            const newDate = { date, id: uniqueId };
            setDateQuickFinds([...dateQuickFinds, newDate]);
        }
        setIsModalOpen(false);
    };

    const removeTodo = (idToRemove, date, map) => {
        setTodos(todos.filter(todo => todo.id !== idToRemove));

        const remainingTodosWithDate = todos.filter(todo => todo.date === date);
        if (remainingTodosWithDate.length === 1) {
            setDateQuickFinds(dateQuickFinds.filter(item => item.date !== date));
        }

        const remainingTodosWithMap = todos.filter(todo => todo.map === map);
        if (remainingTodosWithMap.length === 1) {
            setMapQuickFinds(mapQuickFinds.filter(item => item.map !== map));
        }
    };

    const handleClearAll = () => {
        if (!window.confirm(t("clearAllTasksCheck"))) return;
        setTodos([]);
        setMapQuickFinds([]);
        setDateQuickFinds([]);
    };

    const compareDates = (a, b) => {
        return new Date(a.date) - new Date(b.date);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTodos = todos.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleAll = () => {
        setFind('');
    };

    const handleMapFind = (map) => {
        setFind(`map = ${map}`);
    };

    const handleDateFind = (date) => {
        setFind(`date = ${date}`);
    };

    function filterTodos(todo, filter) {
        if (!filter) return true;
        const [key, value] = filter.split('=').map(part => part.trim());
        return todo[key] === value;
    }

    return (
        <div id="TasksPage" style={{"minWidth":"80%"}}>
            <h1>{t("Task List")}</h1>
            <button className="regularButton" onClick={openModal}>{t("make_task")}</button>
                <Modal isOpen={isModalOpen}>
                    <ToDoMaker addTodo={addTodo} openModal={() => openModal}/>
                </Modal>
                <hr/>
            <div >
                <button className='regularButton' onClick={handleAll}>{t("allTasks")}</button>
                <h3 style={{left:"auto", "position": "absolute"}}>{t("quickFind")}</h3>
                <div >
                    <br/>
                    <h4 style={{left:"auto", "position": "absolute"}}>{t("Fields")}</h4>
                    <br /><br />
                    <div style={{marginLeft:"1rem"}}>
                        {mapQuickFinds.map((item, index) => (
                            <button className='regularButton' onClick={() => handleMapFind(item.map)} key={item.id}>{item.map}</button>
                        ))}
                    </div>
                </div>
                <br />
                <div>
                    <div>
                        <h4 style={{left:"auto", "position": "absolute"}}>{t("Dates")}</h4>
                        <br /><br />
                        <br />
                        <select style={{marginLeft:"1rem"}} onChange={(e) => handleDateFind(e.target.value)}>
                            <option value="">{t("select_date")}</option>
                            {dateQuickFinds.map((item, index) => (
                                <option key={item.id} value={item.date}>{item.date}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <hr />
            <div className="flex-container">
                {currentTodos
                    .sort(compareDates)
                    .filter(todo => filterTodos(todo, find))
                    .map((todo) => (
                        <div key={todo.id}>
                            <ToDoCard map={todo.map} date={todo.date} todo={todo.task} removeTodo={() => removeTodo(todo.id, todo.date, todo.map)} />
                        </div>
                    ))}
            </div>
            <div>
                <button className='regularButton' onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>{t("previous")}</button>
                <button className='regularButton' onClick={() => paginate(currentPage + 1)} disabled={indexOfLastItem >= todos.length}>{t("next")}</button>
            </div>
            <hr />
            <br/>
            <div>
                <button className='regularButton' onClick={handleClearAll}>{t("clearAll")}</button>
            </div>
        </div>
    );
}

export default TodoList;
