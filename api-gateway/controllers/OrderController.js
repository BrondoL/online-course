const apiAdapter = require("../routes/apiAdapter");
const { URL_SERVICE_ORDER_PAYMENT } = process.env;
const api = apiAdapter(URL_SERVICE_ORDER_PAYMENT);

module.exports = {
    index: async (req, res) => {
        try {
            const user_id = req.user.data.id;
            const orders = await api.get("/api/orders", {
                params: {
                    user_id,
                },
            });
            return res.json(orders.data);
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
