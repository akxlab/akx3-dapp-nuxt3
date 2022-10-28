import axios from "axios";

export default function () {

    const uploadAvatar = async (url:string, formData, opts) => {

        try {
            let res = await axios.post(url, formData, opts);
            let result = await res.data;
            console.log(result.errors);
            if (result.errors) {
                console.log("=======>", typeof alert);
                result.errors.forEach((error) => (typeof alert ? alert(error.message) : console.log()));
                // Throw an error to exit the try block
                throw Error(JSON.stringify(result.errors));
            }
            // save result response to page data state
            return result;
        } catch (error) {
            console.log(error);
            return {
                errors: error,
            };
        }

    }

    const changeUsername = async (username: string, owner: string) => {
        const url = "https://api.akx3.com:3334/api/v1/username/"+owner+"/"+username;
        let res = await axios.get(url);
        let result = await res.data;
        if (result.errors) {
            console.log("=======>", typeof alert);
            result.errors.forEach((error) => (typeof alert ? alert(error.message) : console.log()));
            // Throw an error to exit the try block
            throw Error(JSON.stringify(result.errors));
        }
        // save result response to page data state
        return result;

    }

    const getUserData = async (address:string) => {
        let res = await axios.get('https://api.akx3.com:3334/api/v1/me/'+address);
        return res.data;
    }

    const getDataFromUsername = async (username:string) => {
        let res = await axios.get('https://api.akx3.com:3334/api/v1/profiles/'+username);
        return res.data;
    }

    return {uploadAvatar, getUserData, changeUsername, getDataFromUsername}

}