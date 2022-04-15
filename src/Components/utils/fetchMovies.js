

const fetchCountryData = async(link) => {
    
    const responseData = {
        status: false,
        message: "default",
        data: null,
        error: null
    };
    
    try {
        const request = await fetch(link);
    
        if(!request.ok)throw new Error("Cannot load movies list");
    
        const data = await request.json();

        if(data) {
            responseData.status = true;
            responseData.message = "data was fetched successfuly";
            responseData.data = data;
            responseData.error = null;
        }
        
    
    } catch (error) {
        responseData.status = false;
        responseData.message = "error";
        responseData.data = null;
        responseData.error = error.message || "unexpected error occured";
    }

    return responseData;
}

export default fetchCountryData;