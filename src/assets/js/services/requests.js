function parseISODate(date) {
  const splitted = date.split('T');
  const time = splitted[1];
  const splittedAgain = splitted[0].split('-');
  const dateObject = {
    year: splittedAgain[0],
    month: splittedAgain[1],
    day: splittedAgain[2],
    time,
  };
  return dateObject;
}

async function getEntity(entity, id) {
  const post = await fetch(`/api/retrieve/${entity}/${id}`);
  return post.json();
}
async function getOrganizationList() {
  const post = await fetch('/api/retrieve/orglist');
  return post.json();
}
async function getUser() {
  const post = await fetch('/api/retrieve/user');
  return post.json();
}

async function getComments(eventId) {
  const post = await fetch(`/api/retrieve/get/comments/${eventId}`);
  return post.json();
}

async function postComment(comment, eventId) {
  const { content } = comment;
  await fetch(`/api/retrieve/post/comments/${eventId}`, {
    method: 'POST',
    body: JSON.stringify({ content }),
  });
}

async function getWeather(date) {
  const { year, month, day } = parseISODate(date);
  let key = await fetch('/api/retrieve/apiKey');
  key = await key.json();
  const query = `https://thingproxy.freeboard.io/fetch/http://api.weatherapi.com/v1/forecast.json?key=${key.WEATHER_KEY}&q=santiago&dt=${year}-${month}-${day}&days=1`;
  try {
    let weather = await fetch(query);
    weather = await weather.json();
    const forecast = weather.forecast.forecastday[0].day;
    return {
      error: false, min: forecast.mintemp_c, max: forecast.maxtemp_c, condition: forecast.condition,
    };
  } catch (Error) {
    return { error: true };
  }
}

export {
  getEntity,
  getOrganizationList,
  getUser,
  getWeather,
  getComments,
  postComment,
};
