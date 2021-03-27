export const error = (error) => {
  let message = null;
  if (error.data) {
    message = error.data.error || "Something went wrong!";
  } else {
    message = "Something went wrong! This is not a problem with API.";
  }
  return message;
};

export const errorMessage = (error) => {
  let message = "";
  if (error.data) {
    if (error.data.message) {
      error.data.message.forEach((itemKey) => {
        Object.keys(itemKey.constraints).forEach((constraint) => {
          message += itemKey.constraints[constraint];
        });
      });
    } else {
      message = error.data.error;
    }
  }
  return message;
};
