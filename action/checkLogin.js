
/* export default function checkLogin(request) {
    console.log({request});
    return (
    <div>checkLogin</div>
  )
} */

const checkLogin = async (email, password) => {
  // Example user verification logic
  if (email === 'test@example.com' && password === 'password') {  
    console.log("Called");
      /* return { id: 1, name: 'Test User', email: 'test@example.com' }; */
  }
  return null;
};