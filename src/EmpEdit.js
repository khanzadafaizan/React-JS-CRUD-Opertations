import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EmpEdit = () => {
    const{empid}=useParams(); 
    // const[empdata,empdatachange]=useState({})
    console.log(empid);
    useEffect(()=>{
        fetch("http://127.0.0.1:8000/api/posts/detail/"+ empid).then((res) => {
          return res.json();
        })
        .then((resp) => {
            console.log(resp);
            if(resp.post){

                idchange(resp.post.id);
                namechange(resp.post.name);
                emailchange(resp.post.email);
                phonechange(resp.post.phone);
                activechange(resp.post.isactive);
            }

    })
        .catch((err) => {
          console.log(err.message);
        });

    },[]);

    const[id,idchange]=useState("");
    const[name,namechange]=useState("");
    const[email,emailchange]=useState("");
    const[phone,phonechange]=useState("");
    const[active,activechange]=useState(true);
    const[validation,valchange]=useState(false);

    const navigate=useNavigate();


    const handlesubmit=(e)=>{
        e.preventDefault();
        const empdata=({id,name,email,phone,active});
  
        fetch("http://127.0.0.1:8000/api/posts/update/"+empid,{
            method:"PUT",
            headers:{"content-type":"application/json"},
            body:JSON.stringify(empdata)
        }).then((res)=>{
            alert('Saved Successfully.')
            navigate("/");
        }).catch((err)=>{
            console.log(err.message);
        })

    }
    return (
        <div>


        <div className="row">
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handlesubmit}>
                    <div className="card" style={{"textAlign":"left"}}>
                        <div className="card-title">
                            <h2>Employee Edit</h2>

                        </div>
                        <div className="card-body">
                            <div className="row">
                                
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>ID</label>
                                        <input value={id} disabled="disabled" className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input required value={name} onMouseDown={e=>valchange(true)} onChange={e=>namechange(e.target.value)} className="form-control"></input>
                                        {name && validation && <span className="text-danger">Enter the name</span>}
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input value={email} onChange={e=>emailchange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Phone</label>
                                        <input value={phone} onChange={e=>phonechange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-check">
                                    <input checked={active} onChange={e=>activechange(e.target.checked)} type="checkbox" className="form-check-input"></input>

                                        <label className="form-check-label">Is Action</label>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <button className="btn btn-success" type="submit">Save</button>
                                        <Link to="/" className="btn btn-danger">Back</Link>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>
                </form>
            </div>
        </div>
    </div>
      );
}
 
export default EmpEdit;