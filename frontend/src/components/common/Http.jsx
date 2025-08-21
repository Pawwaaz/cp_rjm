export const apiurl = "https://raffijasamandiri.my.id/backend/api/";
export const fileurl = "https://raffijasamandiri.my.id/backend/";
export const token = () => {
  const userInfo = localStorage.getItem("userInfo");
  const data = JSON.parse(userInfo);
  return data.token;
};
