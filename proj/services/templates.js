exports.registered = (eid, rid) => {
  mo = {};
  mo.from = "uselessuser4@gmail.com";
  mo.to = eid;
  mo.subject = `${rid} Registered`;
  mo.text = `
    Dear 
    You have been Registered for Course

    Regards
    `;
  return mo;
};

exports.enquired = eid => {
  mo = {};
  mo.from = "uselessuser4@gmail.com";
  mo.to = eid;
  mo.subject = `You have successfully been added to List`;
  mo.text = `
    Dear 
    You have been Registered for Course

    Regards
    `;
  return mo;
};
