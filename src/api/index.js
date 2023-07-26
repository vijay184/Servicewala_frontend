import axios from 'axios';
import { SERVER } from '..';

export const getUserData = async (type,latitude,longitude) => {
    try {
        // console.log("calling api");
        const { data } = await axios.get(
          `${SERVER}/customer/get_proximity_service`,
          {
            params: {
              latitude,
              longitude,
            },
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        // console.log("api called", data);

        const filteredData = data.filter((item) => {
            // Map the type to the occupation value (0, 1, or 2)
            const typeOccupationMap = {
                'All':-1,
                'KabariWala':0,
                'SabjiWala': 1,
                'Hawkers': 2,
            };
            const occupationValue = typeOccupationMap[type];

            // Return true if the occupation value matches the filtered value
            return occupationValue === -1 || item.occupation === occupationValue;
        });

        // console.log("filtered data", filteredData);
        return filteredData;
        // return data;
    } catch (error) {
        console.log(error);
        // Handle error
    }
};

export const getMyProfile = async() => {
    try {
      // console.log("binodddd");
      const {data} = await axios.get(`${SERVER}/customer/customer_profile`,{
          headers: {
              "Content-Type": "application/json",
          },
          withCredentials: true,
      });
      return data.user;
    } catch (error) {
        console.log(error.message);
    }
};

export const setPending = async(sp_email,cust_email,name,mobile_number,address,latitude,longitude) => {
  try {
    // console.log("vinayyy");
    await axios.post(`${SERVER}/pending/post_pending`,
    {
        sp_email,cust_email,name,mobile_number,address,latitude,longitude,
      },
      {
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
    });
  } catch (error) {
      console.log(error.message);
  }
};

export const getPendingData = async (sp_email) => {
  // console.log("suhasssaassasdasdas", sp_email);
  try {
    // console.log("calling api");
    const { data } = await axios.get(`${SERVER}/pending/get_pending`, {
      params: { sp_email }, // Pass sp_email as a query parameter
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }); 
    // console.log("api called", data);
    return data.pendingRequest;
  } catch (error) {
    console.log(error);
    // Handle error
  }
};

export const getOnePendingData = async (sp_email,cust_email) => {
  try {
    // console.log("calling api");
    const { data } = await axios.get(`${SERVER}/pending/get_one_pending`, {
      params: { sp_email, cust_email }, // Pass sp_email as a query parameter
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }); 
    // console.log("api called", data);
    return data.pendingRequest;
  } catch (error) {
    console.log(error);
    // Handle error
  }
};

export const getSpProfile = async() => {
  try {
    // console.log("uuuuuuuuu");
    const {data} = await axios.get(`${SERVER}/service_provider/service_provider_profile`,{
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
    });
    return data.user;
  } catch (error) {
      console.log(error.message);
  }
};

export const deletePending = async (sp_email,cust_email) => {
  // console.log("chacha", sp_email,cust_email);
  try {
    await axios.delete(`${SERVER}/pending/delete_pending`, {
      params: { sp_email, cust_email }, // Pass sp_email as a query parameter
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }); 
  } catch (error) {
    console.log(error);
    // Handle error
  }
};
