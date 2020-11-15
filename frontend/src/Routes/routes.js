import UsersList from '../components/users/List'; 
import AddUser from '../components/users/Add';
import EditUser from '../components/users/Edit';
import NotFound from '../common/components/NotFound';
const routes = [
  {
	  path: "/users", 
	  component: UsersList,
		exact: true,
	},
	{
		path: "/users/add",
		component: AddUser
	},
	{
		path: "/users/:id",
		component: EditUser
	},
	{
		path: '*',
		component: NotFound
	}];

	export default routes;