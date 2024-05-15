const { Cuisine, Category } = require("../models");

class CuisineController {
  static async homePage(req, res, next) {
    try {
      res.json("Hello World");
    } catch (error) {
      next(error);
    }
  }

  static async getCuisinesPublic(req, res, next) {
    try {
      let paramsQuerySQL = {};
      let option = {};
      const { UserId, CategoryId, sort, page, search } = req.query;

      /** SEARCH */

      if (search) {
        option = {
          title: { [Op.iLike]: `%${search}%` },
        };
      }

      /** FILTERING */

      if (UserId || CategoryId) {
        if (UserId) {
          option.UserId = UserId;
        }
        if (CategoryId) {
          option.CategoryId = CategoryId;
        }
      }

      /** SORTING */

      if (sort) {
        const ordering = sort[0] === "-" ? `DESC` : `ASC`;
        const orderByColumn = ordering === `DESC` ? sort.slice(1) : sort;
        paramsQuerySQL.order = [[orderByColumn, ordering]];
      }

      /** PAGINATION */
      let limit = 10;
      let pageNumber = 1;
      if (page) {
        if (page.size) {
          limit = page.size;

          paramsQuerySQL.limit = limit;
        }
        if (page.number) {
          pageNumber = page.number;
          paramsQuerySQL.offset = (page.number - 1) * 10;
        }
      }

      const { count, rows } = await Cuisine.findAndCountAll({
        where: option,
        ...paramsQuerySQL,

        include: [
          {
            model: Category,
            attributes: ["name"],
          },
        ],
      });

      res.json({
        page: +pageNumber,
        data: rows,
        totalData: count,
        totalPage: Math.ceil(count / limit),
        dataPerPage: +limit,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getCuisineById(req, res, next) {
    try {
      const cuisineData = await Cuisine.findByPk(req.params.id);

      if (!cuisineData)
      
        throw {

          name: "NotFound",

        };

      
      res.status(200).json(cuisineData);



    } catch (error) {
      next(error);
    }
  }
}

module.exports = CuisineController;
