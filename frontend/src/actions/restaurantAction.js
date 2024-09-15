import axios from "axios";
import {
    ALL_RESTAURANTS_REQUEST,
    ALL_RESTAURANTS_SUCCESS,
    ALL_RESTAURANTS_FAIL,
    SORT_BY_REVIEWS,
    SORT_BY_RATINGS,
    TOGGLE_VEG_ONLY,
    CLEAR_ERROR
}
    from "../constants/restaurantConstant";

export const getRestaurants = () => {
    return (
        async (dispatch) => {
            try {
                dispatch({ type: ALL_RESTAURANTS_REQUEST });
                let link = `/api/v1/eats/stores`;
                const { data } = await axios.get(link);
                console.log(data);
                const { restaurants, count } = data;
                dispatch({
                    type: ALL_RESTAURANTS_SUCCESS,
                    payload: { restaurants, count },
                });

            } catch (err) {

                dispatch({
                    type: ALL_RESTAURANTS_FAIL,
                    payload: err.response.data.message,
                });
            }


        }
    );
};

export const sortByRatings = () => {
    return {
        type: SORT_BY_RATINGS,
    };
};

export const sortByReviews = () => {
    return {
        type: SORT_BY_REVIEWS,
    };
};

export const toggleVegOnly = () => {
    return {
        type: TOGGLE_VEG_ONLY,
    };
};

export const clearErrors = () => {
    return {
        type: CLEAR_ERROR,
    };
};