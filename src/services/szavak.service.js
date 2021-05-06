import http from "../http-common";

class SzavakDataService {
  getAll() {
    return http.get("/szotar");
  }

  get(id) {
    return http.get(`/szotar/${id}`);
  }

  create(data) {
    return http.post("/szotar", data);
  }

  update(id, data) {
    return http.put(`/szotar/${id}`, data);
  }

  delete(id) {
    return http.delete(`/szotar/${id}`);
  }

  deleteAll() {
    return http.delete(`/szotar`);
  }

  findByTitle(title) {
    return http.get(`/szotar?title=${title}`);
  }
}

export default new SzavakDataService();