import '../../App.css';
import './ToDoCard.css';

const ToDoCard = (props) => {
    const { todo, date, removeTodo, rate } = props;

    return (
        <div className='toDoCard'>
            <div className='flex-container'>
            <h3 className='map_name'>{props.map}</h3>
            <button className='regularButton remove' onClick={removeTodo}>x</button>
            </div>
            {Array.from({ length: rate }).map((_, i) => (
                <img style={{height:"calc(1em)"}} key={i} src="https://img.icons8.com/ios-filled/000000/star--v1.png" alt="star" />
            ))}
            <p className='date'>{date}</p>
            <p className='todo'>{todo}</p>
        </div>
    );
};

export default ToDoCard;
