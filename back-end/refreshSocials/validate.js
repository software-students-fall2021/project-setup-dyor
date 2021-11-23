const Joi = require('joi');

const socialsValidate = (data) => {
    const schema = Joi.object({
        coin: Joi.string().required(),
        dateRefreshed: Joi.date().required(),
        posts: Joi.array().required()
    });
    
    return schema.validate(data);
}

const newsValidate = (data) => {
  const schema = Joi.object({
    coin: Joi.string().required(),
    dateRefreshed: Joi.date().required(),
    news: Joi.array().required(),
  });

  return schema.validate(data);
};

module.exports = {
    socials: socialsValidate,
    news: newsValidate
}