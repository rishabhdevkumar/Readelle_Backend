const express = require("express");

const router = express.Router();

const { createCategory, getAllCategories, updateCategory, deleteCategory,
} = require("../controllers/category.controller");
const { auth, authorizeRole
} = require("../middlewares/auth.middleware");

router.post("/", createCategory);

router.get("/", getAllCategories);

router.put("/:id", updateCategory);

router.delete("/:categoryId", auth,
    authorizeRole(["admin", "seller"]),
    deleteCategory
);

module.exports = router;