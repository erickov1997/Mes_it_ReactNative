const API= 'http://192.168.100.124:3000/balluf'

export const getTasks = async () =>{
    const res = await fetch(API)
    return await res.json()
}