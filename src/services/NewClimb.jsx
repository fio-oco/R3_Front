import { useState, useEffect } from "react";
import IMG_6737 from '../media/IMG_6737.JPG'
import { useNavigate } from "react-router-dom";

export default function NewClimb() {
  const navigate = useNavigate();
  const [isPublic, setIsPublic] = useState("");
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [route, setRoute] = useState({ name: "", grade: "",});
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [file, setFile] = useState("");
  const [fileToSend, setFileToSend] = useState("")
  const [description, setDescription] = useState("");
  const [routesArray, setRoutesArray] = useState([{ name: "", grade: "" }]);
  //const [latlong, setLatlong] = useState("");

  const handleRouteInput = (index, event) => {
    let data = [...routesArray];
    data[index][event.target.name] = event.target.value;
    setRoutesArray(data);
  };

  const handleAddRoute = (e) => {
    let newRoute = { name: "", grade: "" };
    setRoutesArray([...routesArray, newRoute]);
  };

  const handleRemoveRoute = (indexToRemove) => {
    let data = [...routesArray];
    data.splice(indexToRemove, 1);
    setRoutesArray(data);
  };

  const handleImageUpload = async (e) => {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]))
    setFileToSend(e.target.files[0]);
  }

  const handleReroute = async () => {
    navigate("/myclimbs");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(fileToSend);
    let formData = new FormData();

    formData.append('file', fileToSend, fileToSend.name);
    formData.append('title', title);
    formData.append('location', location);
    formData.append('date', date);
    formData.append('route', route);
    formData.append('type', type);
    formData.append('grade', grade);
    formData.append('description', description);
    
    try {
      const response = await fetch("http://localhost:3007/climbs/new", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: formData,
      })
      navigate("/myclimbs");
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <div
        className="background"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100vw",
          maxWidth: "1280px",
          minHeight: "800px",
          height: "auto",
          backgroundImage: `url(${IMG_6737})`,
          objectFit: "contain",
        }}
      >
      <div className="new-climb-form">
        <h1>New Climb</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Title: </label>
            <input
              type="text"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
            ></input> <br/>
            <label>Date:</label>
            <input
              type="date"
              value={date}
              required
              onChange={(e) => setDate(e.target.value)}
            ></input><br/>
            <label>Location:</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            ></input><br/>
            <label>Type: </label>
            <input
              type="text"
              required
              value={type}
              onChange={(e) => setType(e.target.value)}
            ></input><br/>

            <label>Route(s):</label>

            {routesArray.map((route, index) => (
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
                  {routesArray.length > 1 && (
                    <button
                      className="remove-btn"
                      onClick={() => handleRemoveRoute(index)}
                    >
                      <ion-icon name="close-circle-outline"></ion-icon>
                    </button>
                  )}
                </div>
              </>
            ))}
             <button className="add-btn" onClick={handleAddRoute}>
                    <ion-icon name="add-circle-outline"></ion-icon>
                  </button> <br/>
            <label>Description:</label>
            <input
              type="text"
              className="dynamic-text"
              value={description}
              required
              onChange={(e) => {setDescription(e.target.value); e.target.style.width = 'auto'; // Reset width to auto for input element
              e.target.style.width = `${e.target.scrollWidth}px`; }
                  }></input><br/>
            <label>Add Image:</label>
            <input type="file" name="image" /* multiple */ onChange={handleImageUpload}/>
              <img className="image-preview" src={file}/><br/>
            <button onClick={handleSubmit}>Post Climb</button>
          </div>
        </form>
      </div>
      </div>
    </>
  );
}

