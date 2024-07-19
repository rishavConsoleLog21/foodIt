"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import GlobalApi from "../_utils/GlobalApi";
import RestaurantItem from "./RestaurantItem";
import RestaurantItemSkelton from "./RestaurantSkelton";
import { v4 as uuidv4 } from 'uuid';

function RestaurantList() {
  const id = uuidv4();
  const params = useSearchParams();
  const [category, setCategory] = useState('all');
  const [restaurantList, setRestaurantList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    params &&
      setCategory(params.get("category") ? params.get("category") : "all");
    params &&
      getRestaurantList(
        params.get("category") ? params.get("category") : "all"
      );
  }, [params]);

  const getRestaurantList = (category_) => {
    setLoading(true);
    GlobalApi.GetRestaurant(category_).then((resp) => {
      console.log(resp);
      setRestaurantList(resp?.restaurants);
      setLoading(false);
    });
  };

  return (
    <div className="mt-5">
      {category === "all" ? (<h2 className="flex flex-row font-bold text-2xl items-center justify-center">All Popular Restaurants</h2>): (<h2 className="flex flex-row font-bold text-2xl items-center justify-center">Popular {category} Restaurants</h2>)}
      <h2 key={id} className="font-bold text-primary">{restaurantList?.length} Results</h2>

      <div
        className="grid grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        gap-7 mt-3
        "
      >
        {!loading
          ? restaurantList.map((restaurants, index) => (
              <RestaurantItem key={index} restaurant={restaurants} />
            ))
          : [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
              <RestaurantItemSkelton key={index}/>
            ))}
      </div>
    </div>
  );
}

export default RestaurantList;
