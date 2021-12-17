import './App.css';
import AdminPage  from './screens/Admin/AdminDashboardPage';

const  App=() => {

  // const GET_ALL_BLOGS = gql `
  //   query GetCategories{

  //   getCategories {
    
  //   description
  //   id
  //   }
  // }
  // `

  // const {loading, error ,data} = useQuery(GET_ALL_BLOGS)

  // if(data){
  //   console.log(data)
  // }

  return (
    <AdminPage />
  );
}

export default App;
