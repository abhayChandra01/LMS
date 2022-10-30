var axios=require("axios")
var ServerURL="http://localhost:5000"

const getData = async(url) => {

    try {
        //    `${ServerURL}/${url}`     BACKTICK

            const response = await fetch(`${ServerURL}/${url}`,
            {
                method:"GET",
                mode:"cors",
                headers:{"Content-Type":"application/json;charset=utf-8" },
               

            });
            const result = await response.json();
            return result;
        }       catch (e) 
        {
            return null;
        }      



}



const postData = async (url, body) => {

    try {
        //    `${ServerURL}/${url}`     BACKTICK

            const response = await fetch(`${ServerURL}/${url}`,
            {
                method:"POST",
                mode:"cors",
                headers:{"Content-Type":"application/json;charset=utf-8" },
                body: JSON.stringify(body),

            });
            const result = await response.json();
            return result;
        }       catch (e) 
        {
            return null;
        }      



}

const postDataAndImage = async (url, FormData) => {

    try {
            const response = await axios.post(`${ServerURL}/${url}`,FormData,{ headers: { "content-type": "multipart/formData" } });
            const result =  await response.data;
            return result;
        } catch (e) 
        {
            return null;
        }




    }


export {ServerURL,postData,postDataAndImage,getData}

