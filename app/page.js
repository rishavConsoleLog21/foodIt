import { Button } from "@/components/ui/button";
import CategoryList from "./_components/CategoryList";
import RestaurantList from "./_components/RestaurantList";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <CategoryList />
      <RestaurantList />
    </div>
  );
}
