const auth = require('../controllers/auth.controller');
const { mockRequest, mockResponse } = require('../util/interceptor');

describe("Check function register", () => {
  test('should be 201 and return Passenger created successfully', () => {
    let req = mockRequest();
    req.body = {
      firstName: "Himashu",
      lastName: "Singh",
      email: "himanshu45@gmail.com",
      password: "himanshu"
    }
    const res = mockResponse();

    const result = auth.register(req, res);
    console.log(result);
    // expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({
      "message": "email already exist"
    });
  });
});
