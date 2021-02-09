exports.save = (model, data, cb) => {
  new model(data).save(cb);
};

exports.findDoc = (model, query, cb) => {
  model.findOne(query, cb);
};

exports.edit = (model, query, set, cb) => {
  model.findOneAndUpdate(query, set, cb);
};

exports.remove = (model, query, cb) => {
  model.findOneAndRemove(query, cb);
};

exports.findDocs = (modal, query, projection, cb) => {
  modal.find(query, projection, cb);
};
