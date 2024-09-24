import { useEffect, useState } from "react";
import "./App.css";
import { jsonAxios } from "./api";
import "./index.css";
import { Pagination } from "antd";

function App() {
  const [content, setContent] = useState([]);
  const [totalElement, setTotalElement] = useState(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(0);
  const handleChangePage = (page) => {
    console.log(page);
    setPage(page - 1);
  };
  useEffect(() => {
    jsonAxios
      .get("/users")
      .then((response) => {
        console.log(response);
        const data = response.data;
        setContent(data.content);
        setTotalElement(data.totalElement);
        setPage(data.number);
        setSize(data.size);
      })
      .catch((error) => console.log(error));
  }, [page]);
  return (
    <>
      <div className="container">
        <table style={{ border: "1" }}>
          <thead>
            <tr>
              <th>STT</th>
              <th>Name</th>
              <th>DoB</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Address</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody>
            {content.map((item, index) => (
              <tr key={item.id}>
                <td>{size * page + index + 1}</td>{" "}
                {/* trang đầu tiên thì page * size = 0 vì page = 0 khi
               sang trang 2 thì page = 1  => page * size = size + index + 1 */}
                <td>{item.name}</td>
                <td>{item.dateOfBirth}</td>
                <td>{item.email}</td>
                <td>{item.gender ? "Nam" : "Nữ"}</td>
                <td>{item.address}</td>
                <td>
                  <button>EDIT</button>
                </td>
                <td>
                  <button>DELETE</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          current={page + 1}
          total={totalElement}
          pageSize={size}
          onChange={handleChangePage}
        />
      </div>
    </>
  );
}

export default App;
