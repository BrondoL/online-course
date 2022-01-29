const apiAdapter = require("../routes/apiAdapter");
const { URL_SERVICE_COURSE } = process.env;
const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = {
    index: async (req, res) => {
        try {
            const chapters = await api.get("/api/chapters", {
                params: {
                    ...req.query,
                },
            });
            return res.json(chapters.data);
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
            const chapters = await api.get(`/api/chapters/${id}`);
            return res.json(chapters.data);
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
            const chapters = await api.post("/api/chapters", req.body);
            return res.json(chapters.data);
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
            const chapters = await api.put(`/api/chapters/${id}`, req.body);
            return res.json(chapters.data);
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
            const chapters = await api.delete(`/api/chapters/${id}`);
            return res.json(chapters.data);
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
