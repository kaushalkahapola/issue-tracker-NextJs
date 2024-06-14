import Pagination from "./components/Pagination";

export default function Home(
  {searchParams}:
  {searchParams: {page: string}}
) {
  return (
    <div>
      <Pagination itemCount={100} PageSize={10} CurrentPage={parseInt(searchParams.page)} />
    </div>
  );
}
