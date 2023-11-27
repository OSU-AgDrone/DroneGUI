import './CapacityDisplay.css'

const CapacityDisplay = (props) => {
    return (
        <div className='capacityContainer'>
            {props.type} Capacity: {props.capacity}%
        </div>
    )
}

export default CapacityDisplay