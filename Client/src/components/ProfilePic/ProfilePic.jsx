import React, { useState, useRef } from "react";

function ProfilePic({ onClose }) {
  const [image, setImage] = useState(null);
  const hiddenFileInput = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const imgname = event.target.files[0].name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxSize = Math.max(img.width, img.height);
        canvas.width = maxSize;
        canvas.height = maxSize;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(
          img,
          (maxSize - img.width) / 2,
          (maxSize - img.height) / 2
        );
        canvas.toBlob(
          (blob) => {
            const file = new File([blob], imgname, {
              type: "image/png",
              lastModified: Date.now(),
            });

            console.log(file);
            setImage(file);
          },
          "image/jpeg",
          0.8
        );
      };
    };
  };

  const handleUploadButtonClick = (file) => {
    var myHeaders = new Headers();
    const token = "adhgsdaksdhk938742937423";
    myHeaders.append("Authorization", `Bearer ${token}`);

    var formdata = new FormData();
    formdata.append("file", file);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("https://trickuweb.com/upload/profile_pic", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(JSON.parse(result));
        const profileurl = JSON.parse(result);
        setImage(profileurl.img_url);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 flex flex-col items-center bg-white">
          <label
            htmlFor="image-upload-input"
            className="text-lg font-bold mb-4 cursor-pointer"
          >
            {image ? image.name : "Choose an image"}
          </label>
          <div className="cursor-pointer">
            {
              <img
                src={URL.createObjectURL(image)}
                alt="upload image"
                className="h-48 w-48 rounded-full"
              />
            
          }

            <input
              id="image-upload-input"
              type="file"
              onChange={handleImageChange}
              ref={hiddenFileInput}
              className="hidden"
            />
          </div>

          <button
            className="bg-green-500 text-white px-6 py-2 mt-4 rounded-lg cursor-pointer"
            onClick={() => handleUploadButtonClick(image)}
          >
            Mise à jour
          </button>
          <button
            className="text-red-500 mt-4 cursor-pointer"
            onClick={onClose}
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePic;