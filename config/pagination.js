async function paginationPa(
  model,
  page,
  limit,
  findArgs,
  orderArgs,
  searchTerm
) {
  // const page = req.query.page;
  // const limit = req.query.limit;

  const startIndex = (page - 1) * limit;

  let countModel = await model.find(findArgs).countDocuments();
  if (searchTerm) {
    countModel = await model
      .find(findArgs)
      .find({ $text: { $search: searchTerm } });
  }

  const totalRow = Math.ceil(countModel / limit);

  const result = {};
  result.pagination = {
    totalRow,
    page: parseInt(page),
    limit: parseInt(limit),
  };

  try {
    if (searchTerm) {
      result.results = await model
        .find(findArgs)
        .find({ $text: { $search: searchTerm } })
        .sort(orderArgs)
        .limit(parseInt(limit))
        .skip(startIndex)
        .exec();
    } else {
      result.results = await model
        .find(findArgs)
        .sort(orderArgs)
        .limit(parseInt(limit))
        .skip(startIndex)
        .exec();
    }

    return result;
  } catch (error) {
    return { error };
  }
}

module.exports = { paginationPa };
