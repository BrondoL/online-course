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
    refreshToken: async (req, res) => {
        try {
            const { refresh_token, email } = req.body;

            if (!refresh_token || !email) {
                return res.status(402).json({
                    status: "error",
                    message: "Invalid token",
                });
            }

            await api.get("/refresh-tokens", { params: { refresh_token } });

            jwt.verify(
                refresh_token,
                JWT_SECRET_REFRESH_TOKEN,
                (err, decoded) => {
                    if (err) {
                        return res.status(403).json({
                            success: "error",
                            message: err.message,
                        });
                    }

                    if (email !== decoded.data.email) {
                        return res.status(403).json({
                            success: "error",
                            message: "email is not valid",
                        });
                    }

                    const token = jwt.sign(
                        {
                            data: decoded.data,
                        },
                        JWT_SECRET_ACCESS_TOKEN,
                        { expiresIn: JWT_ACCESS_TOKEN_EXPIRED }
                    );

                    return res.json({
                        status: "success",
                        message: "refresh token successfully",
                        data: {
                            token,
                        },
                    });
                }
            );
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
