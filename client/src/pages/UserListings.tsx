import useFetch from "../util/useFetch";
function UserListings() {
  const {} = useFetch("http://localhost:5000/api/v1/properties");
  return <div>you have 200 listings</div>;
}

export default UserListings;
