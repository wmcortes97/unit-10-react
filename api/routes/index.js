const express = require("express");
const app = require("../app");
const router = express.Router();
const User = require("../models").User;
const Course = require("../models").Course;
const { authenticateUser } = require("../middleware/authenticateUser");
const user = require("../models/user");

//asyncHandler
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

//------------------USERS ROUTES--------------//

/*GET route that returns all properties and values of currently authenticates user */
router.get(
  "/users",
  authenticateUser,
  asyncHandler(async (req, res) => {
    let user = req.currentUser;

    res.json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.emailAddress,
    });
    res.status(200);
  })
);

/*POST route that will create a new user */
router.post(
  "/users",
  asyncHandler(async (req, res) => {
    try {
      await User.create(req.body);
      res.status(201).location("/").end();
    } catch (error) {
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }
    }
  })
);

//-------------------COURSE ROUTES---------------//
/*GET route that will return all courses including the User associated with each course*/
router.get(
  "/courses",
  asyncHandler(async (req, res) => {
    const courses = await Course.findAll({
      attributes: [
        "id",
        "title",
        "description",
        "estimatedTime",
        "materialsNeeded",
      ],
      include: [
        {
          model: User,

          attributes: ["firstName", "lastName", "emailAddress"],
        },
      ],
    });

    res.json(courses);
    res.status(200);
  })
);

/*GET route that will return the corresponding course including the User associated with that course */
router.get(
  "/courses/:id",
  asyncHandler(async (req, res, next) => {
    const course = await Course.findByPk(req.params.id);
    if (course) {
      const user = await User.findOne({ where: { id: course.userId } });
      res.json({
        title: course.title,
        description: course.description,
        estimatedTime: course.estimatedTime,
        materialsNeeded: course.materialsNeeded,
        userId: course.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress,
      });

      res.status(200);
    } else {
      const error = new Error("Course was not found");
      error.status = 404;
      next(error);
    }
  })
);

/*POST route that will create a new course */
router.post(
  "/courses",
  authenticateUser,
  asyncHandler(async (req, res) => {
    let course;
    try {
      course = await Course.create({
        title: req.body.title,
        description: req.body.description,
        userId: req.body.userId,
      });

      res.status(201).location(`courses/${course.id}`).end();
    } catch (error) {
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }
    }
  })
);

/*PUT route that will update/edit a new course */
router.put(
  "/courses/:id",
  authenticateUser,
  asyncHandler(async (req, res) => {
    let course;
    try {
      course = await Course.findByPk(req.params.id);
      if (course) {
        if (course.userId === req.currentUser.id) {
          await course.update(req.body);

          res.status(204).end();
        } else {
          res.status(403).json({ message: "user not authenticated" });
        }
      } else {
        res.status(404).json({ message: "Course was not found" });
      }
    } catch (error) {
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }
    }
  })
);

/*DELETE route that will delete the corresponing course */
router.delete(
  "/courses/:id",
  authenticateUser,
  asyncHandler(async (req, res) => {
    let course;
    let user;
    try {
      course = await Course.findByPk(req.params.id);
      user = await User.findOne({ where: { id: course.userId } });
      if (course) {
        if (course.userId === user.id) {
          await course.destroy();
          res.status(204).end();
        } else {
          res.status(403).json({ message: "user not authenticated" });
        }
      } else {
        res.status(404).json({ message: "Course was not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
);

module.exports = router;
