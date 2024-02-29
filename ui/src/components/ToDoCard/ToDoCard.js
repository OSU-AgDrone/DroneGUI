import '../../renderer/App.css';
import './ToDoCard.css';

const ToDoCard = (props) => {
    const { todo, date, removeTodo } = props;

    return (
        <div className='toDoCard'>
            <div className='flex-container'>
            <h3 className='map_name'>{props.map}</h3>
            <button className='regularButton remove' onClick={removeTodo}>x</button>
            </div>
            <p className='date'>{date}</p>
            <p className='todo'>{todo}</p>
        </div>
    );
};

export default ToDoCard;
