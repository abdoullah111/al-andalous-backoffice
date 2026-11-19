const BASE_URL = "http://localhost:3001";


export async function request(path, options = {}) {
    //  يوقفfetch
    const controller = new AbortController()
    const timeoutId = setTimeout(function(){
        controller.abort()
    },8000)
    try{
    const response = await fetch(`${BASE_URL}${path}`, {
        // كتزيد جميع options لي عطيتي لـ request() داخل fetch
      ...options,
      signal: controller.signal,
      headers: {
        // The data I sent in the body is JSON.
        "Content-Type": "application/json",
        // I want the response to be returned in JSON format.
        "Accept": "application/json",
        ...options.headers
      }
    });
    if(!response.ok){
        throw {
            type: "http",
            status: response.status,
            message: `Erreur HTTP : ${response.status}`
        };
    }
    try{
        return await response.json();
    }catch{
        throw{
            type: "parse",
            status: response.status,
            message: "Impossible de lire les données du serveur."
        }
    }
    
    }catch(error){
        if(error.name === "AbortError"){
            throw{
                type: "timeout",
                status: null,
                message: "La requête a expiré."
            }
        }if(error.type){
            throw error;
        }if(!navigator.onLine){
            throw{
                type: "offline",
                status: null,
                message: "Vous êtes hors ligne."
            }
        }
        throw{
            type: "network",
            status:null,
            message: "Impossible de contacter le serveur."
        }
    }finally{
        clearTimeout(timeoutId)
    }
}

