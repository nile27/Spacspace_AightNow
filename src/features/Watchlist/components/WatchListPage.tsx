"use client";

import { useClose, useShow } from "@/Store/store";
import WatchList from "./WatchList";
import WatchListAdd from "./WatchListAdd";

export default function WatchListPage() {
  const { isShow } = useShow();
  const { isClose } = useClose();

  return <>{isShow && isClose ? <WatchList /> : <WatchListAdd />}</>;
}
