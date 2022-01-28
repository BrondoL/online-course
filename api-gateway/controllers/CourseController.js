const apiAdapter = require("../routes/apiAdapter");
const { URL_SERVICE_COURSE, HOSTNAME } = process.env;
const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = {
    index: async (req, res) => {
        try {
            const courses = await api.get("/api/courses", {
                params: {
                    ...req.query,
                    status: "published",
                },
            });

            const coursesData = courses.data;
            const firstPage = coursesData.data.first_page_url.split("?").pop();
            const lastPage = coursesData.data.last_page_url.split("?").pop();

            coursesData.data.first_page_url = `${HOSTNAME}/courses?${firstPage}`;
            coursesData.data.last_page_url = `${HOSTNAME}/courses?${lastPage}`;

            if (coursesData.data.next_page_url) {
                const nextPage = coursesData.data.next_page_url.split("?").pop();
                coursesData.data.next_page_url = `${HOSTNAME}/courses?${nextPage}`;
            }
            if (coursesData.data.prev_page_url) {
                const prevPage = coursesData.data.prev_page_url.split("?").pop();
                coursesData.data.prev_page_url = `${HOSTNAME}/courses?${prevPage}`;
            }

            if (coursesData.data.links[0].url) {
                const prevLink = coursesData.data.links[0].url.split("?").pop();
                coursesData.data.links[0].url = `${HOSTNAME}/courses?${prevLink}`;
            }
            if (coursesData.data.links[1].url) {
                const activeLink = coursesData.data.links[1].url.split("?").pop();
                coursesData.data.links[1].url = `${HOSTNAME}/courses?${activeLink}`;
            }
            if (coursesData.data.links[2].url) {
                const nextLink = coursesData.data.links[2].url.split("?").pop();
                coursesData.data.links[2].url = `${HOSTNAME}/courses?${nextLink}`;
            }

            coursesData.data.path = `${HOSTNAME}/courses`;

            return res.json(coursesData);
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
            const courses = await api.get(`/api/courses/${id}`);
            return res.json(courses.data);
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
            const courses = await api.post("/api/courses", req.body);
            return res.json(courses.data);
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
            const courses = await api.put(`/api/courses/${id}`, req.body);
            return res.json(courses.data);
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
            const courses = await api.delete(`/api/courses/${id}`);
            return res.json(courses.data);
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
