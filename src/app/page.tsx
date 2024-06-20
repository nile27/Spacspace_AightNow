import Header from "@/components/Header";
import IconButton from "@/components/btnUi/IconButton";
import LanguageButton from "@/components/btnUi/LanguageButton";
import TextButton from "@/components/btnUi/TextButton";

export default function Home() {
  return (
    <>
      <Header />
      <IconButton color="outline" icon="Time" />
      <LanguageButton style="jp" />
    </>
  );
}
