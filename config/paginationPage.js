function pagination(model) {
  return async (req, res, next) => {
    const page = req.query.page;
    const limit = req.query.limit;

    const startIndex = (page - 1) * limit;

    const resultData = await model.find({});

    const totalRow = Math.ceil(resultData.length / limit);

    const result = {};
    result.pagination = {
      totalRow,
      page: parseInt(page),
      limit: parseInt(limit),
    };

    try {
      result.results = await model
        .find()
        .limit(parseInt(limit))
        .skip(startIndex)
        .exec();

      res.pagination = result;
      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

module.exports = { pagination };
