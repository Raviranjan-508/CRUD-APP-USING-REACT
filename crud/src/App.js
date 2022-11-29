import { useEffect, useState } from 'react';
import axios from "axios";
import { MDBTable, MDBTableHead, MDBTableBody, MDBRow, MDBCol, MDBContainer, MDBBtnGroup, MDBBtn } from "mdb-react-ui-kit";
import './App.css';

function App() {

  const [data, setData] = useState([]);
  const [value, setValue] = useState('');
  const [sortValue, setSortValue] = useState("");

  const sortOptions = ["name", "address", "email", "phone", "status"];

  useEffect(() => {
    loadUsersData();
  }, []);


  // Fetch data from db.json
  const loadUsersData = async () => {
    return await axios
      .get('http://localhost:3000/users')
      .then((res) => {
        console.log(res.data)
        setData(res.data)
      })
      .catch((error) => console.log(error))
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    return await axios
      .get(`http://localhost:3000/users?q=${value}`)
      .then((res) => {
        setData(res.data)
        setValue("")
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleSort = async (e) => {
    const value = e.target.value;
    setSortValue(value)
    e.preventDefault();
    return await axios
      .get(`http://localhost:3000/users?_sort=${value}&_order=desc`)
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleFilter = async (value) => {
    return await axios
      .get(`http://localhost:3000/users?status=${value}`)
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleReset = (e) => {
    loadUsersData();
  }

  return (
    <MDBContainer>
      <form style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "400px",
        alignContent: "center"
      }}
        className="d-flex input-group w-auto"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          className="form-control"
          placeholder="Search Name ..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <MDBBtnGroup>
          <MDBBtn type='submit' color='dark'>Search</MDBBtn>
          <MDBBtn className='mx-2' color='info' onClick={() => handleReset()}>Reset</MDBBtn>
        </MDBBtnGroup>

      </form>



      <div style={{ marginTop: "100px" }} >
        <h2>Search , Filter , Sort and Pagination using db.json</h2>
        <MDBRow>
          <MDBCol size="12">
            <MDBTable>
              <MDBTableHead dark>
                <tr>
                  <th scope='col'>No.</th>
                  <th scope='col'>Name</th>
                  <th scope='col'>Email</th>
                  <th scope='col'>Phone</th>
                  <th scope='col'>Address</th>
                  <th scope='col'>Status</th>
                </tr>
              </MDBTableHead>
              {
                data.length === 0 ? (
                  <MDBTableBody className="align-center mb-0">
                    <tr>
                      <td colSpan={8} className="text-center mb-0">No data found</td>
                    </tr>
                  </MDBTableBody>
                ) : (
                  data.map((item, index) => (
                    <MDBTableBody key={index}>
                      <tr>
                        <th scope='row'>{index + 1}</th>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item.address}</td>
                        <td>{item.status}</td>
                      </tr>
                    </MDBTableBody>
                  ))
                )
              }
            </MDBTable>
          </MDBCol>
        </MDBRow>
      </div>

      <MDBRow>
        <MDBCol size="8" >
          <h3>Sort By:</h3>
          <select
            style={{ width: "50%", borderRadius: "2px", height: "35px" }}
            onChange={handleSort}
            value={sortValue}
          >
            <option>Please Select Value</option>
            {
              sortOptions.map((item, index) => (
                <option value={item} key={index}>{item}</option>
              ))
            }
          </select>
        </MDBCol>

        <MDBCol size="4">
        <h3> Filter By Status: </h3>
        <MDBBtnGroup>
            <MDBBtn color='success' onClick={() => handleFilter("Active")} >Active</MDBBtn>
            <MDBBtn color='danger'
            style={{ marginLeft: "2px" }}
            onClick={() => handleFilter("Inactive")} >Inactive</MDBBtn>
        </MDBBtnGroup>
        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}

export default App;
