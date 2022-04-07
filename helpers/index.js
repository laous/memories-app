export const getUserFromLocalStorage  = () => {
    const user = JSON.parse(localStorage.getItem('memories-user'))

    if(!user) return

    return user
}

export const getUser  = () => {
    
}

export const addUserToLocalStorage = (user) => {
    const userExist = getUserFromLocalStorage()
    if(userExist){
        return
    }
    localStorage.setItem('memories-user' , JSON.stringify(user))
    return true
}