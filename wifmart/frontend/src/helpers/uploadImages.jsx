// Setting up Cloudinary for uploading images

const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME_CLOUDINARY}/image/upload`;

const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "mern_product");

  const dataResponse = await fetch(url, {
    method: "POST",
    body: formData,
  });

  return dataResponse.json();
};

export default uploadImage;



/**
 * // Cloudinary API endpoint to upload images, using the Cloud name from environment variables
const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`

// Function to handle the image upload to Cloudinary
const uploadImage = async(image) => {
    // Creating a new FormData object to hold the image data
    const formData = new FormData()
    
    // Appending the image file to the form data with the key 'file'
    formData.append("file", image)
    
    // Appending the 'upload_preset' value which is required by Cloudinary for uploads
    formData.append("upload_preset", "mern_product")

    // Making a POST request to the Cloudinary API with the form data
    const dataResponse = await fetch(url, {
        method: "post", // HTTP method set to 'POST' for uploading
        body: formData // Sending the form data containing the image and preset
    })

    // Returning the response from Cloudinary, which is expected in JSON format
    return dataResponse.json()
}

// Exporting the uploadImage function for use in other parts of the application
export default uploadImage

 * 
 */
