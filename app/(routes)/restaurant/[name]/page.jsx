"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Intro from "../_components/intro";
import RestroTabs from "../_components/RestroTabs";

const RestaurantDetails = () => {
  const param = usePathname();
  const [restaurant, setRestaurant] = useState([]);
  useEffect(() => {
    GetRestaurantDetail(param.split("/")[2]);
  }, []);

  const GetRestaurantDetail = async (restroSlug) => {
    GlobalApi.GetRestaurantDetails(restroSlug).then((res) => {
      console.log(res);
      setRestaurant(res.restaurant);
    });
  };
  return (
    <div>
      <Intro restaurant={restaurant} />
      <RestroTabs restaurant={restaurant} />
    </div>
  );
};

export default RestaurantDetails;
