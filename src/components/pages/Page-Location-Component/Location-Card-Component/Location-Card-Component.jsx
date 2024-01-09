import { useSelector } from "react-redux";

const LocationCardComponent = (props) => {
    const lazy = useSelector((state) => state.lazy);

    return (
        <div>
            {lazy.location.pages[props.id].items.map((elm) => {
                return (
                    <p key={elm._id}>{elm.title}</p>
                )
            })}
        </div>
    )
}

export default LocationCardComponent;