const apiAdapter = require("../routes/apiAdapter");
const { URL_SERVICE_COURSE } = process.env;
const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = {
    index: async (req, res) => {
        try {
            const lessons = await api.get("/api/lessons", {
                params: {
                    ...req.query,
                },
            });
            return res.json(lessons.data);
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
            const lessons = await api.get(`/api/lessons/${id}`);
            return res.json(lessons.data);
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
            const lessons = await api.post("/api/lessons", req.body);
            return res.json(lessons.data);
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
            const lessons = await api.put(`/api/lessons/${id}`, req.body);
            return res.json(lessons.data);
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
            const lessons = await api.delete(`/api/lessons/${id}`);
            return res.json(lessons.data);
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
