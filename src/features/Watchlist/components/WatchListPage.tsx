"use client";
import WatchCard from "@/components/Card/WatchCard";
import WatchList from "./WatchList";
import { useShow } from "@/Store/store";

export default function WatchListPage() {
  const { watchList } = useShow();
  console.log(watchList.length === 0 ? "WatchList" : "WatchCard");

  return <>{watchList.length === 0 ? <WatchList /> : <WatchCard />}</>;
}
