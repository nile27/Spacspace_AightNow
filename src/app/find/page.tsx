import Header from "@/components/Header";
import SearchPage from "@/features/search/SearchPage";
export default function Find() {
  return (
    <>
      <Header />
      <div className=" h-full">
        <SearchPage />
      </div>
    </>
  );
}
