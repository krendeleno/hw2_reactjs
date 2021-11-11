import {useSelector} from "react-redux";

const useSettings = () => {
    return useSelector(state => state.settingsReducer)
};

export default useSettings