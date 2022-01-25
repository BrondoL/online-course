const jwt = require("jsonwebtoken");
const apiAdapter = require("../routes/apiAdapter");
const {
    URL_SERVICE_USER,
    JWT_SECRET_ACCESS_TOKEN,
    JWT_SECRET_REFRESH_TOKEN,
    JWT_ACCESS_TOKEN_EXPIRED,
    JWT_REFRESH_TOKEN_EXPIRED,
} = process.env;
const api = apiAdapter(URL_SERVICE_USER);

module.exports = {
    register: async (req, res) => {
        try {
            const user = await api.post("/users/register", req.body);

            return res.json(user.data);
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
    login: async (req, res) => {
        try {
            const user = await api.post("/users/login", req.body);
            const data = user.data.data;

            const token = jwt.sign({ data }, JWT_SECRET_ACCESS_TOKEN, {
                expiresIn: JWT_ACCESS_TOKEN_EXPIRED,
            });
            const refreshToken = jwt.sign({ data }, JWT_SECRET_REFRESH_TOKEN, {
                expiresIn: JWT_REFRESH_TOKEN_EXPIRED,
            });

            await api.post("/refresh-tokens", {
                refresh_token: refreshToken,
                user_id: data.id,
            });

            return res.json({
                status: "success",
                message: "login success",
                data: {
                    token,
                    refresh_token: refreshToken,
                },
            });
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
    logout: async (req, res) => {
        try {
            const id = req.user.data.id;
            const user = await api.post(`/users/logout`, { user_id: id });

            return res.json(user.data);
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
            const id = req.user.data.id;
            const user = await api.put(`/users/${id}`, req.body);

            return res.json(user.data);
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
    getUser: async (req, res) => {
        try {
            const id = req.user.data.id;
            const user = await api.get(`/users/${id}`);

            return res.json(user.data);
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
