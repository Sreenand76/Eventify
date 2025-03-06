import axios from "axios"

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`
})

export const user = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/users`
})

export const getHeader = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization : `Bearer ${token}`,
  }
}

export async function registerUser(registration) {
  try {
    const response = await api.post("auth/register-user", registration);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data)
    } else {
      throw new Error(`User registration error : ${error.message}`);
    }
  }
}

export async function loginUser(login) {
  try {
    const response = await api.post("/auth/login", login);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error)
    return null;
  }
}

export const updateUserDetails = async (email,UserDetails) => {
  try {
    console.log(UserDetails)
    const response = await user.put(`update/${email}`,UserDetails,{
      headers: getHeader()
    });
    return response.data
  } catch (error) {
    console.error(error)
    throw error;
  }
}
export async function deleteUser(userId){
  try{
    const response=await user.delete(`/delete/${userId}`,{
      headers:getHeader()
    })
    return response.data;
  }catch(error){
    throw error;
  }
}
export async function updateUserRole(userId, roleName) {
  try {
    const response = await user.put(`/${userId}/roles/${roleName}`, {}, {
      headers: getHeader()
    });

    return response.data;
  } catch (error) {
    console.error("Error updating user role:", error);
    throw error;
  }
}

