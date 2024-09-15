import React, { useEffect } from "react";
import FoodItem from "./FoodItem";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMenus } from "../../actions/menuAction";
import Loader from "./Loader";
import Message from "./Message";
// import { getRestaurants } from '../../actions/restaurantAction';

export default function Menu() {
  const dispatch = useDispatch();
  const { id } = useParams();
  //  dispatch(setRestaurantsId(id));
  const { menus, loading, error } = useSelector((state) => state.menus);

  useEffect(() => {
    dispatch(getMenus(id));
    // dispatch(getRestaurants())
  }, [dispatch, id]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : menus && menus.length > 0 ? (
        menus.map((menu) => (
          <div key={menu._id}>
            <h2>{menu.category}</h2>
            <hr />
            {menu.items && menu.items.length > 0 ? (
              <div className="row">
                {menu.items.map((fooditem) => (
                  <FoodItem
                    key={fooditem._id}
                    fooditem={fooditem}
                    restaurant={id}
                  />
                ))}
              </div>
            ) : (
              <Message variant="info">No Food Item Found</Message>
            )}
          </div>
        ))
      ) : (
        <Message variant="info">No Menus Found</Message>
      )}
    </div>
  );
}