const adminMiddlewar = (request, response, next) => {
  const isUserAdmin = request.userAdmin;

  if (!isUserAdmin) {
    return response.status(401).json();
  }

  return next();
};

export default adminMiddlewar;
