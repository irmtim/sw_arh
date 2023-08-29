export const replaceDateTimeJSON = () => {
  //исправление сериализации даты - иначе сериализуется utc значение
  Date.prototype.toJSON = function(){
    var date = new Date(this)
    const hoursDiff = date.getHours() - date.getTimezoneOffset() / 60;
    date.setHours(hoursDiff);
    return date.toISOString();
  };
}