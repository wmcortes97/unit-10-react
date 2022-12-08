import { Buffer } from "buffer";

export default class Data {
  /**
   *
   * @param {string} path - path that replaces url path section
   * @param {string} method - describes HTTP method: get, post, put, delete,
   * @param {object} body - object that is passed for post and put requests
   * @param {boolean} requiresAuth - determines if authorization is needed
   * @param {object} credentials - credentials passed in authorization header
   * @returns
   */
  api(
    path,
    method = "GET",
    body = null,
    requiresAuth = false,
    credentials = null
  ) {
    const url = `https://unit-10-react-production.up.railway.app/${path}`;

    const options = {
      method,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {
      const encodedCredentials = Buffer.from(
        `${credentials.username}:${credentials.password}`
      ).toString("base64");
      options.headers["Authorization"] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }

  //------------------------------HELPER FUNCTIONS: USER --------------------------------//
  async getUser(username, password) {
    const response = await this.api(`/users`, "GET", null, true, {
      username,
      password,
    });
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  async createUser(user) {
    const response = await this.api("/users", "POST", user);
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  //----------------------------HELPER FUNCTIONS: COURSES----------------------------------//
  async getCourses() {
    const response = await this.api("courses", "GET");
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else {
      throw new Error();
    }
  }

  async getCourse(id) {
    const response = await this.api(`/courses/${id}`, "GET");

    if (response.status === 200) {
      return response.json().then((data) => data);
    } else if (response.status === 404) {
      throw new Error("404");
    } else {
      throw new Error("505");
    }
  }
  async createCourse(body, username, password) {
    const response = await this.api(`/courses`, "POST", body, true, {
      username,
      password,
    });
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  async updateCourse(id, body, username, password) {
    const response = await this.api(`/courses/${id}`, "PUT", body, true, {
      username,
      password,
    });
    if (response.status === 204) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else if (response.status === 404) {
      throw new Error("404");
    } else {
      throw new Error("505");
    }
  }

  async deleteCourse(id, username, password) {
    const response = await this.api(`/courses/${id}`, "DELETE", null, true, {
      username,
      password,
    });

    if (response.status === 204) {
      console.log("deleted");
    } else {
      throw new Error();
    }
  }
}
