const apiAdapter = require("../routes/apiAdapter");
const { URL_SERVICE_COURSE } = process.env;
const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = {
    store: async (req, res) => {
        try {
            const user_id = req.user.data.id;

            const reviews = await api.post("/api/reviews", {
                user_id,
                ...req.body,
            });
            return res.json(reviews.data);
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

            const reviews = await api.put(`/api/reviews/${id}`, req.body);
            return res.json(reviews.data);
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
            const reviews = await api.delete(`/api/reviews/${id}`);
            return res.json(reviews.data);
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
