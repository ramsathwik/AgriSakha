const Signuphandler = (formData, navigate) => {
  localStorage.setItem("token", "djfdfhfk");
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  localStorage.setItem("expiry", tomorrow.getTime());
  console.log("Form submitted:", formData);
  navigate("/home");
};
export default Signuphandler;
