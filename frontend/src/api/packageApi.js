import api from "./axios";

export const getAllPackages = () => api.get("/package/packages");

export const getOnePackage = (id) => api.get(`/package/packages/${id}`)

export const createPackage = (formData) => 
    api.post("/admin/packages", formData, {
        headers: {"Content-Type": "multipart/form-data"},
    });

export const downloadPdf = (id) => {
    window.open(
        `${BASE_URL}/package/packages/${id}/pdf`,
        "_blank"
    );
};