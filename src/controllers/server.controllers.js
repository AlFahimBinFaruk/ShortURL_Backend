const URLModel = require("../models/urlModel");
const shortId = require("short-id");
const createError = require("http-errors");
const validUrl = require("valid-url");

/**
 * handle server post req
 *  if url dont exits add it the send res
 *  if url already eixts send the url
 */
const handleServerPostReq = async (req, res, next) => {
  try {
    const longURL = req.body.longURL;
    const baseURL = process.env.BASE_URL;
    //check if user has given the url
    if (!longURL) {
      next(createError(400, "Provide all info!"));
    }
    //check if the given url is valid
    if (validUrl.isUri(longURL)) {
      //check if url already exits
      const urlExits = await URLModel.findOne({ longURL });
      //if it exits send it
      if (urlExits) {
        return res.status(200).json({ shortURL: urlExits.shortURL });
      } else {
        //if it dont exits create a new one
        //genarete url code
        const urlCode = shortId.generate();
        //shortURl
        const shortURL = baseURL + "/" + urlCode;
        //create new url in db
        const newURL = await URLModel.create({
          urlCode,
          shortURL,
          longURL,
        });
        //send the new url
        return res.status(200).json({ shortURL: newURL.shortURL });
      }
    } else {
      next(createError(400, "Provide a valid URL!"));
    }
  } catch (error) {
    next(createError(500, "Internal server error!"));
  }
};

/**
 * handle server get req
 * if the url code/short url exits redirect user to the url
 * if it not exits the show error
 */
const handleServerGetReq = async (req, res, next) => {
  try {
    const urlCode = req.params.urlCode;
    //see if url code exits
    if (!urlCode) {
      next(createError(400, "Provide a valid url code!"));
    }
    //see if the url code exits in db
    const urlExits = await URLModel.findOne({ urlCode });

    //if url not exits send error
    if (!urlExits) {
      next(createError(400, "Provide a valid url code!"));
    } else {
      //if it exits then redirect the user to that url
      return res.redirect(urlExits.longURL);
    }
  } catch (error) {
    next(createError(500, "Internal server error!"));
  }
};

//export
module.exports = {
  handleServerPostReq,
  handleServerGetReq,
};
