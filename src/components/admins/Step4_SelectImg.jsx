import { useRef, useState } from "react";

export default function Step4_SelectImg({ formData, updateFormData }) {
  const fileInputRef = useRef(null);
  const [imageList, setImageList] = useState([
    "https://dp.classroomscreen.com/96138/1746702374-testdaytoolkit_shortthumbnail.png?fm=webp",
    "https://dp.classroomscreen.com/96138/1742899468-lofimorningmeeting_shortthumbnail.png?fm=webp",
    "https://dp.classroomscreen.com/96138/1744285289-classroomjobs_shortthumbnail.png?fm=webp",
    "https://dp.classroomscreen.com/96138/1744285261-getdodone_shortthumbnail.png?fm=webp",
    "https://dp.classroomscreen.com/96138/1744285416-stationrotation_shortthumbnail.png?fm=webp",
    "https://dp.classroomscreen.com/96138/1728891755-dailyagenda_shortthumbnail.png?fm=webp",
    "https://dp.classroomscreen.com/96138/1738244561-groupwork_thumbnail_short.png?dpr=0.75&fm=webp",
    "https://dp.classroomscreen.com/96138/1729581709-mustardketchupmayopickle_shortthumbnail.png?fm=webp",
    "https://dp.classroomscreen.com/96138/1720510290-whatdayisit_shortthumbnail.png?fm=webp",
  ]);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleOtherClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
  const file = event.target.files?.[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file);
    setImageList((prev) => [imageUrl, ...prev]);
    setSelectedImage(imageUrl);
    updateFormData({ classImage: file }); 
  }
};

  const handleSelectImage = (url) => {
    setSelectedImage(url);
    updateFormData({ classImage: url });
  };

  return (
    <>
      <h3 className="fw-bold">CHOOSE IMAGE</h3>
      <p className="text-muted mb-4">Please provide image of the class.</p>

      <form className="form-add-class" style={{ marginBottom: "6px" }}>
        <div className="mb-3">
          <label className="form-label">Select an image</label>
          <div className="img-list-container border rounded p-3">
            <div className="row g-3">
              {/* Upload */}
              <div className="col-4">
                <div
                  className="w-100 d-block text-center border rounded p-2 cursor-pointer"
                  style={{ height: "90%" }}
                  onClick={handleOtherClick}
                >
                  <div
                    className="mb-2 d-flex justify-content-center align-items-center"
                    style={{ height: "100%", cursor: "pointer" }}
                  >
                    <i
                      className="bi bi-file-earmark-arrow-up icon-animate"
                      style={{ fontSize: "2rem" }}
                    />
                  </div>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="d-none"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>

              {/* Image list */}
              {imageList.map((url, index) => (
                <div className="col-4" key={index}>
                  <label
                    className={`w-100 d-block text-center border rounded p-2 cursor-pointer ${
                      selectedImage === url ? " border-3" : ""
                    }`}
                    onClick={() => handleSelectImage(url)}
                  >
                    <input
                      type="radio"
                      name="userSelect"
                      className="d-none"
                      checked={selectedImage === url}
                      readOnly
                    />
                    <img
                      src={url}
                      className="img-fluid default-img-upload rounded mb-2"
                      alt={`Option ${index + 1}`}
                      style={{ objectFit: "cover", height: "120px", width: "100%" }}
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
