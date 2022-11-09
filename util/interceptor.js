module.exports = {
  mockRequest: () => {
    const req = {};
    req.body = jest.fn().mockReturnValue(req);
    req.params = jest.fn().mockReturnValue(req);
    return req;
  },

  mockResponse: () => {
    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = 409;
    res.json = {
      message: "email already exist",
    };
    return res;
  },
  // mockNext: () => jest.fn()
};
