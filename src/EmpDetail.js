import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const EmpDetail = () => {
  const { empid } = useParams();
  const [empdata, empdatachange] = useState({});

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/posts/detail/${empid}`)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {

        console.log(resp);
        empdatachange(resp.post);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [empid]);

  return (
    <div>
      <div className="card" style={{ textAlign: "left" }}>
        <div className="card-title">
          <h2>Employee ID {empid}</h2>
        </div>
        <div className="card-body"></div>
        {empdata && (
          <>
            <div>
              <h2>The Employee name is : {empdata.name}</h2>
              <h3>Contact Details</h3>
              <h5>Email is: {empdata.email}</h5>
              <h5>Phone is: {empdata.phone}</h5>
              <Link className="btn btn-danger" to="/">
                Back to Listing
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EmpDetail;
