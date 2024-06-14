import Pagination from "./components/Pagination";

export default function Home() {
  return (
    <div>
      <Pagination itemCount={100} PageSize={10} CurrentPage={2} />
    </div>
  );
}
