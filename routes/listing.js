get = (req, res, next) => {
  var query;
  if(req.query.location) {
    query = req.models.Listing.find({location: req.query.location})
  }
  else
  {
    query = req.models.Listing.find()
  }

  query.exec().then((answer) => {
      return res.send(answer);
    }).catch((error) => {
      next(error)
    })
}

getById = (req, res, next) => {
  req.models.Listing.findById(req.params.id).then((recipe) => {
    return res.send(recipe);
  }).catch((error) => next(error));
};

post = (req, res, next) => {
  req.models.Listing.create({
    coordinates: req.body.coordinates,
    address: req.body.address,
    summary: req.body.summary,
    location: req.body.location
  }).then((listing) => {
    console.log(listing);
    return res.status(201).send(listing);
  }).catch((error) => next(error));
};

deleteById = (req, res, next) => {
  req.models.Listing.findByIdAndDelete(req.params.id).then((deleted) => {
    if (deleted)
      return res.send(deleted).status(200);
    res.sendStatus(204);
  }).catch((error) => next(error));
};

put = (req, res, next) => {
  req.models.Listing.updateOne({
    _id: req.params.id
  }, {
    coordinates: req.body.coordinates,
    address: req.body.address,
    summary: req.body.summary,
    location: req.body.location
  }, {
      new: true,
      upsert: true,
      runvalidators: true,
    }).then((status) => {
      console.log("status: ", status);
      if (status.upserted)
        res.status(201);
      else if (status.nModified)
        res.status(200);
      else
        res.status(204);
      res.send();
    }).catch((error) => next(error));
};

module.exports = {
  get,
  getById,
  post,
  deleteById,
  put
}