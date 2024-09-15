import React, { useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import { FaRegEye } from "react-icons/fa6";
import { FaRupeeSign } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loader from "../layouts/Loader";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import { getRestaurants } from "../../actions/restaurantAction";

const ListOrders = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const restaurants = useSelector((state) => state.restaurants);

  const restaurantList = Array.isArray(restaurants.restaurants)
    ? restaurants.restaurants
    : [];
  useEffect(() => {
    dispatch(myOrders());
    dispatch(getRestaurants());
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "Restaurant Name",
          field: "restaurant",
          sort: "asc",
        },
        {
          label: "Order Items",
          field: "orderItems",
          sort: "asc",
        },
        {
          label: "Sum of Items",
          field: "numOfItems",
          sort: "asc",
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
        },
        {
          label: "Order Date",
          field: "orderDate",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    if (orders && orders.length > 0 && restaurantList.length > 0) {
      const sortedOrders = orders.sort(
        (a, b) => new Date(b.creadtedAt) - new Date(a.createdAt)
      );

      sortedOrders.forEach((order) => {
        const orderItemNames = order.orderItems
          .map((item) => item.name)
          .join(",");

        const restaurant = restaurantList.find(
          (restaurant) => restaurant._id.toString() === order.restaurant._id
        );

        data.rows.push({
          restaurant: restaurant?.name || "unknown Restaurant",
          numOfItems: order.orderItems.length,
          amount: (
            <span>
              <FaRupeeSign />
              {order.finalTotal}
            </span>
          ),
          status:
            order.orderStatus &&
            String(order.orderStatus).includes("Delivered") ? (
              <p style={{ color: "green" }}>{order.orderStatus}</p>
            ) : (
              <p style={{ color: "red" }}>{order.orderStatus}</p>
            ),
          orderItems: orderItemNames,
          orderDate: new Date(order.createdAt).toLocaleDateString(),
          actions: (
            <Link to={`/eats/orders/${order._id}`}>
              <FaRegEye />
            </Link>
          ),
        });
      });
    }
    return data;
  };

  return (
    <>
      <div className="cartt">
        <h1 className="my-5">My Orders</h1>

        {loading ? (
          <Loader />
        ) : (
          <MDBDataTable
            data={setOrders()}
            className="px-3"
            bordered
            striped
            hover
          />
        )}
      </div>
    </>
  );
};

export default ListOrders;