const apiAdapter = require("../routes/apiAdapter");
const { URL_SERVICE_ORDER_PAYMENT } = process.env;
const api = apiAdapter(URL_SERVICE_ORDER_PAYMENT);

module.exports = {
    store: async (req, res) => {
        try {
            const webook = await api.post("/api/webhook/midtrans", req.body);
            return res.json(webook.data);
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
