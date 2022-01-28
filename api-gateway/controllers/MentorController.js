const apiAdapter = require("../routes/apiAdapter");
const { URL_SERVICE_COURSE } = process.env;
const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = {
    index: async (req, res) => {
        try {
            const mentors = await api.get("/api/mentors");
            return res.json(mentors.data);
        } catch (error) {
            if (error.code === "ECONNREFUSED") {
                return res.status(500).json({
                    status: "error",
                    message: "service unavailable",
                });
            }

            const { status, data } = error.response;
            return res.status(status).json(data);
        }
    },
    show: async (req, res) => {
        try {
            const { id } = req.params;
            const mentors = await api.get(`/api/mentors/${id}`);
            return res.json(mentors.data);
        } catch (error) {
            if (error.code === "ECONNREFUSED") {
                return res.status(500).json({
                    status: "error",
                    message: "service unavailable",
                });
            }

            const { status, data } = error.response;
            return res.status(status).json(data);
        }
    },
    store: async (req, res) => {
        try {
            const mentors = await api.post("/api/mentors", req.body);
            return res.json(mentors.data);
        } catch (error) {
            if (error.code === "ECONNREFUSED") {
                return res.status(500).json({
                    status: "error",
                    message: "service unavailable",
                });
            }

            const { status, data } = error.response;
            return res.status(status).json(data);
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const mentors = await api.put(`/api/mentors/${id}`, req.body);
            return res.json(mentors.data);
        } catch (error) {
            if (error.code === "ECONNREFUSED") {
                return res.status(500).json({
                    status: "error",
                    message: "service unavailable",
                });
            }

            const { status, data } = error.response;
            return res.status(status).json(data);
        }
    },
    destroy: async (req, res) => {
        try {
            const { id } = req.params;
            const mentors = await api.delete(`/api/mentors/${id}`);
            return res.json(mentors.data);
        } catch (error) {
            if (error.code === "ECONNREFUSED") {
                return res.status(500).json({
                    status: "error",
                    message: "service unavailable",
                });
            }

            const { status, data } = error.response;
            return res.status(status).json(data);
        }
    },
};
