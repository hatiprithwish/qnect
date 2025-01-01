import Topbar from "../components/Topbar";
import LeftSidebar from "../components/LeftSidebar";
import Flow from "../components/Flow";

export default function Home() {
  return (
    <main>
      <Topbar />
      <section className="flex">
        <LeftSidebar />
        <Flow />
      </section>
    </main>
  );
}
