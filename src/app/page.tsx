import Card from "@/components/Card/Card";
import CardTitle from "@/components/Card/CardTitle";
import LargeCard from "@/components/Card/LargeCard";
import WatchCard from "@/components/Card/WatchCard";
import Dropdowntset from "@/components/Dropdown/Dropdowntset";
import ListNews from "@/components/List/ListNews";
import ListStockDown from "@/components/List/ListStockDown";
import ListStockUp from "@/components/List/ListStockUp";
import Stock from "@/components/Stock/Stock";
import Toggle from "@/components/Toggle/Toggle";

export default function Home() {
  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center items-center gap-8">
        <Dropdowntset />
        <Stock />
        <Toggle />
        <Card />
        <CardTitle />
        <LargeCard />
        <WatchCard />
        <ListNews />
        <ListStockUp />
        <ListStockDown />
      </div>
    </>
  );
}
