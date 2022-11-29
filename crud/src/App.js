import { useEffect, useState } from 'react';
import axios from "axios";
import { MDBTable, MDBTableHead, MDBTableBody, MDBRow, MDBCol, MDBContainer, MDBBtnGroup, MDBBtn } from "mdb-react-ui-kit";
import './App.css';

function App() {

  const [data, setData] = useState([]);
  const [value , setValue] = useState(''); 

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
          <MDBBtn  type='submit' color='dark'>Search</MDBBtn>
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
    </MDBContainer>
  );
}

export default App;
