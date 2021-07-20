import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [submitting, setSubmitting] = useState(true);
  const [userData, setUserData] = useState([]);
  const [userCount, setUserCount] = useState(1);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        `https://randomuser.me/api?page=${userCount}`
      );
      setUserData((data) => [...data, response.data.results[0]]);
      setSubmitting(false);
    };

    if (submitting) {
      getData();
    }
  }, [userCount, submitting]);

  const loadMoreUsers = () => {
    setUserCount(userCount + 1);
    setSubmitting(true);
  };

  return (
    <div style={{ textAlign: "center" }}>
      {/* <div>{JSON.stringify(data)}</div> */}
      <button onClick={loadMoreUsers} style={{ margin: "20px" }}>
        Load More
      </button>

      {userData &&
        userData.map((result) => {
          const {
            name: { first, last },
            picture,
          } = result;

          return (
            <div key={first + last}>
              <h2>{first + " " + last}</h2>
              <img src={picture.large} alt="user" />
            </div>
          );
        })}
    </div>
  );
}

export default App;
