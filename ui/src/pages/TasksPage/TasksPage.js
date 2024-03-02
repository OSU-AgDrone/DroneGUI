import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import "./TasksPage.css";
import "../../renderer/App.css";
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
    const [activeField, setActiveField] = useState('');

    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        setTodos(savedTodos);

        const savedMapQuickFinds = JSON.parse(localStorage.getItem('mapQuickFinds')) || [];
        setMapQuickFinds(savedMapQuickFinds);

        const savedDateQuickFinds = JSON.parse(localStorage.getItem('dateQuickFinds')) || [];
        setDateQuickFinds(savedDateQuickFinds);
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
        localStorage.setItem('mapQuickFinds', JSON.stringify(mapQuickFinds));
        localStorage.setItem('dateQuickFinds', JSON.stringify(dateQuickFinds));
    }, [todos, mapQuickFinds, dateQuickFinds]);

    const openModal = () => {
        if (isModalOpen) {
            if (document.documentElement.getAttribute('unsavedChanges') !== null) {
                const confirmation = window.confirm(t("unsavedChanges") + " " + t("confirm_form"));
                if (!confirmation) {
                    return;
                } else {
                    document.documentElement.removeAttribute('unsavedChanges');
                }
            }
            setIsModalOpen(false); 
        } else {
            setIsModalOpen(true);
        }
    };

    const handleClearAll = () => {
        if (!window.confirm(t("clearAllTasksCheck"))) return;
        setTodos([]);
        setMapQuickFinds([]);
        setDateQuickFinds([]);
    };

    const handleAllremove = (type) => {
        const conditions = find.split(' && ');
        const simplifiedConditions = conditions.filter(condition => !condition.startsWith(`${type} =`));
        const simplifiedFind = simplifiedConditions.join(' && ');
        setFind(simplifiedFind);
    };
    
    

    const addTodo = (map, task, date, rate) => {
        const currentDate = new Date();
        const uniqueId = currentDate.getTime().toString();
        const newTodo = { map, task, date, rate, id: uniqueId };
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

    const compareDates = (a, b) => {
        return new Date(a.date) - new Date(b.date);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTodos = todos.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleAll = () => {
        document.getElementById('dateSelect').value = '';
        document.getElementById('rateSelect').value = '';
        setActiveField('');
        setFind('');
    };

    const handleMapFind = (map) => {
        setActiveField(map);
        const endingDelimiter = '_'; 
        const formattedMap = map + endingDelimiter; 
        if (find !== '') {
            if (find.includes('map')) {
                let newFind = find.replace(/(map\s*=\s*)([\w\s]+)/, `$1${formattedMap}`);
                newFind = newFind.replace(endingDelimiter, '');
                setFind(newFind);
            } else {
                setFind(`${find} && map = ${formattedMap}`);
            }
        } else {
            setFind(`map = ${map}`);
        }
    };
    

    const handleDateFind = (date) => {
        if(date === ''){
            handleAllremove('date');
        }else if (find !== '') {
            if (find.includes('date')) {
                const newFind = find.replace(/(date\s*=\s*)([\d-]+)/, `$1${date}`);
                setFind(newFind);
            } else {
                setFind(`${find} && date = ${date}`);
            }
        } else {
            setFind(`date = ${date}`);
        }
    };

    const handleRateFind = (rate) => {
        if(rate === ''){
            handleAllremove('rate');
        }else if (find !== '') {
            if (find.includes('rate')) {
                const newFind = find.replace(/(rate\s*=\s*)(\w+)/, `$1${rate}`);
                setFind(newFind);
            } else {
                setFind(`${find} && rate = ${rate}`);
            }
        } else {
            setFind(`rate = ${rate}`);
        }
    };

    function filterTodos(todo, filter) {
        if (!filter) return true;
        const filters = filter.split('&&').map(f => f.trim());
        return filters.every(f => {
            const [key, value] = f.split('=').map(part => part.trim());
            return todo[key] === value;
        });
    }

    
    return (
        <div id="TasksPage" style={{"minWidth":"80%"}}>
             <h1 autoFocus className='title'>{t("Task List")} <img id="titleImg" src="https://img.icons8.com/45/clipboard.png" ></img></h1>
            <button className="regularButton" onClick={openModal}>{t("make_task")}</button>
                <Modal isOpen={isModalOpen}>
                    <ToDoMaker maps={mapQuickFinds} addTodo={addTodo} openModal={() => openModal}/>
                </Modal>
                <hr/>
            <div >
                <button className='regularButton' onClick={handleAll}>{t("allTasks")}</button>
                <h3 style={{left:"auto", "position": "absolute"}}>{t("quickFind")}</h3>
                <div >
                    <br/>
                    <br/>
                    <h4 style={{left:"auto", "position": "absolute"}}>{t("Fields")}</h4>
                    <br /><br />
                    <div style={{marginLeft:"1rem"}}>
                        {mapQuickFinds.map((item) => (
                            <button className={`${activeField === `${item.map}` ? 'active' : ''} regularButton`} onClick={() => handleMapFind(item.map)} key={item.id}>{item.map}</button>
                        ))}
                    </div>
                </div>
                <br />
                    <div>
                        <h4 style={{left:"auto", "position": "absolute"}}>{t("Dates")}</h4>
                        <br /><br />
                        <br />
                        <select id="dateSelect" style={{marginLeft:"1rem"}} onChange={(e) => handleDateFind(e.target.value)}>
                            <option value="">{t("select_date")}</option>
                            {dateQuickFinds.map((item) => (
                                <option key={item.id} value={item.date}>{item.date}</option>
                            ))}
                        </select>
                    </div>
                    <div>

                        <h4 style={{left:"auto", "position": "absolute"}}>{t("Importance")}</h4>
                        <br /><br />
                        <br />
                        <select id="rateSelect" style={{marginLeft:"1rem", width:"3rem"}} onChange={(e) => handleRateFind(e.target.value)}>
                            <option value="">-</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
            </div>
            <hr />
            <div className="flex-container">
                {currentTodos
                    .sort(compareDates)
                    .filter(todo => filterTodos(todo, find))
                    .map((todo) => (
                        <div key={todo.id}>
                            <ToDoCard map={todo.map} date={todo.date} todo={todo.task} rate={todo.rate} removeTodo={() => removeTodo(todo.id, todo.date, todo.map)} />
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
