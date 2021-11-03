# Resizer App 

Application to resize images to fit A4 pages if necessary. It works with:


## • A Backend service

It's made in Python/FastAPI, and it does the main operations. Online demo [Here](https://resizer-app-backend-hunk.vercel.app/docs) or [Here](https://resizer-app-backend.vercel.app/docs).

### Endpoints

<details>
	<summary>1. Server status</summary>
	URL : `/`
    <br>
    Method : `GET`
    <br>
    Response body example :     

    {
        "message":	"The app is working, send your images to /upload"
    }
</details>

<details>
	<summary>2. Upload images</summary>
	URL : `/upload`
    <br>
    Method : `POST`
    <br>    
    Notes : 
    <br/>
    <ul>
        <li>You must send the request using `multipart/form-data` content-type</li>
        <li>Put your images in a field named `images`</li>
        <li>This method returns a pdf file.</li>
    </ul>
</details>


## • Client app 

It's made in JavaScript/React, and consumes the service. Online demo [Here (Version 2)](https://resizer-app-frontend2.vercel.app) or [Here (Version 1)](https://resizer-app-frontend.vercel.app),