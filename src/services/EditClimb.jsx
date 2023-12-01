import { useState, useEffect } from "react";
import Modal from "react-modal";

export default function EditClimb({ climbId, onClose, isOpen }) {
  const [climbDetails, setClimbDetails] = useState({
    title: "",
    date: "",
    location: "",
    type: "",
    route: { name: "", grade: "" },
    routes: [],
    description: "",
    imgUrl: "",
  });
  const [file, setFile] = useState("");
  const [fileToSend, setFileToSend] = useState("");

  useEffect(() => {
    console.log(climbId);
    try {
      console.log(climbId);
      fetch(`http://localhost:3007/climbs/select/${climbId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        /*.then(async (res) => {
            const contentType = res.headers.get('content-type');
            console.log(contentType);
            .then((res) => res.json())
             if (contentType && contentType.includes('application/json')){
                return res.json().then((data) => {
                    console.log(data);
                    setClimbDetails(data);
                }); //need to try async await here for it to wait for data
            } else if (contentType && contentType.includes('JPG' || 'jpg')){
                res.blob().then((blob) => {
                    const imgUrl = URL.createObjectURL(blob);
                    setImgUrl(imgUrl)
                })
            } else {
                console.log('Unsupported content type');
            } 
          })*/
        .then((data) => {
          console.log(data);
          setClimbDetails(data);
        });
    } catch (error) {
      console.log(error);
    }
  }, [climbId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClimbDetails({ ...climbDetails, [name]: value });
  };

  const handleRouteInput = (index, event) => {
    let data = [...climbDetails.routes];
    data[index][event.target.name] = event.target.value;
    // setRoutesArray(data);
    let climbDet = { ...climbDetails, routes: data };
    setClimbDetails(climbDet);
  };

  const handleImageUpload = async (e) => {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
    setFileToSend(e.target.files[0]);
  };

  const handleAddRoute = (e) => {
    e.preventDefault();
    let newRoute = { name: "", grade: "" };
    let array = climbDetails.routes;
    array.push(newRoute);
    let climbDet = { ...climbDetails, routes: array };
    // setRoutesArray([...routesArray, newRoute]);
    setClimbDetails(climbDet);
  };

  const handleRemoveRoute = (e, indexToRemove) => {
    e.preventDefault();
    let data = [...climbDetails.routes];
    data.splice(indexToRemove, 1);
    let climbDet = { ...climbDetails, routes: data };
    setClimbDetails(climbDet);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();

    if (fileToSend !== "") {
      formData.append("file", fileToSend, fileToSend.name);
    }
    // formData.append("climbDetails", climbDetails);
    formData.append('title', climbDetails.title);
    formData.append('location', climbDetails.location);
    formData.append('date', climbDetails.date);
    formData.append('route', climbDetails.route);
    formData.append('type', climbDetails.type);
    formData.append('grade', climbDetails.grade);
    formData.append('description', climbDetails.description);

    try {
      const response = await fetch(`http://localhost:3007/climbs/${climbId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: formData,
      });

      let data = await response.json();
      console.log(data);
      setClimbDetails(data);
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Edit details"
      >
        <div className="editForm">
          <h1>Edit details: </h1>
          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label>Title: </label>
              <input
                type="text"
                name="title"
                value={climbDetails.title}
                required
                onChange={handleInputChange}
              ></input>
              <label>Date:</label>
              <input
                type="text"
                name="date"
                value={climbDetails.date}
                required
                onChange={handleInputChange}
              ></input>
              <label>Location:</label>
              <input
                type="text"
                name="location"
                value={climbDetails.location}
                onChange={handleInputChange}
              ></input>
              <label>Type: </label>
              <input
                type="text"
                required
                name="type"
                value={climbDetails.type}
                onChange={handleInputChange}
              ></input>

              <label>Route(s):</label>

              {climbDetails.routes.map((route, index) => (
                <>
                  <div className={"first-route"}>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={route.name}
                      onChange={(e) => handleRouteInput(index, e)}
                    ></input>
                    <input
                      type="text"
                      name="grade"
                      placeholder="Grade"
                      value={route.grade}
                      onChange={(e) => handleRouteInput(index, e)}
                    ></input>
                  </div>
                  <div className={"added-route"}>
                    {climbDetails.routes.length > 1 && (
                      <button
                        className="remove-btn"
                        onClick={(e) => handleRemoveRoute(e, index)}
                      >
                        <ion-icon name="close-circle-outline"></ion-icon>
                      </button>
                    )}
                  </div>
                </>
              ))}
              <button className="add-btn" onClick={handleAddRoute}>
                <ion-icon name="add-circle-outline"></ion-icon>
              </button>
              <label>Description:</label>
              <input
                type="text"
                value={climbDetails.description}
                required
                onChange={handleInputChange}
              ></input>
              <label>Change Image:</label>
              <input type="file" name="image" onChange={handleImageUpload} />
              <img className="image-preview" src={file} />
              <button onClick={handleSubmit}>Post Climb</button>
              <button type="button" onClick={onClose}></button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
