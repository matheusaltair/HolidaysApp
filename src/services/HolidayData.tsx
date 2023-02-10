import { BASE_URL } from "../config/globalUrl";

export const apiHolidays = {

  getHolidays: async () => {
    try {
      let req = await fetch(
        `${BASE_URL}`,
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            Accept: 'application/json',
          },
        }
      );
      console.log('API::getHolidays: ', req);
      let json = await req.json();
      return json;
    } catch (error) {
      console.log('API::getHolidays: ' + error);
    }
  }

}