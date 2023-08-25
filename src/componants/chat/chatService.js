import apiService from "../../helper/apiService"

export default {
    getMessage: async() =>{
        try {
            var response = await apiService.get('message/')
            return response
        } catch (err) {
            console.log(err)
            return []
        }
    },
    postMessage: async(payload) =>{
        try{
            var response = await apiService.post('message/', payload)
            return response
        }catch(err){
            console.log(err)
            return []
        }
    },
    logout: async() =>{
        try {
            await apiService.get('logout')
        } catch (err) {
            console.log(err)
        }
    },
    getMessageCount: async() =>{
        try {
            var response = await apiService.get('message/count')
            return response
        } catch (err) {
            console.log(err)
            return ""
        }
    },
}