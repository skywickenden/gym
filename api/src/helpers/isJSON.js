module.exports = (jsonString) => {
  try {
    const json = JSON.parse(jsonString);
    if (Object.prototype.toString.call(json).slice(8,-1) !== "Object") {
      return false;
    }
  } catch (e) {
    return false;
  }
  return true;
};

